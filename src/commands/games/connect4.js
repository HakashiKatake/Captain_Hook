import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

const activeGames = new Map();

export default {
    name: 'connect4',
    aliases: ['c4', 'four'],
    description: 'Play Connect 4 with another player',
    usage: '<@player2>',
    example: '!connect4 @user',
    category: 'games',
    guildOnly: true,
    cooldown: 10,

    async execute(message, args, client) {
        const player1 = message.author;
        const player2 = message.mentions.users.first();

        if (!player2) {
            return message.reply({ content: '❌ Please mention a user to play with!', allowedMentions: { repliedUser: false } });
        }

        if (player2.id === player1.id) {
            return message.reply({ content: "❌ You can't play against yourself!", allowedMentions: { repliedUser: false } });
        }

        if (player2.bot) {
            return message.reply({ content: "❌ You can't play against a bot!", allowedMentions: { repliedUser: false } });
        }

        const gameKey = `${message.channel.id}-connect4`;
        if (activeGames.has(gameKey)) {
            return message.reply({ content: '❌ There is already a game in this channel!', allowedMentions: { repliedUser: false } });
        }

        // Initialize board (6 rows, 7 columns)
        // 0 = empty, 1 = player1, 2 = player2
        const board = Array(6).fill().map(() => Array(7).fill(0));

        const game = {
            player1,
            player2,
            board,
            turn: 1, // 1 or 2
            message: null
        };

        activeGames.set(gameKey, game);

        const embed = createGameEmbed(game);
        const rows = createControlButtons();

        const gameMessage = await message.channel.send({
            content: `${player2}, you have been challenged to Connect 4 by ${player1}!`,
            embeds: [embed],
            components: rows
        });

        game.message = gameMessage;

        const collector = gameMessage.createMessageComponentCollector({
            filter: (i) => [player1.id, player2.id].includes(i.user.id),
            time: 300000 // 5 minutes
        });

        collector.on('collect', async (interaction) => {
            const g = activeGames.get(gameKey);
            if (!g) return;

            // Check turn
            if ((g.turn === 1 && interaction.user.id !== g.player1.id) ||
                (g.turn === 2 && interaction.user.id !== g.player2.id)) {
                return interaction.reply({ content: "❌ It's not your turn!", ephemeral: true });
            }

            const col = parseInt(interaction.customId.split('_')[1]);

            // Drop piece
            const row = dropPiece(g.board, col, g.turn);

            if (row === -1) {
                return interaction.reply({ content: '❌ That column is full!', ephemeral: true });
            }

            // Check win
            if (checkWin(g.board, g.turn)) {
                collector.stop();
                activeGames.delete(gameKey);

                const winEmbed = createGameEmbed(g).setTitle(`🎉 ${interaction.user.username} Wins!`);
                await interaction.update({ embeds: [winEmbed], components: [] });
                return;
            }

            // Check draw
            if (checkDraw(g.board)) {
                collector.stop();
                activeGames.delete(gameKey);

                const drawEmbed = createGameEmbed(g).setTitle('🤝 It\'s a Draw!');
                await interaction.update({ embeds: [drawEmbed], components: [] });
                return;
            }

            // Switch turn
            g.turn = g.turn === 1 ? 2 : 1;

            const updateEmbed = createGameEmbed(g);
            await interaction.update({ embeds: [updateEmbed], components: rows });
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                activeGames.delete(gameKey);
                gameMessage.edit({ content: '⏰ Game timed out!', components: [] }).catch(() => { });
            }
        });
    }
};

function createGameEmbed(game) {
    let boardStr = '';

    // Build board string
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            if (game.board[r][c] === 0) boardStr += '⚪';
            else if (game.board[r][c] === 1) boardStr += '🔴';
            else boardStr += '🟡';
        }
        boardStr += '\n';
    }
    boardStr += '1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣'; // Column numbers

    const currentPlayer = game.turn === 1 ? game.player1 : game.player2;
    const pieceColor = game.turn === 1 ? '🔴' : '🟡';

    return new EmbedBuilder()
        .setTitle('Connect 4')
        .setDescription(`${boardStr}\n\n${pieceColor} **${currentPlayer.username}'s Turn**`)
        .setColor(game.turn === 1 ? '#FF0000' : '#FFFF00')
        .addFields(
            { name: '🔴 Player 1', value: game.player1.username, inline: true },
            { name: '🟡 Player 2', value: game.player2.username, inline: true }
        );
}

function createControlButtons() {
    const row1 = new ActionRowBuilder();
    const row2 = new ActionRowBuilder();

    for (let i = 0; i < 7; i++) {
        const btn = new ButtonBuilder()
            .setCustomId(`c4_${i}`)
            .setLabel(`${i + 1}`)
            .setStyle(ButtonStyle.Secondary);

        if (i < 4) row1.addComponents(btn);
        else row2.addComponents(btn);
    }

    return [row1, row2];
}

function dropPiece(board, col, player) {
    // Find first empty spot from bottom
    for (let r = 5; r >= 0; r--) {
        if (board[r][col] === 0) {
            board[r][col] = player;
            return r;
        }
    }
    return -1; // Column full
}

function checkWin(board, player) {
    // Horizontal
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === player && board[r][c + 1] === player &&
                board[r][c + 2] === player && board[r][c + 3] === player) return true;
        }
    }

    // Vertical
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 7; c++) {
            if (board[r][c] === player && board[r + 1][c] === player &&
                board[r + 2][c] === player && board[r + 3][c] === player) return true;
        }
    }

    // Diagonal /
    for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === player && board[r - 1][c + 1] === player &&
                board[r - 2][c + 2] === player && board[r - 3][c + 3] === player) return true;
        }
    }

    // Diagonal \
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === player && board[r + 1][c + 1] === player &&
                board[r + 2][c + 2] === player && board[r + 3][c + 3] === player) return true;
        }
    }

    return false;
}

function checkDraw(board) {
    return board[0].every(cell => cell !== 0);
}
