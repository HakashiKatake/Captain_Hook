import { PermissionFlagsBits } from 'discord.js';

export default {
    name: 'setdelay',
    aliases: ['slowmode', 'sm'],
    description: 'Set channel slowmode',
    usage: '<seconds>',
    example: '!setdelay 5',
    category: 'moderation',
    guildOnly: true,
    permissions: ['ManageChannels'],
    cooldown: 5,

    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return message.reply('❌ You need `Manage Channels` permission!');
        }

        const seconds = parseInt(args[0]);
        if (isNaN(seconds) || seconds < 0 || seconds > 21600) {
            return message.reply('❌ Please provide a valid number (0-21600 seconds)!');
        }

        await message.channel.setRateLimitPerUser(seconds);

        if (seconds === 0) {
            message.reply('✅ Slowmode disabled!');
        } else {
            message.reply(`✅ Slowmode set to **${seconds}** seconds!`);
        }
    }
};
