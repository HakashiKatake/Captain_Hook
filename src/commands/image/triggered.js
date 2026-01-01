import { AttachmentBuilder } from 'discord.js';
import Jimp from 'jimp';

export default {
    name: 'triggered',
    aliases: ['rage'],
    description: 'Add triggered effect to avatar',
    usage: '[user]',
    example: '!triggered @user',
    category: 'image',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const avatarURL = target.displayAvatarURL({ extension: 'png', size: 256 });

        try {
            await message.channel.sendTyping();

            const avatar = await Jimp.read(avatarURL);
            avatar.resize(256, 256);

            // Apply red tint for "triggered" effect
            avatar.color([
                { apply: 'red', params: [50] },
                { apply: 'saturate', params: [50] }
            ]);

            // Add slight shake effect by creating offset version
            const canvas = new Jimp(256, 290, 0xFF0000FF); // Red background

            // Composite avatar with slight offset for shake effect
            canvas.composite(avatar, 0, 0);

            // Add TRIGGERED bar at bottom
            const triggerBar = new Jimp(256, 34, 0xFF0000FF);
            canvas.composite(triggerBar, 0, 256);

            const buffer = await canvas.getBufferAsync(Jimp.MIME_PNG);
            const attachment = new AttachmentBuilder(buffer, { name: 'triggered.png' });

            await message.reply({
                content: `😤 **TRIGGERED**`,
                files: [attachment],
                allowedMentions: { repliedUser: false }
            });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to create triggered image.');
        }
    }
};
