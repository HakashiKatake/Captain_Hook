import { EmbedBuilder, ActivityType } from 'discord.js';

export default {
    name: 'spotify',
    aliases: ['sp'],
    description: 'Check what a user is listening to on Spotify',
    usage: '<@user>',
    example: '!spotify @user',
    category: 'info',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const member = await message.guild.members.fetch(target.id);

        if (!member.presence || !member.presence.activities) {
            return message.reply(`${target.username} is not playing anything on Spotify!`);
        }

        const spotifyActivity = member.presence.activities.find(
            act => act.name === 'Spotify' && act.type === ActivityType.Listening
        );

        if (!spotifyActivity) {
            return message.reply(`${target.username} is not playing anything on Spotify!`);
        }

        const { details, state, assets, timestamps } = spotifyActivity;

        // Calculate duration details if available
        let durationStr = "Unknown";
        let elapsedStr = "";
        if (timestamps && timestamps.start && timestamps.end) {
            const total = timestamps.end - timestamps.start;
            const current = Date.now() - timestamps.start;
            const totalMin = Math.floor(total / 60000);
            const totalSec = Math.floor((total % 60000) / 1000).toString().padStart(2, '0');
            const curMin = Math.floor(current / 60000);
            const curSec = Math.floor((current % 60000) / 1000).toString().padStart(2, '0');
            durationStr = `${totalMin}:${totalSec}`;
            elapsedStr = `${curMin}:${curSec} / `;
        }

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${target.username} is listening to Spotify`, iconURL: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' })
            .setTitle(details || "Unknown Title")
            .setDescription(`by **${state}**`)
            .setColor('#1DB954');

        if (assets && assets.largeImage) {
            embed.setThumbnail(`https://i.scdn.co/image/${assets.largeImage.replace('spotify:', '')}`);
        }

        if (assets && assets.largeText) {
            embed.setFooter({ text: `Album: ${assets.largeText}` });
        }

        if (durationStr !== "Unknown") {
            embed.addFields({ name: 'Duration', value: `${elapsedStr}${durationStr}`, inline: true });
        }

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
