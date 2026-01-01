import { EmbedBuilder } from 'discord.js';

export default {
    name: 'uptime',
    aliases: [],
    description: 'Show bot uptime',
    usage: '',
    example: '!uptime',
    category: 'info',
    guildOnly: false,
    cooldown: 5,

    async execute(message, args, client) {
        const totalSeconds = Math.floor(client.uptime / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        const embed = new EmbedBuilder()
            .setTitle('⏱️ Uptime')
            .setDescription(`I've been online for **${uptime}**`)
            .setColor('#3498db');

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
