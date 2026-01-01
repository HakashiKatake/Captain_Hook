import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
    name: 'dogfact',
    aliases: ['df'],
    description: 'Get a random dog fact with picture',
    usage: '',
    example: '!dogfact',
    category: 'animals',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        try {
            const [imgRes, factRes] = await Promise.all([
                fetch('https://some-random-api.ml/img/dog'),
                fetch('https://some-random-api.ml/facts/dog')
            ]);
            const imgData = await imgRes.json();
            const factData = await factRes.json();

            const embed = new EmbedBuilder()
                .setTitle('🐶 Dog Fact')
                .setImage(imgData.link)
                .setFooter({ text: factData.fact })
                .setColor('#8B4513');

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to fetch dog fact.');
        }
    }
};
