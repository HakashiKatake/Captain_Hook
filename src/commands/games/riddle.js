import { EmbedBuilder } from 'discord.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load riddles
let riddles = [];
try {
    const data = readFileSync(join(__dirname, '../../data/riddles.txt'), 'utf-8');
    const lines = data.split('\n').filter(l => l.trim());
    // Riddles file format seems to be: Line 1: Riddle, Line 2: Answer (based on original code loop)
    // original loop: riddleLine = random, riddle = lines[riddleLine], riddleAnswer = lines[riddleLine+1]
    // This implies riddle is on even lines (0, 2...) and answer on odd lines (1, 3...)

    for (let i = 0; i < lines.length - 1; i += 2) {
        if (lines[i] && lines[i + 1]) {
            riddles.push({
                question: lines[i].trim(),
                answer: lines[i + 1].replace('=', '').trim()
            });
        }
    }
} catch (e) {
    console.error('Error loading riddles:', e);
    // Fallback
    riddles.push({ question: "What has keys but can't open locks?", answer: "piano" });
}

// Active sessions
// Map<channelId, { answer: string, guesses: number, solver: string }>
const activeRiddles = new Map();

export default {
    name: 'riddle',
    aliases: [],
    description: 'Solve a riddle',
    usage: '',
    example: '!riddle',
    category: 'games',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        if (activeRiddles.has(message.channel.id)) {
            return message.reply('❌ There is already an active riddle in this channel!');
        }

        // Pick random riddle
        const riddle = riddles[Math.floor(Math.random() * riddles.length)];

        activeRiddles.set(message.channel.id, {
            answer: riddle.answer.toLowerCase(),
            guesses: 3,
            startTime: Date.now()
        });

        const embed = new EmbedBuilder()
            .setTitle('🧩 Riddle Time!')
            .setDescription(`**${riddle.question}**\n\n*Type \`!answer <your guess>\` to solve it!*`)
            .setFooter({ text: 'Answer is one word or number. 3 guesses allowed.' })
            .setThumbnail('https://cdn-icons-png.flaticon.com/512/3069/3069172.png')
            .setColor('#5865F2');

        await message.channel.send({ embeds: [embed] });
    }
};

export const answer = {
    name: 'answer',
    aliases: ['solve'],
    description: 'Answer the current riddle',
    usage: '<answer>',
    example: '!answer piano',
    category: 'games',
    guildOnly: true,

    async execute(message, args, client) {
        const session = activeRiddles.get(message.channel.id);

        if (!session) {
            return message.reply('❌ No active riddle in this channel! Use `!riddle` to start one.');
        }

        const guess = args.join(' ').toLowerCase().trim();
        if (!guess) return message.reply('Please provide an answer!');

        if (guess === session.answer) {
            activeRiddles.delete(message.channel.id);

            const embed = new EmbedBuilder()
                .setTitle('🎉 Correct!')
                .setDescription(`**${message.author.username}** solved the riddle!\nThe answer was: **${session.answer}**`)
                .setColor('#57F287');

            return message.channel.send({ embeds: [embed] });
        } else {
            session.guesses--;

            if (session.guesses <= 0) {
                activeRiddles.delete(message.channel.id);

                const embed = new EmbedBuilder()
                    .setTitle('💀 Game Over')
                    .setDescription(`Out of guesses! The answer was: **${session.answer}**`)
                    .setColor('#ED4245');

                return message.channel.send({ embeds: [embed] });
            }

            return message.reply(`❌ Incorrect! ${session.guesses} guess(es) left.`);
        }
    }
};
