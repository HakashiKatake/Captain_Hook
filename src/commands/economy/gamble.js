import { EmbedBuilder } from 'discord.js';
import { getAccount, updateWallet } from '../../utils/economy.js';

export default {
    name: 'gamble',
    aliases: ['bet'],
    description: 'Gamble your coins',
    usage: '<amount>',
    example: '$gamble 100',
    category: 'economy',
    guildOnly: true,
    cooldown: 10,

    async execute(message, args, client) {
        const account = getAccount(message.author.id);

        let amount;
        if (args[0]?.toLowerCase() === 'all') {
            amount = account.wallet;
        } else {
            amount = parseInt(args[0]);
        }

        if (isNaN(amount) || amount < 100) {
            return message.reply('❌ Minimum bet is **100** coins!');
        }

        if (amount > account.wallet) {
            return message.reply(`❌ You only have **${account.wallet}** 🪙 in your wallet!`);
        }

        // 45% chance to win
        const won = Math.random() < 0.45;

        let embed;
        if (won) {
            const multiplier = [1.5, 1.75, 2, 2.25, 2.5][Math.floor(Math.random() * 5)];
            const winnings = Math.floor(amount * multiplier);
            const profit = winnings - amount;

            updateWallet(message.author.id, profit);

            embed = new EmbedBuilder()
                .setTitle('🎰 You Won!')
                .setDescription(
                    `You bet **${amount}** 🪙 and won **${winnings}** 🪙!\n` +
                    `Profit: **+${profit}** 🪙 (${multiplier}x)`
                )
                .setColor('#2ECC71');
        } else {
            updateWallet(message.author.id, -amount);

            embed = new EmbedBuilder()
                .setTitle('🎰 You Lost!')
                .setDescription(`You bet **${amount}** 🪙 and lost it all! 😢`)
                .setColor('#E74C3C');
        }

        message.reply({ embeds: [embed] });
    }
};
