import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
    name: 'cat',
    aliases: ['catt', 'kitty'],
    description: 'Get a random cat picture',
    usage: '',
    example: '!cat',
    category: 'animals',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();

            const embed = new EmbedBuilder()
                .setTitle('🐱 Meow!')
                .setImage(data[0].url)
                .setColor('#FF9800');

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to fetch cat picture.');
        }
    }
};
