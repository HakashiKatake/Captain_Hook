import { EmbedBuilder } from 'discord.js';
import { getAccount, updateWallet, setLastDaily } from '../../utils/economy.js';

const DAILY_AMOUNT = 1000;
const DAILY_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours

export default {
    name: 'daily',
    aliases: [],
    description: 'Claim your daily reward',
    usage: '',
    example: '$daily',
    category: 'economy',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const account = getAccount(message.author.id);
        const now = Date.now();
        const lastDaily = account.last_daily || 0;

        if (now - lastDaily < DAILY_COOLDOWN) {
            const remaining = DAILY_COOLDOWN - (now - lastDaily);
            const hours = Math.floor(remaining / (60 * 60 * 1000));
            const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

            return message.reply(`⏰ You can claim your daily in **${hours}h ${minutes}m**!`);
        }

        // Streak bonus (coming soon)
        const bonus = Math.floor(Math.random() * 500); // Random bonus 0-500
        const total = DAILY_AMOUNT + bonus;

        updateWallet(message.author.id, total);
        setLastDaily(message.author.id, now);

        const embed = new EmbedBuilder()
            .setTitle('📅 Daily Reward!')
            .setDescription(
                `You claimed your daily reward!\n\n` +
                `**Base:** ${DAILY_AMOUNT} 🪙\n` +
                `**Bonus:** ${bonus} 🪙\n` +
                `**Total:** ${total} 🪙`
            )
            .setColor('#FFD700')
            .setFooter({ text: 'Come back tomorrow for more!' });

        message.reply({ embeds: [embed] });
    }
};
