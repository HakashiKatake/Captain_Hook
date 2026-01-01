import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { randomChoice } from '../../utils/helpers.js';

export default {
    name: 'rps',
    aliases: ['rockpaperscissors'],
    description: 'Play Rock Paper Scissors against the bot',
    usage: '',
    example: '!rps',
    category: 'games',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setTitle('🎮 Rock Paper Scissors')
            .setDescription('Choose your weapon!')
            .setColor('#5865F2')
            .setFooter({ text: `Playing against ${client.user.username}` });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('rps-rock')
                    .setLabel('🪨 Rock')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('rps-paper')
                    .setLabel('📄 Paper')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('rps-scissors')
                    .setLabel('✂️ Scissors')
                    .setStyle(ButtonStyle.Secondary)
            );

        const gameMessage = await message.reply({
            embeds: [embed],
            components: [row],
            allowedMentions: { repliedUser: false }
        });

        const collector = gameMessage.createMessageComponentCollector({
            filter: (i) => i.user.id === message.author.id,
            time: 30000,
            max: 1
        });

        collector.on('collect', async (interaction) => {
            const playerChoice = interaction.customId.split('-')[1];
            const choices = ['rock', 'paper', 'scissors'];
            const botChoice = randomChoice(choices);

            const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };

            // Determine winner
            let result, color;
            if (playerChoice === botChoice) {
                result = "🤝 It's a tie!";
                color = '#FEE75C';
            } else if (
                (playerChoice === 'rock' && botChoice === 'scissors') ||
                (playerChoice === 'paper' && botChoice === 'rock') ||
                (playerChoice === 'scissors' && botChoice === 'paper')
            ) {
                result = '🎉 You win!';
                color = '#57F287';
            } else {
                result = '💀 You lose!';
                color = '#ED4245';
            }

            const resultEmbed = new EmbedBuilder()
                .setTitle('🎮 Rock Paper Scissors - Result')
                .setDescription(result)
                .addFields(
                    { name: 'Your Choice', value: `${emojis[playerChoice]} ${playerChoice}`, inline: true },
                    { name: 'Bot Choice', value: `${emojis[botChoice]} ${botChoice}`, inline: true }
                )
                .setColor(color)
                .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() });

            await interaction.update({ embeds: [resultEmbed], components: [] });
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time' && collected.size === 0) {
                const timeoutEmbed = new EmbedBuilder()
                    .setTitle('🎮 Rock Paper Scissors')
                    .setDescription('⏰ Game timed out!')
                    .setColor('#ED4245');

                gameMessage.edit({ embeds: [timeoutEmbed], components: [] }).catch(() => { });
            }
        });
    }
};
