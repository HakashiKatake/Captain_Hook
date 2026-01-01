import { AttachmentBuilder } from 'discord.js';
import Jimp from 'jimp';

export default {
    name: 'grayscale',
    aliases: ['bw', 'blackandwhite'],
    description: 'Convert avatar to grayscale',
    usage: '[user]',
    example: '!grayscale @user',
    category: 'image',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const avatarURL = target.displayAvatarURL({ extension: 'png', size: 512 });

        try {
            await message.channel.sendTyping();
            const image = await Jimp.read(avatarURL);
            image.grayscale();

            const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
            const attachment = new AttachmentBuilder(buffer, { name: 'grayscale.png' });

            await message.reply({ files: [attachment], allowedMentions: { repliedUser: false } });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to process image.');
        }
    }
};
