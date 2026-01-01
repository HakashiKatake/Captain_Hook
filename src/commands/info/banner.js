import { EmbedBuilder } from 'discord.js';

export default {
    name: 'banner',
    aliases: ['serverbanner'],
    description: 'Show server banner',
    usage: '',
    example: '!banner',
    category: 'info',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        if (!message.guild.bannerURL()) {
            return message.reply('❌ This server does not have a banner!');
        }

        const embed = new EmbedBuilder()
            .setTitle(`🖼️ Banner of ${message.guild.name}`)
            .setImage(message.guild.bannerURL({ size: 1024 }))
            .setColor('#5865F2');

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
