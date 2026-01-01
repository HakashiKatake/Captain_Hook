import { EmbedBuilder } from 'discord.js';

export default {
    name: 'rate',
    aliases: ['rateme'],
    description: 'Rate something or someone',
    usage: '<thing>',
    example: '!rate pizza',
    category: 'fun',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        const thing = args.join(' ') || message.author.username;
        const rate = (Math.random() * 100).toFixed(2);

        const embed = new EmbedBuilder()
            .setTitle('⭐ Rating')
            .setDescription(`I'd rate **${thing}** a **${rate}/100**`)
            .setColor('#FFD700');
        message.channel.send({ embeds: [embed] });
    }
};
