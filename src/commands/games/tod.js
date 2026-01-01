import { EmbedBuilder } from 'discord.js';

const truthQuestions = [
    "What's the most embarrassing thing you've ever done?",
    "What's a secret you've never told anyone?",
    "What's your biggest fear?",
    "Who was your first crush?",
    "What's the last lie you told?",
    "What's something you pretend to hate but secretly love?",
    "Have you ever stalked someone on social media?",
    "What's the most childish thing you still do?",
    "What's your guilty pleasure?",
    "What's the weirdest dream you've had?",
    "If you could be invisible for a day, what would you do?",
    "What's something you're afraid to tell your parents?",
    "Have you ever cheated in a game?",
    "What's your most unpopular opinion?",
    "What's the longest you've gone without showering?"
];

const dares = [
    "Send a message in a random server saying 'I love potatoes'",
    "Change your status to something embarrassing for 1 hour",
    "Use only emojis for the next 10 messages",
    "Compliment 3 random people in this server",
    "Talk in third person for 5 minutes",
    "Let someone send a message from your account",
    "Share your most recent selfie",
    "Type with your elbows for 3 messages",
    "Admit your most embarrassing Discord moment",
    "Send 'I'm a little teapot' to 3 people",
    "React to every message for 5 minutes",
    "Share your screen time stats",
    "Use a different language for your next 5 messages",
    "Create a haiku about the last person who messaged",
    "Speak in song lyrics only for 5 minutes"
];

export default {
    name: 'tod',
    aliases: ['truthordare', 'truth', 'dare'],
    description: 'Play Truth or Dare',
    usage: '[truth/dare]',
    example: '!tod truth',
    category: 'games',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const choice = args[0]?.toLowerCase();

        let title, content, color;

        if (choice === 'truth' || choice === 't') {
            title = '🔮 Truth';
            content = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
            color = '#3498DB';
        } else if (choice === 'dare' || choice === 'd') {
            title = '🔥 Dare';
            content = dares[Math.floor(Math.random() * dares.length)];
            color = '#E74C3C';
        } else {
            // Random pick
            if (Math.random() < 0.5) {
                title = '🔮 Truth';
                content = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
                color = '#3498DB';
            } else {
                title = '🔥 Dare';
                content = dares[Math.floor(Math.random() * dares.length)];
                color = '#E74C3C';
            }
        }

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(`**${message.author.username}**, ${content}`)
            .setColor(color)
            .setFooter({ text: 'Use $tod truth or $tod dare' });

        message.channel.send({ embeds: [embed] });
    }
};
