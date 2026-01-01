import { EmbedBuilder } from 'discord.js';
import { randomChoice } from '../../utils/helpers.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fortunes = require('../../data/fortunes.json');

export default {
    name: 'fortune',
    aliases: ['f'],
    description: 'Get a random fortune or proverb',
    usage: '',
    example: '!fortune',
    category: 'fun',
    guildOnly: false,
    cooldown: 5,

    async execute(message, args, client) {
        const fortune = randomChoice(fortunes);

        // Creating a simple but nice embed
        const embed = new EmbedBuilder()
            .setColor('#9B59B6') // Purple
            .setTitle('🔮 Your Fortune')
            .setDescription(`*"${fortune}"*`)
            .setFooter({ text: 'Captain Hook Fortune Teller' });

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
