import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
    name: 'dog',
    aliases: ['doggo', 'puppy'],
    description: 'Get a random dog picture',
    usage: '',
    example: '!dog',
    category: 'animals',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        try {
            const response = await fetch('https://random.dog/woof.json');
            const data = await response.json();

            const embed = new EmbedBuilder()
                .setTitle('🐶 Woof!')
                .setImage(data.url)
                .setColor('#8B4513');

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to fetch dog picture.');
        }
    }
};
