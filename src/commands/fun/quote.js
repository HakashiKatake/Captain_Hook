import { EmbedBuilder } from 'discord.js';

const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { text: "Two things are infinite: the universe and human stupidity.", author: "Albert Einstein" },
    { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" }
];

export default {
    name: 'quote',
    aliases: ['inspire', 'motivation'],
    description: 'Get an inspirational quote',
    usage: '',
    example: '!quote',
    category: 'fun',
    guildOnly: false,
    cooldown: 5,

    async execute(message, args, client) {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];

        const embed = new EmbedBuilder()
            .setTitle('💭 Inspirational Quote')
            .setDescription(`*"${quote.text}"*`)
            .setColor('#2ECC71')
            .setFooter({ text: `— ${quote.author}` });

        message.channel.send({ embeds: [embed] });
    }
};
