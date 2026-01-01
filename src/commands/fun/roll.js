import { EmbedBuilder } from 'discord.js';

export default {
    name: 'roll',
    aliases: ['dice'],
    description: 'Roll a dice or random number',
    usage: '[max]',
    example: '!roll 100',
    category: 'fun',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        const max = parseInt(args[0]) || 100;
        const result = Math.floor(Math.random() * max) + 1;

        const embed = new EmbedBuilder()
            .setTitle('🎲 Roll')
            .setDescription(`**${message.author.username}** rolled **${result}** (1-${max})`)
            .setColor('#9C27B0');
        message.channel.send({ embeds: [embed] });
    }
};
