import { EmbedBuilder } from 'discord.js';

export default {
    name: 'getemotes',
    aliases: ['emotes', 'listemotes'],
    description: 'List all emojis in the server',
    usage: '',
    example: '!getemotes',
    category: 'utility',
    guildOnly: true,
    cooldown: 10,

    async execute(message, args, client) {
        const emojis = message.guild.emojis.cache;

        if (emojis.size === 0) {
            return message.reply("No server emotes found.");
        }

        // Split into chunks to avoid message limit
        const emojiList = emojis.map(e => `${e} \`:${e.name}:\``).join('\n');

        if (emojiList.length > 2000) {
            // Send as chunks or strict limit
            const chunks = emojiList.match(/[\s\S]{1,1900}/g) || [];
            for (const chunk of chunks) {
                await message.channel.send(chunk);
            }
        } else {
            await message.channel.send(emojiList);
        }
    }
};
