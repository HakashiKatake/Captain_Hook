import { EmbedBuilder } from 'discord.js';
import { getAccount, updateWallet } from '../../utils/economy.js';

export default {
    name: 'rob',
    aliases: ['steal'],
    description: 'Rob another user',
    usage: '<user>',
    example: '$rob @user',
    category: 'economy',
    guildOnly: true,
    cooldown: 120,

    async execute(message, args, client) {
        const target = message.mentions.users.first();

        if (!target) {
            return message.reply('❌ Please mention someone to rob!');
        }

        if (target.id === message.author.id) {
            return message.reply('❌ You can\'t rob yourself!');
        }

        if (target.bot) {
            return message.reply('❌ You can\'t rob bots!');
        }

        const robber = getAccount(message.author.id);
        const victim = getAccount(target.id);

        // Need at least 500 to rob
        if (robber.wallet < 500) {
            return message.reply('❌ You need at least **500** 🪙 in your wallet to rob!');
        }

        // Can't rob broke people
        if (victim.wallet < 100) {
            return message.reply(`❌ **${target.username}** doesn't have enough to rob!`);
        }

        // 40% success rate
        if (Math.random() < 0.4) {
            // Success!
            const stolen = Math.floor(Math.random() * Math.min(victim.wallet, 1000)) + 100;

            updateWallet(message.author.id, stolen);
            updateWallet(target.id, -stolen);

            const embed = new EmbedBuilder()
                .setTitle('💰 Robbery Successful!')
                .setDescription(`You stole **${stolen}** 🪙 from **${target.username}**!`)
                .setColor('#2ECC71');

            message.reply({ embeds: [embed] });
        } else {
            // Failed! Pay fine
            const fine = Math.floor(robber.wallet * 0.3);
            updateWallet(message.author.id, -fine);

            const embed = new EmbedBuilder()
                .setTitle('🚔 Robbery Failed!')
                .setDescription(
                    `You got caught trying to rob **${target.username}**!\n` +
                    `You paid a fine of **${fine}** 🪙`
                )
                .setColor('#E74C3C');

            message.reply({ embeds: [embed] });
        }
    }
};
