import { EmbedBuilder } from 'discord.js';
import { getSnipe } from '../../utils/database.js';

export default {
    name: 'snipe',
    aliases: [],
    description: 'Retrieve the last deleted message in this channel',
    usage: '',
    example: '!snipe',
    category: 'misc',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const snipedMessage = getSnipe(message.channel.id);

        if (!snipedMessage) {
            const embed = new EmbedBuilder()
                .setDescription(`There are no deleted messages in #${message.channel.name}!`)
                .setColor('#00c230');

            return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        }

        const embed = new EmbedBuilder()
            .setAuthor({ name: `Last deleted message in #${message.channel.name}` })
            .setDescription(`\`${snipedMessage.content}\``)
            .addFields({ name: 'Author', value: snipedMessage.author_name, inline: true })
            .setColor('#00c230')
            .setFooter({
                text: `Deleted ${getTimeAgo(snipedMessage.timestamp)}`
            })
            .setTimestamp(snipedMessage.timestamp);

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};

function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return `${seconds} second(s) ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minute(s) ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour(s) ago`;
    return `${Math.floor(seconds / 86400)} day(s) ago`;
}
