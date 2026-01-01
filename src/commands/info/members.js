import { EmbedBuilder } from 'discord.js';

export default {
    name: 'members',
    aliases: ['membercount', 'mc'],
    description: 'Show server member count',
    usage: '',
    example: '!members',
    category: 'info',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setTitle('👥 Member Count')
            .setDescription(`**${message.guild.name}** has **${message.guild.memberCount}** members!`)
            .setColor('#3498db')
            .setThumbnail(message.guild.iconURL());

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
