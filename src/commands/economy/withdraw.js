import { getAccount, updateWallet, updateBank } from '../../utils/economy.js';

export default {
    name: 'withdraw',
    aliases: ['with'],
    description: 'Withdraw coins from bank',
    usage: '<amount|all>',
    example: '$withdraw 100',
    category: 'economy',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const account = getAccount(message.author.id);

        if (account.bank === 0) {
            return message.reply('❌ You have no coins in your bank!');
        }

        let amount;
        if (args[0]?.toLowerCase() === 'all' || args[0]?.toLowerCase() === 'max') {
            amount = account.bank;
        } else {
            amount = parseInt(args[0]);
            if (isNaN(amount) || amount <= 0) {
                return message.reply('❌ Please provide a valid amount!');
            }
            if (amount > account.bank) {
                amount = account.bank;
            }
        }

        updateBank(message.author.id, -amount);
        updateWallet(message.author.id, amount);

        message.reply(`✅ Withdrew **${amount.toLocaleString()}** 🪙 from your bank!`);
    }
};
