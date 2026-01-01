import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

// Store active games
const activeGames = new Map();

export default {
    name: 'tictactoe',
    aliases: ['ttt'],
    description: 'Play Tic-Tac-Toe with another user',
    usage: '<@player1> <@player2>',
    example: '!tictactoe @user1 @user2',
    category: 'games',
    guildOnly: true,
    cooldown: 10,

    async execute(message, args, client) {
        // Get players
        const player1 = message.mentions.members.first();
        const player2 = message.mentions.members.at(1);

        if (!player1 || !player2) {
            return message.reply({
                content: '❌ Please mention two players! Usage: `!tictactoe @player1 @player2`',
                allowedMentions: { repliedUser: false }
            });
        }

        if (player1.id === player2.id) {
            return message.reply({
                content: "❌ You can't play against yourself!",
                allowedMentions: { repliedUser: false }
            });
        }

        if (player1.user.bot || player2.user.bot) {
            return message.reply({
                content: "❌ You can't play against bots!",
                allowedMentions: { repliedUser: false }
            });
        }

        // Check if players are already in a game
        const gameKey = `${message.guild.id}-ttt`;
        if (activeGames.has(gameKey)) {
            return message.reply({
                content: '❌ There is already an active game in this server! Use `!end` to end it.',
                allowedMentions: { repliedUser: false }
            });
        }

        // Initialize game
        const gameState = {
            board: ['⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜'],
            player1: { id: player1.id, name: player1.displayName, mark: '❌' },
            player2: { id: player2.id, name: player2.displayName, mark: '⭕' },
            currentPlayer: player1.id,
            messageId: null,
            channelId: message.channel.id
        };

        activeGames.set(gameKey, gameState);

        // Create buttons
        const rows = createBoardButtons(gameState);

        const embed = new EmbedBuilder()
            .setTitle('🎮 Tic-Tac-Toe')
            .setDescription(`**${player1.displayName}** (❌) vs **${player2.displayName}** (⭕)\n\n${player1.displayName}'s turn!`)
            .setColor('#5865F2')
            .setFooter({ text: 'Click a button to place your mark!' });

        const gameMessage = await message.channel.send({ embeds: [embed], components: rows });
        gameState.messageId = gameMessage.id;

        // Create collector for button interactions
        const collector = gameMessage.createMessageComponentCollector({
            filter: (i) => [player1.id, player2.id].includes(i.user.id),
            time: 300000 // 5 minutes
        });

        collector.on('collect', async (interaction) => {
            const game = activeGames.get(gameKey);
            if (!game) return;

            // Check if it's the user's turn
            if (interaction.user.id !== game.currentPlayer) {
                return interaction.reply({ content: "❌ It's not your turn!", ephemeral: true });
            }

            const position = parseInt(interaction.customId.split('-')[1]);

            // Check if position is already taken
            if (game.board[position] !== '⬜') {
                return interaction.reply({ content: '❌ This position is already taken!', ephemeral: true });
            }

            // Make move
            const currentMark = game.currentPlayer === game.player1.id ? '❌' : '⭕';
            game.board[position] = currentMark;

            // Check for winner
            const winner = checkWinner(game.board);
            const isDraw = !game.board.includes('⬜');

            if (winner || isDraw) {
                collector.stop();
                activeGames.delete(gameKey);

                const resultEmbed = new EmbedBuilder()
                    .setTitle('🎮 Tic-Tac-Toe - Game Over!')
                    .setColor(winner ? '#57F287' : '#FEE75C');

                if (winner) {
                    const winnerPlayer = currentMark === '❌' ? game.player1 : game.player2;
                    resultEmbed.setDescription(`🎉 **${winnerPlayer.name}** wins!`);
                } else {
                    resultEmbed.setDescription("🤝 It's a draw!");
                }

                resultEmbed.addFields({ name: 'Final Board', value: formatBoard(game.board) });

                await interaction.update({ embeds: [resultEmbed], components: [] });
                return;
            }

            // Switch turns
            game.currentPlayer = game.currentPlayer === game.player1.id ? game.player2.id : game.player1.id;
            const nextPlayer = game.currentPlayer === game.player1.id ? game.player1 : game.player2;

            const updatedEmbed = new EmbedBuilder()
                .setTitle('🎮 Tic-Tac-Toe')
                .setDescription(`**${game.player1.name}** (❌) vs **${game.player2.name}** (⭕)\n\n${nextPlayer.name}'s turn!`)
                .setColor('#5865F2');

            const updatedRows = createBoardButtons(game);
            await interaction.update({ embeds: [updatedEmbed], components: updatedRows });
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                activeGames.delete(gameKey);
                message.channel.send('⏰ Tic-Tac-Toe game ended due to inactivity.');
            }
        });
    }
};

function createBoardButtons(game) {
    const rows = [];

    for (let i = 0; i < 3; i++) {
        const row = new ActionRowBuilder();
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const cell = game.board[index];

            row.addComponents(
                new ButtonBuilder()
                    .setCustomId(`ttt-${index}`)
                    .setLabel(cell === '⬜' ? '\u200b' : cell)
                    .setStyle(cell === '⬜' ? ButtonStyle.Secondary : (cell === '❌' ? ButtonStyle.Danger : ButtonStyle.Primary))
                    .setDisabled(cell !== '⬜')
            );
        }
        rows.push(row);
    }

    return rows;
}

function formatBoard(board) {
    let result = '';
    for (let i = 0; i < 9; i += 3) {
        result += `${board[i]} ${board[i + 1]} ${board[i + 2]}\n`;
    }
    return result;
}

function checkWinner(board) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of winConditions) {
        if (board[a] !== '⬜' && board[a] === board[b] && board[b] === board[c]) {
            return board[a];
        }
    }

    return null;
}
