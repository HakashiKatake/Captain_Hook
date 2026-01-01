import { EmbedBuilder } from 'discord.js';
import { randomChoice } from '../../utils/helpers.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load words from file or use default
let words = ['discord', 'javascript', 'captain', 'programming', 'computer', 'keyboard'];
try {
    const wordsPath = join(__dirname, '../../data/hangmanwords.txt');
    words = readFileSync(wordsPath, 'utf-8').split('\n').filter(w => w.trim());
} catch {
    // Use default words
}

// Active games storage
const activeGames = new Map();

export default {
    name: 'hangman',
    aliases: ['hm'],
    description: 'Play a game of hangman',
    usage: '',
    example: '!hangman',
    category: 'games',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const gameKey = `${message.channel.id}-hangman`;

        // Check for existing game
        if (activeGames.has(gameKey)) {
            return message.reply({
                content: '❌ There is already an active hangman game in this channel! Use `!hend` to end it.',
                allowedMentions: { repliedUser: false }
            });
        }

        // Initialize game
        const word = randomChoice(words).toLowerCase().trim();
        const game = {
            word,
            guessed: [],
            guessesLeft: 6,
            playerId: message.author.id,
            playerName: message.author.username
        };

        activeGames.set(gameKey, game);

        const embed = createHangmanEmbed(game);
        message.channel.send({ embeds: [embed] });
        message.channel.send(`🎮 ${message.author}, use \`!hguess <letter>\` to guess a letter!`);
    }
};

// Hangman guess command
export const hguess = {
    name: 'hguess',
    aliases: ['hg'],
    description: 'Guess a letter in hangman',
    usage: '<letter>',
    example: '!hguess e',
    category: 'games',
    guildOnly: true,

    async execute(message, args, client) {
        const gameKey = `${message.channel.id}-hangman`;
        const game = activeGames.get(gameKey);

        if (!game) {
            return message.reply({
                content: '❌ No active hangman game! Start one with `!hangman`',
                allowedMentions: { repliedUser: false }
            });
        }

        const guess = args[0]?.toLowerCase();

        if (!guess || guess.length !== 1 || !/[a-z]/.test(guess)) {
            return message.reply({
                content: '❌ Please guess a single letter! Example: `!hguess e`',
                allowedMentions: { repliedUser: false }
            });
        }

        // Check if already guessed
        if (game.guessed.includes(guess)) {
            return message.reply({
                content: `❌ You already guessed **${guess}**!`,
                allowedMentions: { repliedUser: false }
            });
        }

        game.guessed.push(guess);

        // Check if correct
        if (!game.word.includes(guess)) {
            game.guessesLeft--;
        }

        // Check win/lose
        const displayWord = getDisplayWord(game);
        const hasWon = !displayWord.includes('_');
        const hasLost = game.guessesLeft <= 0;

        if (hasWon || hasLost) {
            activeGames.delete(gameKey);

            const embed = new EmbedBuilder()
                .setTitle(hasWon ? '🎉 Hangman - You Win!' : '💀 Hangman - Game Over!')
                .setColor(hasWon ? '#57F287' : '#ED4245')
                .setDescription(hasWon
                    ? `Congratulations! You guessed the word: **${game.word}**`
                    : `The word was: **${game.word}**`)
                .addFields({ name: 'Guessed Letters', value: game.guessed.join(', ') || 'None' });

            return message.channel.send({ embeds: [embed] });
        }

        const embed = createHangmanEmbed(game);
        message.channel.send({ embeds: [embed] });
    }
};

// Hangman end command
export const hend = {
    name: 'hend',
    aliases: [],
    description: 'End the current hangman game',
    usage: '',
    example: '!hend',
    category: 'games',
    guildOnly: true,

    async execute(message, args, client) {
        const gameKey = `${message.channel.id}-hangman`;
        const game = activeGames.get(gameKey);

        if (!game) {
            return message.reply({
                content: '❌ No active hangman game to end!',
                allowedMentions: { repliedUser: false }
            });
        }

        activeGames.delete(gameKey);
        message.channel.send(`🛑 Hangman game ended. The word was: **${game.word}**`);
    }
};

function getDisplayWord(game) {
    return game.word.split('').map(letter =>
        game.guessed.includes(letter) ? letter : '_'
    ).join(' ');
}

function getHangmanArt(guessesLeft) {
    const stages = [
        '```\n  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========\n```',
        '```\n  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========\n```',
        '```\n  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========\n```',
        '```\n  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========\n```',
        '```\n  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========\n```',
        '```\n  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========\n```',
        '```\n  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========\n```'
    ];

    return stages[guessesLeft] || stages[6];
}

function createHangmanEmbed(game) {
    return new EmbedBuilder()
        .setTitle('🎮 Hangman')
        .setColor('#5865F2')
        .setDescription(getHangmanArt(game.guessesLeft))
        .addFields(
            { name: 'Word', value: `\`${getDisplayWord(game)}\``, inline: true },
            { name: 'Guesses Left', value: `${game.guessesLeft}`, inline: true },
            { name: 'Guessed', value: game.guessed.join(', ') || 'None', inline: true }
        )
        .setFooter({ text: 'Use !hguess <letter> to guess' });
}
