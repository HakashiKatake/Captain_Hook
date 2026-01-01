import { EmbedBuilder } from 'discord.js';
import { getAccount } from '../../utils/economy.js';

export default {
    name: 'bal',
    aliases: ['balance', 'wallet', 'money'],
    description: 'Check your balance',
    usage: '[user]',
    example: '$bal @user',
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
                { name: '👛 Wallet', value: `${account.wallet.toLocaleString()} 🪙`, inline: true },
                { name: '🏦 Bank', value: `${account.bank.toLocaleString()} 🪙`, inline: true },
                { name: '💎 Total', value: `${(account.wallet + account.bank).toLocaleString()} 🪙`, inline: true }
            )
            .setThumbnail(target.displayAvatarURL());

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
