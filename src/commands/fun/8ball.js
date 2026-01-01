import { EmbedBuilder } from 'discord.js';
import { randomChoice } from '../../utils/helpers.js';

const responses = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes, definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    "Don't count on it.",
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
];

export default {
    name: '8ball',
    aliases: ['ball', 'eightball', 'magic8ball'],
    description: 'Ask the magic 8-ball a question',
    usage: '<question>',
    example: '!8ball Will I win the lottery?',
    category: 'fun',
    guildOnly: false,
    cooldown: 3,
    slashOptions: [
        { name: 'question', description: 'Your question for the magic 8-ball', type: 'string', required: true }
    ],

    async execute(message, args, client) {
        const question = args.join(' ');

        if (!question) {
            return message.reply({
                content: '❓ Please ask a question! Example: `!8ball Will I be rich?`',
                allowedMentions: { repliedUser: false }
            });
        }

        const response = randomChoice(responses);

        const embed = new EmbedBuilder()
            .setTitle('🎱 Magic 8-Ball')
            .addFields(
                { name: 'Question', value: question },
                { name: 'Answer', value: `*${response}*` }
            )
            .setColor('#000000')
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
