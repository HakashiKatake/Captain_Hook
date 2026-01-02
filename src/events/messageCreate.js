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

        // Check if guild-only command used in DMs
        if (command.guildOnly && !message.guild) {
            return sendError(message, 'Server Only', 'This command can only be used in a server!');
        }

        // Check user permissions
        if (command.permissions && message.guild) {
            const missingPerms = [];
            const permissions = Array.isArray(command.permissions) ? command.permissions : [command.permissions];

            for (const perm of permissions) {
                if (!message.member?.permissions.has(perm)) {
                    missingPerms.push(perm);
                }
            }

            if (missingPerms.length > 0) {
                return sendError(message, 'Missing Permissions',
                    `You need the following permission(s):\n\`${missingPerms.join('`, `')}\``
                );
            }
        }

        // Check bot permissions
        if (command.botPermissions && message.guild) {
            const missingPerms = [];
            const permissions = Array.isArray(command.botPermissions) ? command.botPermissions : [command.botPermissions];

            for (const perm of permissions) {
                if (!message.guild.members.me?.permissions.has(perm)) {
                    missingPerms.push(perm);
                }
            }

            if (missingPerms.length > 0) {
                return sendError(message, 'Bot Missing Permissions',
                    `I need the following permission(s) to run this command:\n\`${missingPerms.join('`, `')}\``
                );
            }
        }

        // Check if NSFW command in non-NSFW channel
        if (command.nsfw && message.guild && !message.channel.nsfw) {
            return sendError(message, 'NSFW Only', 'This command can only be used in NSFW channels!');
        }

        // Check required arguments
        if (command.args && args.length === 0) {
            return sendUsage(message, command, prefix);
        }

        // Check cooldown
        if (command.cooldown) {
            const cooldownKey = `${command.name}-${message.author.id}`;
            const now = Date.now();

            if (client.cooldowns.has(cooldownKey)) {
                const expiration = client.cooldowns.get(cooldownKey);
                if (now < expiration) {
                    const remaining = ((expiration - now) / 1000).toFixed(1);
                    return sendError(message, 'Cooldown',
                        `Please wait **${remaining}s** before using \`${prefix}${command.name}\` again.`
                    );
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

            // Send detailed error to user
            const errorEmbed = new EmbedBuilder()
                .setTitle('❌ Command Error')
                .setDescription('An unexpected error occurred while running this command.')
                .setColor('#ED4245')
                .addFields(
                    { name: 'Command', value: `\`${prefix}${command.name}\``, inline: true },
                    { name: 'Error', value: `\`${error.message?.slice(0, 100) || 'Unknown error'}\``, inline: false }
                )
                .setFooter({ text: 'This error has been logged. Please try again later.' });

            message.reply({ embeds: [errorEmbed], allowedMentions: { repliedUser: false } }).catch(() => { });
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

/**
 * Send an error embed
 */
function sendError(message, title, description) {
    const embed = new EmbedBuilder()
        .setTitle(`❌ ${title}`)
        .setDescription(description)
        .setColor('#ED4245')
        .setFooter({ text: `Use $help for command info` });

    return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } }).catch(() => { });
}

/**
 * Send usage/help for a command
 */
function sendUsage(message, command, prefix) {
    const embed = new EmbedBuilder()
        .setTitle(`📖 How to use: ${prefix}${command.name}`)
        .setDescription(command.description || 'No description available.')
        .setColor('#5865F2')
        .addFields(
            { name: 'Usage', value: `\`${prefix}${command.name} ${command.usage || ''}\``, inline: false }
        );

    if (command.example) {
        embed.addFields({ name: 'Example', value: `\`${command.example.replace('!', prefix)}\``, inline: false });
    }

    if (command.aliases?.length > 0) {
        embed.addFields({ name: 'Aliases', value: command.aliases.map(a => `\`${a}\``).join(', '), inline: false });
    }

    if (command.cooldown) {
        embed.addFields({ name: 'Cooldown', value: `${command.cooldown}s`, inline: true });
    }

    embed.setFooter({ text: `Category: ${command.category || 'general'}` });

    return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } }).catch(() => { });
}
