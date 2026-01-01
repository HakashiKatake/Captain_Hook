import { EmbedBuilder } from 'discord.js';

export default {
    name: 'hotcalc',
    aliases: ['howhot', 'hot'],
    description: 'Calculate how hot someone is',
    usage: '[user]',
    example: '!hot @user',
    category: 'fun',
    guildOnly: true,
    cooldown: 3,

    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;

        // Use user ID as seed for consistent results
        const seed = parseInt(target.id.slice(-4), 10);
        const hot = ((seed % 100) / 1.17).toFixed(2);

        let emoji = '💔';
        if (hot > 25) emoji = '❤️';
        if (hot > 50) emoji = '💖';
        if (hot > 75) emoji = '💞';

        const embed = new EmbedBuilder()
            .setTitle('🔥 Hotness Calculator')
            .setDescription(`**${target.username}** is **${hot}%** hot ${emoji}`)
            .setColor('#FF4500')
            .setThumbnail(target.displayAvatarURL());
        message.channel.send({ embeds: [embed] });
    }
};
