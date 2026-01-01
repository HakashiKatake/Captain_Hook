import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

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

            const embed = new EmbedBuilder()
                .setTitle(char.name)
                .setURL(char.url)
                .setDescription(char.about ? (char.about.length > 2000 ? char.about.substring(0, 1997) + '...' : char.about) : 'No description available.')
                .setThumbnail(char.images.jpg.image_url)
                .addFields(
                    { name: 'See more', value: `[MyAnimeList](${char.url})`, inline: false }
                )
                .setColor('#2E51A2');

            if (char.nicknames && char.nicknames.length > 0) {
                embed.addFields({ name: 'Nicknames', value: char.nicknames.join(', ').substring(0, 1024) });
            }

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

        } catch (error) {
            console.error('Character search error:', error);
            message.reply({ content: '❌ Failed to search for character. Try again later.', allowedMentions: { repliedUser: false } });
        }
    }
};
