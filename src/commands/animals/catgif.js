import { EmbedBuilder } from 'discord.js';

export default {
    name: 'catgif',
    aliases: ['catg', 'meowgif'],
    description: 'Get a random cat GIF from Cataas',
    usage: '',
    example: '!catgif',
    category: 'animals',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        try {
            // Cataas returns the gif directly, we add timestamp to prevent caching
            const gifUrl = `https://cataas.com/cat/gif?${Date.now()}`;

            const embed = new EmbedBuilder()
                .setTitle('🐱 Cat GIF!')
                .setImage(gifUrl)
                .setColor('#FFA500')
                .setFooter({ text: 'Powered by cataas.com' });

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to fetch cat GIF.');
        }
    }
};
