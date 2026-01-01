import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
    name: 'duck',
    aliases: ['quack'],
    description: 'Get a random duck picture',
    usage: '',
    example: '!duck',
    category: 'animals',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        try {
            const response = await fetch('https://random-d.uk/api/v1/random');
            const data = await response.json();

            const embed = new EmbedBuilder()
                .setTitle('🦆 Quack!')
                .setImage(data.url)
                .setColor('#FFC107');

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to fetch duck picture.');
        }
    }
};
