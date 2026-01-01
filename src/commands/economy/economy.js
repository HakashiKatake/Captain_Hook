import { EmbedBuilder } from 'discord.js';
import db from '../../utils/database.js';

// Initialize economy table
try {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS economy (
            user_id TEXT PRIMARY KEY,
            wallet INTEGER DEFAULT 500,
            bank INTEGER DEFAULT 0,
            last_daily INTEGER DEFAULT 0,
            last_work INTEGER DEFAULT 0
        )
    `).run();
} catch { }

function getAccount(userId) {
    let account = db.prepare('SELECT * FROM economy WHERE user_id = ?').get(userId);
    if (!account) {
        db.prepare('INSERT INTO economy (user_id, wallet, bank) VALUES (?, 500, 0)').run(userId);
        account = { user_id: userId, wallet: 500, bank: 0, last_daily: 0, last_work: 0 };
    }
    return account;
}

function updateWallet(userId, amount) {
    db.prepare('UPDATE economy SET wallet = wallet + ? WHERE user_id = ?').run(amount, userId);
}

function updateBank(userId, amount) {
    db.prepare('UPDATE economy SET bank = bank + ? WHERE user_id = ?').run(amount, userId);
}

export default {
    name: 'bal',
    aliases: ['balance', 'wallet', 'money'],
    description: 'Check your balance',
    usage: '[user]',
    example: '!bal @user',
    category: 'economy',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const account = getAccount(target.id);

        const embed = new EmbedBuilder()
            .setTitle(`💰 ${target.username}'s Balance`)
            .setColor('#FFD700')
            .addFields(
                { name: '👛 Wallet', value: `${account.wallet} 🪙`, inline: true },
                { name: '🏦 Bank', value: `${account.bank} 🪙`, inline: true }
            )
            .setThumbnail(target.displayAvatarURL());

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};

export const beg = {
    name: 'beg',
    aliases: [],
    description: 'Beg for coins',
    usage: '',
    example: '!beg',
    category: 'economy',
    guildOnly: true,
    cooldown: 60,

    async execute(message, args, client) {
        getAccount(message.author.id);

        // 20% chance of failure
        if (Math.random() < 0.2) {
            return message.reply('You begged for coins but got a 🩴 slap instead!');
        }

        const amount = Math.floor(Math.random() * 141) + 60; // 60-200
        updateWallet(message.author.id, amount);

        const outcomes = [
            `You got **${amount}** 🪙`,
            `Batman gave you **${amount}** 🪙`,
            `You begged your mom for **${amount}** 🪙`,
            `A kind stranger gave you **${amount}** 🪙`
        ];

        message.reply(outcomes[Math.floor(Math.random() * outcomes.length)]);
    }
};

export const work = {
    name: 'work',
    aliases: ['job'],
    description: 'Work for coins',
    usage: '',
    example: '!work',
    category: 'economy',
    guildOnly: true,
    cooldown: 60,

    async execute(message, args, client) {
        getAccount(message.author.id);

        const amount = Math.floor(Math.random() * 201) + 400; // 400-600
        updateWallet(message.author.id, amount);

        const jobs = [
            `You worked in your office for **${amount}** 🪙`,
            `Your boss was happy and gave you **${amount}** 🪙`,
            `You got a promotion! Earned **${amount}** 🪙`,
            `You did overtime and earned **${amount}** 🪙`,
            `You finished a project and earned **${amount}** 🪙`
        ];

        const embed = new EmbedBuilder()
            .setTitle('💼 Work')
            .setDescription(jobs[Math.floor(Math.random() * jobs.length)])
            .setColor('#2ECC71');

        message.reply({ embeds: [embed] });
    }
};

export const deposit = {
    name: 'deposit',
    aliases: ['dep'],
    description: 'Deposit coins to bank',
    usage: '<amount|all>',
    example: '!deposit 100',
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

        message.reply(`✅ Deposited **${amount}** 🪙 to your bank!`);
    }
};

export const withdraw = {
    name: 'withdraw',
    aliases: ['with'],
    description: 'Withdraw coins from bank',
    usage: '<amount|all>',
    example: '!withdraw 100',
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

        message.reply(`✅ Withdrew **${amount}** 🪙 from your bank!`);
    }
};

export const gamble = {
    name: 'gamble',
    aliases: ['bet'],
    description: 'Gamble your coins',
    usage: '<amount>',
    example: '!gamble 100',
    category: 'economy',
    guildOnly: true,
    cooldown: 30,

    async execute(message, args, client) {
        const account = getAccount(message.author.id);

        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount < 100) {
            return message.reply('❌ Minimum bet is 100 coins!');
        }

        if (amount > account.wallet) {
            return message.reply('❌ You don\'t have enough coins!');
        }

        // 25% chance to win
        if (Math.random() < 0.25) {
            const multiplier = [1.5, 1.75, 2, 2.25, 2.5][Math.floor(Math.random() * 5)];
            const winnings = Math.floor(amount * multiplier);
            updateWallet(message.author.id, winnings - amount);
            message.reply(`🎉 You won **${winnings}** 🪙! (${multiplier}x)`);
        } else {
            updateWallet(message.author.id, -amount);
            message.reply(`😢 You lost **${amount}** 🪙!`);
        }
    }
};
