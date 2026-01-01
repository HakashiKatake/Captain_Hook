import { getAccount, updateWallet } from '../../utils/economy.js';

export default {
    name: 'give',
    aliases: ['transfer', 'pay'],
    description: 'Give coins to another user',
    usage: '<user> <amount>',
    example: '$give @user 500',
    category: 'economy',
    guildOnly: true,
    cooldown: 10,

    async execute(message, args, client) {
        const target = message.mentions.users.first();

        if (!target) {
            return message.reply('❌ Please mention someone to give coins to!');
        }

        if (target.id === message.author.id) {
            return message.reply('❌ You can\'t give coins to yourself!');
        }

        if (target.bot) {
            return message.reply('❌ You can\'t give coins to bots!');
        }

        const amount = parseInt(args[1]);
        if (isNaN(amount) || amount < 1) {
            return message.reply('❌ Please provide a valid amount!');
        }

        const sender = getAccount(message.author.id);
        getAccount(target.id); // Make sure receiver has account

        if (sender.wallet < amount) {
            return message.reply(`❌ You only have **${sender.wallet}** 🪙 in your wallet!`);
        }

        updateWallet(message.author.id, -amount);
        updateWallet(target.id, amount);

        message.reply(`✅ You gave **${amount.toLocaleString()}** 🪙 to **${target.username}**!`);
    }
};
