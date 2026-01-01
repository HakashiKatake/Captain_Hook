import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { randomInt } from '../../utils/helpers.js';

export default {
    name: 'duel',
    aliases: ['dice', 'rollfight'],
    description: 'Challenge another user to a dice duel',
    usage: '<@user>',
    example: '!duel @user',
    category: 'games',
    guildOnly: true,
    cooldown: 10,

    async execute(message, args, client) {
        const challenger = message.author;
        const opponent = message.mentions.users.first();

        if (!opponent) {
            return message.reply({ content: '❌ Please mention someone to duel!', allowedMentions: { repliedUser: false } });
        }

        if (opponent.id === challenger.id) {
            return message.reply({ content: "❌ You can't duel yourself!", allowedMentions: { repliedUser: false } });
        }

        if (opponent.bot) {
            return message.reply({ content: "❌ You can't duel a bot!", allowedMentions: { repliedUser: false } });
        }

        const embed = new EmbedBuilder()
            .setTitle('⚔️ Duel Challenge')
            .setDescription(`${opponent}, **${challenger.username}** has challenged you to a duel!\n\nDo you accept?`)
            .setColor('#FFA500');

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('duel_accept').setLabel('Accept').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('duel_decline').setLabel('Decline').setStyle(ButtonStyle.Danger)
        );

        const msg = await message.channel.send({ content: `${opponent}`, embeds: [embed], components: [row] });

        try {
            const interaction = await msg.awaitMessageComponent({
                filter: i => i.user.id === opponent.id,
                time: 30000
            });

            if (interaction.customId === 'duel_decline') {
                const declineEmbed = new EmbedBuilder()
                    .setTitle('🏳️ Duel Declined')
                    .setDescription(`**${opponent.username}** declined the duel.`)
                    .setColor('#808080');

                await interaction.update({ embeds: [declineEmbed], components: [] });
                return;
            }

            // Duel Accepted - Start Rolling
            await interaction.update({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('🎲 Duel Started!')
                        .setDescription(`**${challenger.username}** vs **${opponent.username}**\n\nRolling dice...`)
                        .setColor('#5865F2')
                ],
                components: []
            });

            // Simulate rolling
            setTimeout(async () => {
                const roll1 = randomInt(1, 100);
                const roll2 = randomInt(1, 100);

                let winner;
                let resultMsg;
                let color;

                if (roll1 > roll2) {
                    winner = challenger;
                    resultMsg = `**${challenger.username}** wins! 🎉`;
                    color = '#57F287';
                } else if (roll2 > roll1) {
                    winner = opponent;
                    resultMsg = `**${opponent.username}** wins! 🎉`;
                    color = '#57F287';
                } else {
                    resultMsg = "It's a draw! 🤝";
                    color = '#FEE75C';
                }

                const resultEmbed = new EmbedBuilder()
                    .setTitle('🎲 Duel Results')
                    .addFields(
                        { name: challenger.username, value: `Rolled: **${roll1}**`, inline: true },
                        { name: opponent.username, value: `Rolled: **${roll2}**`, inline: true }
                    )
                    .setDescription(resultMsg)
                    .setColor(color);

                await msg.edit({ embeds: [resultEmbed] });

            }, 3000);

        } catch (e) {
            const timeoutEmbed = new EmbedBuilder()
                .setDescription('⏰ Challenge timed out.')
                .setColor('#808080');

            await msg.edit({ embeds: [timeoutEmbed], components: [] });
        }
    }
};
