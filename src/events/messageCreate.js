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

        // Handle bot mention
        if (message.mentions.has(client.user) && !message.mentions.everyone) {
            const mentionContent = message.content.replace(/<@!?\d+>/g, '').trim();

            // Only respond if the message is just a mention (no other content)
            if (!mentionContent || mentionContent.length < 3) {
                const uptime = formatUptime(client.uptime);
                const commandCount = client.commands.size;
                const serverCount = client.guilds.cache.size;

                const embed = new EmbedBuilder()
                    .setTitle('🪝 Hey there! I\'m Captain Hook!')
                    .setDescription(
                        `Thanks for pinging me! Here's some info:\n\n` +
                        `**Prefix:** \`${prefix}\`\n` +
                        `**Help Command:** \`${prefix}help\`\n\n` +
                        `**Quick Start:**\n` +
                        `• \`${prefix}help\` - See all commands\n` +
                        `• \`${prefix}help <command>\` - Get command info\n` +
                        `• \`${prefix}prefix <new>\` - Change prefix\n\n` +
                        `**Bot Stats:**\n` +
                        `📊 **${commandCount}** commands\n` +
                        `🌐 **${serverCount}** servers\n` +
                        `⏱️ **${uptime}** uptime`
                    )
                    .setColor('#5865F2')
                    .setThumbnail(client.user.displayAvatarURL())
                    .addFields(
                        {
                            name: '🔗 Links',
                            value: '[Invite](https://discord.com/api/oauth2/authorize?client_id=916960367018651678&permissions=8&scope=bot%20applications.commands) • [Support](https://discord.gg/MyneuXgVRr) • [Website](https://captain-hook-bot.vercel.app)',
                            inline: false
                        }
                    )
                    .setFooter({ text: 'Use the buttons below or type a command!' });

                return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
            }
        }

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

/**
 * Format uptime to human readable string
 */
function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}
