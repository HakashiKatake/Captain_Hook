import { parseEmoji } from 'discord.js';

export default {
    name: 'emoji',
    aliases: ['steal', 'cloneemoji'],
    description: 'Clone an emoji to this server',
    usage: '<emoji>',
    example: '!emoji :pepe:',
    category: 'utility',
    guildOnly: true,
    permissions: ['ManageEmojisAndStickers'],
    cooldown: 10,

    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageEmojisAndStickers')) {
            return message.reply("You don't have permission to manage emojis.");
        }

        if (args.length === 0) {
            return message.reply("Please provide an emoji to steal!");
        }

        const emojiString = args[0];
        const parsed = parseEmoji(emojiString);

        if (!parsed || !parsed.id) {
            return message.reply("Invalid emoji or default emoji provided.");
        }

        const extension = parsed.animated ? '.gif' : '.png';
        const url = `https://cdn.discordapp.com/emojis/${parsed.id}${extension}`;

        try {
            const emoji = await message.guild.emojis.create({ attachment: url, name: parsed.name });
            message.reply(`✅ Successfully added emoji: ${emoji}`);
        } catch (error) {
            console.error(error);
            message.reply("Failed to add emoji. Maybe I lack permissions or file size is too big.");
        }
    }
};
