import { EmbedBuilder } from 'discord.js';

export default {
    name: 'catty',
    aliases: ['randomcat', 'cataas'],
    description: 'Get a random cat image from Cataas',
    usage: '',
    example: '!catty',
    category: 'animals',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        try {
            // Cataas returns the image directly, we add timestamp to prevent caching
            const imageUrl = `https://cataas.com/cat?${Date.now()}`;

            const embed = new EmbedBuilder()
                .setTitle('🐱 Meow!')
                .setImage(imageUrl)
                .setColor('#FFA500')
                .setFooter({ text: 'Powered by cataas.com' });

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to fetch cat picture.');
        }
    }
};
