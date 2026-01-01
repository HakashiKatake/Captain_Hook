import { getPrefix } from '../utils/database.js';
import { getCommand } from '../handlers/commandHandler.js';
import { getAfk, removeAfk, getAllAfk } from '../utils/database.js';
import { EmbedBuilder } from 'discord.js';

export default {
    name: 'messageCreate',
    once: false,

    async execute(message, client) {
        // Ignore bots and DMs (optional: enable DM commands)
        if (message.author.bot) return;

        // Handle AFK mentions
        if (message.guild) {
            await handleAfkMentions(message);
            await handleAfkReturn(message);
        }

        // Get prefix for this guild
        const prefix = message.guild ? getPrefix(message.guild.id) : process.env.DEFAULT_PREFIX || '$';

        // Check if message starts with prefix
        if (!message.content.startsWith(prefix)) return;

        // Parse command and arguments
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Find the command
        const command = getCommand(client, commandName);
        if (!command) return;

        // Check permissions
        if (command.permissions) {
            const memberPerms = message.member?.permissions;
            if (!memberPerms || !memberPerms.has(command.permissions)) {
                return message.reply({
                    content: `❌ You need the \`${command.permissions}\` permission to use this command.`,
                    allowedMentions: { repliedUser: false }
                });
            }
        }

        // Check if guild-only
        if (command.guildOnly && !message.guild) {
            return message.reply('❌ This command can only be used in a server!');
        }

        // Check cooldown
        if (command.cooldown) {
            const cooldownKey = `${command.name}-${message.author.id}`;
            const now = Date.now();

            if (client.cooldowns.has(cooldownKey)) {
                const expiration = client.cooldowns.get(cooldownKey);
                if (now < expiration) {
                    const remaining = ((expiration - now) / 1000).toFixed(1);
                    return message.reply({
                        content: `⏳ Please wait ${remaining}s before using \`${command.name}\` again.`,
                        allowedMentions: { repliedUser: false }
                    });
                }
            }

            client.cooldowns.set(cooldownKey, now + (command.cooldown * 1000));
            setTimeout(() => client.cooldowns.delete(cooldownKey), command.cooldown * 1000);
        }

        // Execute command
        try {
            await command.execute(message, args, client);
        } catch (error) {
            console.error(`Error executing command ${command.name}:`, error);
            message.reply({
                content: '❌ An error occurred while executing this command!',
                allowedMentions: { repliedUser: false }
            }).catch(() => { });
        }
    }
};

/**
 * Handle when someone mentions an AFK user
 */
async function handleAfkMentions(message) {
    if (message.mentions.users.size === 0) return;

    const allAfk = getAllAfk();
    const afkMap = new Map(allAfk.map(a => [a.user_id, a]));

    for (const [userId] of message.mentions.users) {
        const afkData = afkMap.get(userId);
        if (afkData) {
            const embed = new EmbedBuilder()
                .setTitle('💤 User is AFK')
                .setDescription(`<@${userId}> is currently AFK`)
                .addFields({ name: 'Reason', value: afkData.reason || 'No reason provided' })
                .setColor('#FFA500')
                .setTimestamp(afkData.timestamp);

            await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
            break; // Only notify for first AFK user mentioned
        }
    }
}

/**
 * Handle when an AFK user returns
 */
async function handleAfkReturn(message) {
    const afkData = getAfk(message.author.id);

    if (afkData) {
        removeAfk(message.author.id);

        // Try to remove AFK prefix from nickname
        if (message.member && message.member.nickname?.startsWith('(AFK)')) {
            try {
                await message.member.setNickname(
                    message.member.nickname.replace('(AFK) ', '')
                );
            } catch {
                // Can't change nickname (maybe bot doesn't have permission)
            }
        }

        const duration = Math.floor((Date.now() - afkData.timestamp) / 1000 / 60);
        await message.channel.send({
            content: `👋 Welcome back ${message.author}! You were AFK for ${duration} minute(s).`,
            allowedMentions: { users: [] }
        });
    }
}
