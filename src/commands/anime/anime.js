import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

// NSFW ratings that should only show images in NSFW channels
const ADULT_RATINGS = ['R+ - Mild Nudity', 'Rx - Hentai', 'R - 17+ (violence & profanity)'];

export default {
    name: 'anime',
    aliases: ['ani', 'searchanime'],
    description: 'Search for an anime on MyAnimeList',
    usage: '<name>',
    example: '!anime One Piece',
    category: 'anime',
    guildOnly: false,
    cooldown: 5,

    async execute(message, args, client) {
        const query = args.join(' ');

        if (!query) {
            return message.reply({ content: '❌ Please provide an anime name!', allowedMentions: { repliedUser: false } });
        }

        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`);
            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                return message.reply({ content: '❌ No anime found!', allowedMentions: { repliedUser: false } });
            }

            const anime = data.data[0];

            // Check if anime is adult content
            const isAdultContent = ADULT_RATINGS.includes(anime.rating);
            const isNsfwChannel = message.channel.nsfw === true;

            // Determine if we should show the image
            const showImage = !isAdultContent || isNsfwChannel;

            const embed = new EmbedBuilder()
                .setTitle(anime.title)
                .setURL(anime.url)
                .setDescription(anime.synopsis ? (anime.synopsis.length > 2000 ? anime.synopsis.substring(0, 1997) + '...' : anime.synopsis) : 'No description available.')
                .addFields(
                    { name: 'See more', value: `[MyAnimeList](${anime.url})`, inline: false },
                    { name: 'Episodes', value: `${anime.episodes || '?'}`, inline: true },
                    { name: 'Score', value: `${anime.score}/10`, inline: true },
                    { name: 'Type', value: anime.type || 'Unknown', inline: true },
                    { name: 'Status', value: anime.status || 'Unknown', inline: true },
                    { name: 'Rating', value: anime.rating || 'N/A', inline: true },
                    { name: 'Aired', value: anime.aired?.string || 'Unknown', inline: true }
                )
                .setColor('#2E51A2') // MAL Blue
                .setFooter({ text: `MAL ID: ${anime.mal_id}` });

            // Only show image if content is appropriate for the channel
            if (showImage) {
                embed.setThumbnail(anime.images.jpg.image_url);
            } else {
                // Add warning for adult content in non-NSFW channel
                embed.addFields({
                    name: '⚠️ Adult Content',
                    value: 'Image hidden. Use this command in an NSFW channel to view the image.',
                    inline: false
                });
            }

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

        } catch (error) {
            console.error('Anime search error:', error);
            message.reply({ content: '❌ Failed to search for anime. Try again later.', allowedMentions: { repliedUser: false } });
        }
    }
};
