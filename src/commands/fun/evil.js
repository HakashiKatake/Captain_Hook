import { EmbedBuilder } from 'discord.js';

const responses = [
    { range: [0, 10], emoji: '😴', text: 'Completely harmless, probably a saint' },
    { range: [11, 25], emoji: '😇', text: 'Pretty innocent, just a few minor sins' },
    { range: [26, 40], emoji: '🙂', text: 'Average person, nothing too crazy' },
    { range: [41, 55], emoji: '😏', text: 'A bit mischievous, has some secrets' },
    { range: [56, 70], emoji: '😈', text: 'Definitely got a dark side' },
    { range: [71, 85], emoji: '👿', text: 'Should probably be on a watchlist' },
    { range: [86, 100], emoji: '💀', text: 'Pure evil incarnate' }
];

export default {
    name: 'evil',
    aliases: ['howevil', 'evilmeter'],
    description: 'How evil is someone?',
    usage: '[user]',
    example: '!evil @user',
    category: 'fun',
    guildOnly: true,
    cooldown: 3,

    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;

        // Consistent result based on user ID
        const seed = parseInt(target.id.slice(-6), 10);
        const percentage = seed % 101;

        const result = responses.find(r => percentage >= r.range[0] && percentage <= r.range[1]);

        const bar = '█'.repeat(Math.floor(percentage / 10)) + '░'.repeat(10 - Math.floor(percentage / 10));

        const embed = new EmbedBuilder()
            .setTitle(`${result.emoji} Evil Meter`)
            .setDescription(
                `**${target.username}** is **${percentage}%** evil!\n\n` +
                `\`[${bar}]\`\n\n` +
                `*${result.text}*`
            )
            .setColor(percentage > 50 ? '#E74C3C' : '#2ECC71')
            .setThumbnail(target.displayAvatarURL());

        message.channel.send({ embeds: [embed] });
    }
};
