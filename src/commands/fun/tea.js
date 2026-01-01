import { EmbedBuilder } from 'discord.js';
import { randomChoice } from '../../utils/helpers.js';

export default {
    name: 'tea',
    aliases: ['drinktea'],
    description: 'Offer some tea to someone',
    usage: '<@user>',
    example: '!tea @user',
    category: 'fun',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const target = message.mentions.users.first();

        if (!target) {
            return message.reply({ content: '🍵 You made some tea for yourself. Sip sip...', allowedMentions: { repliedUser: false } });
        }

        if (target.id === message.author.id) {
            return message.reply({ content: '🍵 You enjoy a nice cup of tea by yourself.', allowedMentions: { repliedUser: false } });
        }

        const embed = new EmbedBuilder()
            .setDescription(`**${message.author.username}** offers a cup of tea to **${target.username}** 🍵`)
            .setImage('https://media.giphy.com/media/l0MYH8Q83CXvCszks/giphy.gif')
            .setColor('#27ae60');

        message.channel.send({ content: `${target}`, embeds: [embed] });
    }
};
