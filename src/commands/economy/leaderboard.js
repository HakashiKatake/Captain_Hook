import { EmbedBuilder } from 'discord.js';
import { getTopUsers } from '../../utils/economy.js';

export default {
    name: 'leaderboard',
    aliases: ['lb', 'rich', 'top'],
    description: 'View the richest users',
    usage: '',
    example: '$leaderboard',
    category: 'economy',
    guildOnly: true,
    cooldown: 10,

    async execute(message, args, client) {
        const topUsers = getTopUsers(10);

        if (topUsers.length === 0) {
            return message.reply('❌ No users in the economy yet!');
        }

        const medals = ['🥇', '🥈', '🥉'];

        let leaderboard = '';
        for (let i = 0; i < topUsers.length; i++) {
            const user = topUsers[i];
            const medal = medals[i] || `**${i + 1}.**`;

            try {
                const discordUser = await client.users.fetch(user.user_id);
                leaderboard += `${medal} **${discordUser.username}** — ${user.total.toLocaleString()} 🪙\n`;
            } catch {
                leaderboard += `${medal} Unknown User — ${user.total.toLocaleString()} 🪙\n`;
            }
        }

        const embed = new EmbedBuilder()
            .setTitle('🏆 Richest Users')
            .setDescription(leaderboard)
            .setColor('#FFD700')
            .setFooter({ text: 'Use $work, $daily, $gamble to earn more!' });

        message.reply({ embeds: [embed] });
    }
};
