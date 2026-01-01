import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
    name: 'aninews',
    aliases: ['animenews'],
    description: 'Get the latest anime news',
    usage: '',
    example: '!aninews',
    category: 'anime',
    guildOnly: false,
    cooldown: 30,

    async execute(message, args, client) {
        try {
            // Get top anime news or recent news via Jikan
            // Using 'recommendations/anime' or just parsing recent news from a source would be ideal
            // But Jikan doesn't have a direct "global news" endpoint easily accessible without an ID.
            // However, we can use the "top/anime" endpoint and get news for the #1 anime, OR utilize a different strategy.
            // A better approach for "latest news" might be finding a "season" or just news for a popular show.
            // For now, let's fetch news for the currently top airing anime.

            const topResponse = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=1');
            const topData = await topResponse.json();

            if (!topData.data || topData.data.length === 0) {
                return message.reply('Could not fetch anime news.');
            }

            const topAnime = topData.data[0];
            const newsResponse = await fetch(`https://api.jikan.moe/v4/anime/${topAnime.mal_id}/news`);
            const newsData = await newsResponse.json();

            if (!newsData.data || newsData.data.length === 0) {
                return message.reply('No news found for top anime.');
            }

            // Take top 3 news items
            const newsItems = newsData.data.slice(0, 3);

            const embed = new EmbedBuilder()
                .setTitle(`📰 Anime News (Trending: ${topAnime.title})`)
                .setColor('#2E51A2')
                .setThumbnail(topAnime.images.jpg.image_url);

            newsItems.forEach(item => {
                embed.addFields({
                    name: item.title,
                    value: `[Read more](${item.url}) • ${new Date(item.date).toLocaleDateString()}`
                });
            });

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

        } catch (error) {
            console.error('Anime news error:', error);
            message.reply('❌ Failed to fetch anime news.');
        }
    }
};
