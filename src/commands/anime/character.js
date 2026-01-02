import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

// Keywords that indicate adult content in character descriptions
const ADULT_KEYWORDS = [
    'hentai', 'ecchi', 'nude', 'erotic', 'sex', 'sexual', 'naked',
    'pornographic', 'adult only', '18+', 'explicit', 'nsfw'
];

function containsAdultContent(text) {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    return ADULT_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

export default {
    name: 'character',
    aliases: ['char', 'anichar'],
    description: 'Search for an anime character',
    usage: '<name>',
    example: '!character Luffy',
    category: 'anime',
    guildOnly: false,
    cooldown: 5,

    async execute(message, args, client) {
        const query = args.join(' ');

        if (!query) {
            return message.reply({ content: '❌ Please provide a character name!', allowedMentions: { repliedUser: false } });
        }

        try {
            const response = await fetch(`https://api.jikan.moe/v4/characters?q=${encodeURIComponent(query)}&limit=1`);
            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                return message.reply({ content: '❌ No character found!', allowedMentions: { repliedUser: false } });
            }

            const char = data.data[0];

            // Check for adult content in description
            const isAdultContent = containsAdultContent(char.about);
            const isNsfwChannel = message.channel.nsfw === true;
            const showImage = !isAdultContent || isNsfwChannel;

            // Censor description if adult content in non-NSFW channel
            let description = char.about || 'No description available.';
            if (isAdultContent && !isNsfwChannel) {
                description = '*Description hidden due to potentially inappropriate content. Use this command in an NSFW channel for full details.*';
            } else if (description.length > 2000) {
                description = description.substring(0, 1997) + '...';
            }

            const embed = new EmbedBuilder()
                .setTitle(char.name)
                .setURL(char.url)
                .setDescription(description)
                .addFields(
                    { name: 'See more', value: `[MyAnimeList](${char.url})`, inline: false }
                )
                .setColor('#2E51A2');

            // Only show image if safe
            if (showImage) {
                embed.setThumbnail(char.images.jpg.image_url);
            }

            if (char.nicknames && char.nicknames.length > 0 && showImage) {
                embed.addFields({ name: 'Nicknames', value: char.nicknames.join(', ').substring(0, 1024) });
            }

            if (!showImage) {
                embed.addFields({
                    name: '⚠️ Content Warning',
                    value: 'Image hidden. Use in an NSFW channel for full content.',
                    inline: false
                });
            }

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

        } catch (error) {
            console.error('Character search error:', error);
            message.reply({ content: '❌ Failed to search for character. Try again later.', allowedMentions: { repliedUser: false } });
        }
    }
};
