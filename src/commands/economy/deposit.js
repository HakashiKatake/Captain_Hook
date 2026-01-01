import { getAccount, updateWallet, updateBank } from '../../utils/economy.js';

export default {
    name: 'deposit',
    aliases: ['dep'],
    description: 'Deposit coins to bank',
    usage: '<amount|all>',
    example: '$deposit 100',
    category: 'economy',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const account = getAccount(message.author.id);

        if (account.wallet === 0) {
            return message.reply('❌ You have no coins in your wallet!');
        }

        let amount;
        if (args[0]?.toLowerCase() === 'all' || args[0]?.toLowerCase() === 'max') {
            amount = account.wallet;
        } else {
            amount = parseInt(args[0]);
            if (isNaN(amount) || amount <= 0) {
                return message.reply('❌ Please provide a valid amount!');
            }
            if (amount > account.wallet) {
                amount = account.wallet;
            }
        }

        updateWallet(message.author.id, -amount);
        updateBank(message.author.id, amount);

        message.reply(`✅ Deposited **${amount.toLocaleString()}** 🪙 to your bank!`);
    }
};
