import { EmbedBuilder } from 'discord.js';

export default {
    name: 'coinflip',
    aliases: ['flip', 'coin'],
    description: 'Flip a coin',
    usage: '',
    example: '!coinflip',
    category: 'fun',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        const embed = new EmbedBuilder()
            .setTitle('🪙 Coin Flip')
            .setDescription(`**${message.author.username}** flipped a coin and got **${result}**!`)
            .setColor('#FFD700');
        message.channel.send({ embeds: [embed] });
    }
};
