import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
    name: 'catfact',
    aliases: ['cf'],
    description: 'Get a random cat fact',
    usage: '',
    example: '!catfact',
    category: 'animals',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        try {
            const response = await fetch('https://catfact.ninja/fact');
            const data = await response.json();

            const embed = new EmbedBuilder()
                .setTitle('🐱 Cat Fact')
                .setDescription(data.fact)
                .setColor('#FF9800');

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to fetch cat fact.');
        }
    }
};
