import { EmbedBuilder } from 'discord.js';
import { getAccount, updateWallet } from '../../utils/economy.js';

const jobs = [
    { name: 'Programmer', pay: [400, 800], emoji: '💻' },
    { name: 'Chef', pay: [300, 600], emoji: '👨‍🍳' },
    { name: 'Doctor', pay: [500, 900], emoji: '👨‍⚕️' },
    { name: 'Streamer', pay: [200, 1000], emoji: '🎮' },
    { name: 'YouTuber', pay: [100, 1200], emoji: '📺' },
    { name: 'Teacher', pay: [350, 550], emoji: '👨‍🏫' },
    { name: 'Uber Driver', pay: [250, 500], emoji: '🚗' },
    { name: 'Pizza Delivery', pay: [200, 400], emoji: '🍕' },
    { name: 'Discord Mod', pay: [0, 100], emoji: '🔨' }
];

export default {
    name: 'work',
    aliases: ['job'],
    description: 'Work for coins',
    usage: '',
    example: '$work',
    category: 'economy',
    guildOnly: true,
    cooldown: 60,

    async execute(message, args, client) {
        getAccount(message.author.id);

        const job = jobs[Math.floor(Math.random() * jobs.length)];
        const amount = Math.floor(Math.random() * (job.pay[1] - job.pay[0] + 1)) + job.pay[0];

        updateWallet(message.author.id, amount);

        const embed = new EmbedBuilder()
            .setTitle(`${job.emoji} Work Complete!`)
            .setDescription(`You worked as a **${job.name}** and earned **${amount}** 🪙`)
            .setColor('#2ECC71');

        message.reply({ embeds: [embed] });
    }
};
