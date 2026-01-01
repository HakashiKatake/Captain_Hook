import { EmbedBuilder } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomChoice } from '../../utils/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the data file exists or use fallbacks
const dataPath = path.join(__dirname, '../../data/typingtext.txt');
// fallback sentences if file read fails
const fallbackSentences = [
    "The quick brown fox jumps over the lazy dog",
    "Pack my box with five dozen liquor jugs",
    "How vexingly quick daft zebras jump",
    "Sphinx of black quartz, judge my vow",
    "Two driven jocks help fax my big quiz"
];

let sentences = fallbackSentences;
try {
    if (fs.existsSync(dataPath)) {
        const fileContent = fs.readFileSync(dataPath, 'utf-8');
        sentences = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    }
} catch (err) {
    console.error("Error loading typingtext.txt:", err);
}

export default {
    name: 'wpm',
    aliases: ['typing', 'type'],
    description: 'Test your typing speed',
    usage: '',
    example: '!wpm',
    category: 'games',
    guildOnly: true,
    cooldown: 10,

    async execute(message, args, client) {
        const sentence = randomChoice(sentences);
        // Use visible characters to prevent copy-paste exploits if desired, 
        // but for now standard text. ZWS or images are harder to implement simply.

        const embed = new EmbedBuilder()
            .setTitle('⌨️ Typing Test')
            .setDescription(`Type the following sentence as fast as you can!\n\n**${sentence}**`)
            .setColor('#3498db')
            .setFooter({ text: 'You have 30 seconds!' });

        await message.reply({ embeds: [embed] });

        const startTime = Date.now();
        const filter = m => m.author.id === message.author.id && m.content === sentence;

        try {
            const collected = await message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] });
            const msg = collected.first();
            const endTime = Date.now();
            const timeTaken = (endTime - startTime) / 1000;
            const wpm = Math.round((sentence.length / 5) / (timeTaken / 60));

            const resultEmbed = new EmbedBuilder()
                .setTitle('✅ Finished!')
                .setDescription(`Time: **${timeTaken.toFixed(2)}s**\nWPM: **${wpm}**`)
                .setColor('#2ecc71');

            await msg.reply({ embeds: [resultEmbed] });

        } catch (e) {
            message.channel.send(`⏰ Time's up! You didn't type the sentence in time.`);
        }
    }
};
