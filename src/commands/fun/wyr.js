import { EmbedBuilder } from 'discord.js';
import { randomChoice } from '../../utils/helpers.js';

export default {
    name: 'wyr',
    aliases: ['wouldyourather'],
    description: 'Play Would You Rather',
    usage: '',
    example: '!wyr',
    category: 'fun',
    guildOnly: false,
    cooldown: 5,

    async execute(message, args, client) {
        const questions = [
            "Would you rather be able to fly or be invisible?",
            "Would you rather always be 10 minutes late or always be 20 minutes early?",
            "Would you rather lose all of your money and valuables or all of the pictures you have ever taken?",
            "Would you rather be able to talk with the animals or speak all foreign languages?",
            "Would you rather be born with an elephant trunk or a giraffe neck?",
            "Would you rather live without the internet or live without AC and heating?",
            "Would you rather have a rewind button or a pause button on your life?",
            "Would you rather be able to read minds or predict the future?",
            "Would you rather have super strength or super speed?",
            "Would you rather never receive anything new or never be able to get rid of anything old?"
        ];

        const question = randomChoice(questions);

        const embed = new EmbedBuilder()
            .setTitle('🤔 Would You Rather...')
            .setDescription(question)
            .setColor('#3498db')
            .setFooter({ text: 'Reply with your choice!' });

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
