import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
    name: 'meme',
    aliases: ['reddit', 'randommeme'],
    description: 'Get a random meme from Reddit',
    usage: '',
    example: '!meme',
    category: 'fun',
    guildOnly: false,
    cooldown: 5,

    async execute(message, args, client) {
        const subreddits = ['memes', 'dankmemes', 'me_irl', 'wholesomememes'];
        const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

        try {
            const response = await fetch(`https://www.reddit.com/r/${subreddit}/random.json`);

            if (!response.ok) {
                throw new Error('Failed to fetch meme');
            }

            const data = await response.json();

            // Reddit returns an array when fetching random
            const post = data[0]?.data?.children?.[0]?.data;

            if (!post) {
                throw new Error('No meme found');
            }

            // Skip if it's a video or not an image
            if (post.is_video || !post.url.match(/\.(jpg|jpeg|png|gif)$/i)) {
                // Try again with a fallback
                return this.execute(message, args, client);
            }

            // Skip NSFW content
            if (post.over_18) {
                return this.execute(message, args, client);
            }

            const embed = new EmbedBuilder()
                .setTitle(post.title.substring(0, 256))
                .setURL(`https://reddit.com${post.permalink}`)
                .setImage(post.url)
                .setColor('#FF4500')
                .setFooter({
                    text: `👍 ${post.ups} | 💬 ${post.num_comments} | r/${subreddit}`,
                    iconURL: 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png'
                })
                .setTimestamp();

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

        } catch (error) {
            console.error('Meme fetch error:', error);

            // Fallback embed
            const fallbackEmbed = new EmbedBuilder()
                .setTitle('😅 Oops!')
                .setDescription("Couldn't fetch a meme right now. Try again later!")
                .setColor('#ED4245');

            message.reply({ embeds: [fallbackEmbed], allowedMentions: { repliedUser: false } });
        }
    }
};
