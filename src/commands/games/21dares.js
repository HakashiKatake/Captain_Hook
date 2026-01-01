import { EmbedBuilder } from 'discord.js';

export default {
    name: '21dares',
    aliases: ['tod', 'truthordare'],
    description: 'Play Truth or Dare (21 Style)',
    usage: '',
    example: '!21dares',
    category: 'games',
    guildOnly: true,
    cooldown: 10,

    async execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setTitle('🔥 Truth or Dare (21)')
            .setDescription(`${message.author} is inviting anyone to play Truth or Dare!\n\nType \`accept\` to join the game!`)
            .setColor('#FFA500');

        await message.channel.send({ embeds: [embed] });

        const players = [message.author];
        const gameChannel = message.channel;
        let gameStarted = false;

        // Lobby collector
        const lobbyCollector = gameChannel.createMessageCollector({
            filter: m => !m.author.bot && m.content.toLowerCase() === 'accept',
            time: 60000
        });

        lobbyCollector.on('collect', (m) => {
            if (!players.find(p => p.id === m.author.id)) {
                players.push(m.author);
                m.reply(`✅ **${m.author.username}** joined! (${players.length} players)`);
            }
        });

        lobbyCollector.on('end', async () => {
            if (players.length < 2) {
                return gameChannel.send('❌ Not enough players joined (need at least 2). Game cancelled.');
            }

            gameChannel.send(`🎮 Game starting with ${players.length} players! The order is:\n${players.map(p => p.username).join(' -> ')}`);
            startGame(players, gameChannel);
        });

        // Allow author to start early
        const startFilter = m => m.author.id === message.author.id && m.content.toLowerCase() === 'start';
        const startCollector = gameChannel.createMessageCollector({ filter: startFilter, time: 60000 });

        startCollector.on('collect', () => {
            if (players.length >= 2) {
                lobbyCollector.stop();
                startCollector.stop();
            } else {
                message.channel.send('❌ Need at least 2 players to start!');
            }
        });
    }
};

async function startGame(players, channel) {
    let currentPlayerIndex = 0;
    let currentCount = 0;

    while (currentCount < 21) {
        const player = players[currentPlayerIndex];
        await channel.send(`👉 **${player.username}'s turn!**\nType numbers starting from **${currentCount + 1}**. You can type up to 3 numbers separated by spaces (e.g. \`1 2 3\`).\nIf you reach **21**, you lose!`);

        try {
            const msg = await channel.awaitMessages({
                filter: m => m.author.id === player.id,
                max: 1,
                time: 30000,
                errors: ['time']
            });

            const content = msg.first().content.trim();
            const numbers = content.split(/\s+/).map(n => parseInt(n));

            // Validate input
            if (numbers.some(isNaN)) {
                await channel.send(`❌ Invalid input! **${player.username}** is out!`);
                break; // Simplified for now, could remove player
            }

            // Check limits
            if (numbers.length > 3) {
                await channel.send(`❌ You can only say up to 3 numbers! **${player.username}** is out!`);
                break;
            }

            // Check continuity
            let valid = true;
            for (let i = 0; i < numbers.length; i++) {
                if (numbers[i] !== currentCount + 1 + i) {
                    valid = false;
                    break;
                }
            }

            if (!valid) {
                await channel.send(`❌ Numbers must be consecutive starting from ${currentCount + 1}! **${player.username}** is out!`);
                break;
            }

            // Valid move
            currentCount = numbers[numbers.length - 1];

            if (currentCount >= 21) {
                const loseEmbed = new EmbedBuilder()
                    .setTitle('💀 Game Over!')
                    .setDescription(`**${player.username}** had to say 21!\n\n**${player.username}** lost! Choose **Truth** or **Dare**!`)
                    .setColor('#ED4245');
                await channel.send({ embeds: [loseEmbed] });
                return;
            }

            // Next player
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

        } catch (e) {
            await channel.send(`⏰ **${player.username}** took too long! Game over.`);
            return;
        }
    }
}
