import { EmbedBuilder } from 'discord.js';
import { getPrefix } from '../../utils/database.js';
import { version } from 'discord.js';
import os from 'os';

export default {
    name: 'botstats',
    aliases: ['stats', 'botinfo', 'info'],
    description: 'View bot statistics and information',
    usage: '',
    example: '!botstats',
    category: 'utility',
    guildOnly: false,

    async execute(message, args, client) {
        const uptime = formatUptime(client.uptime);
        const memUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const prefix = message.guild ? getPrefix(message.guild.id) : process.env.DEFAULT_PREFIX;

        // Count total users
        let totalUsers = 0;
        client.guilds.cache.forEach(guild => {
            totalUsers += guild.memberCount;
        });

        const embed = new EmbedBuilder()
            .setTitle('🪝 Captain Hook Stats')
            .setThumbnail(client.user.displayAvatarURL())
            .setColor('#5865F2')
            .addFields(
                { name: '📊 Servers', value: `${client.guilds.cache.size}`, inline: true },
                { name: '👥 Users', value: `${totalUsers.toLocaleString()}`, inline: true },
                { name: '📦 Commands', value: `${client.commands.size}`, inline: true },
                { name: '⏱️ Uptime', value: uptime, inline: true },
                { name: '🏓 Ping', value: `${client.ws.ping}ms`, inline: true },
                { name: '💾 Memory', value: `${memUsage} MB`, inline: true },
                { name: '📚 Discord.js', value: `v${version}`, inline: true },
                { name: '🟢 Node.js', value: process.version, inline: true },
                { name: '🔧 Prefix', value: `\`${prefix}\``, inline: true }
            )
            .setFooter({
                text: `Requested by ${message.author.username}`,
                iconURL: message.author.displayAvatarURL()
            })
            .setTimestamp();

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};

function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours % 24 > 0) parts.push(`${hours % 24}h`);
    if (minutes % 60 > 0) parts.push(`${minutes % 60}m`);
    if (seconds % 60 > 0) parts.push(`${seconds % 60}s`);

    return parts.join(' ') || '0s';
}
