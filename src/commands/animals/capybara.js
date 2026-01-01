import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
    name: 'capybara',
    aliases: ['capy', 'capybara'],
    description: 'Get a random capybara image',
    usage: '',
    example: '!capybara',
    category: 'animals',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        try {
            const response = await fetch('https://api.capy.lol/v1/capybara?json=true');
            const data = await response.json();

            const embed = new EmbedBuilder()
                .setTitle('🦫 Capybara!')
                .setImage(data.data.url)
                .setColor('#8B4513')
                .setFooter({ text: 'Powered by capy.lol' });

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to fetch capybara picture.');
        }
    }
};
