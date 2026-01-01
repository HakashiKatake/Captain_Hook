import { AttachmentBuilder } from 'discord.js';
import Jimp from 'jimp';

export default {
    name: 'jail',
    aliases: ['prison', 'arrested'],
    description: 'Put user behind bars',
    usage: '[user]',
    example: '!jail @user',
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

            // Create jail bars overlay
            const bars = new Jimp(256, 256, 0x00000000); // transparent
            const barColor = 0x333333FF;
            const barWidth = 8;
            const gap = 32;

            // Draw vertical bars
            for (let x = 0; x < 256; x += gap) {
                for (let y = 0; y < 256; y++) {
                    for (let w = 0; w < barWidth; w++) {
                        if (x + w < 256) {
                            bars.setPixelColor(barColor, x + w, y);
                        }
                    }
                }
            }

            // Composite bars over avatar
            avatar.composite(bars, 0, 0);

            const buffer = await avatar.getBufferAsync(Jimp.MIME_PNG);
            const attachment = new AttachmentBuilder(buffer, { name: 'jail.png' });

            await message.reply({
                content: `🔒 **${target.username}** has been jailed!`,
                files: [attachment],
                allowedMentions: { repliedUser: false }
            });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to create jail image.');
        }
    }
};
