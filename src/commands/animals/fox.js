import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
    name: 'fox',
    aliases: ['floof'],
    description: 'Get a random fox picture',
    usage: '',
    example: '!fox',
    category: 'animals',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        try {
            const response = await fetch('https://randomfox.ca/floof/');
            const data = await response.json();

            const embed = new EmbedBuilder()
                .setTitle('🦊 Floof!')
                .setImage(data.image)
                .setColor('#FF5722');

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to fetch fox picture.');
        }
    }
};
