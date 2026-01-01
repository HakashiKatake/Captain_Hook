import { AttachmentBuilder } from 'discord.js';
import Jimp from 'jimp';

export default {
    name: 'trash',
    aliases: ['garbage'],
    description: 'Put user in the trash',
    usage: '[user]',
    example: '!trash @user',
    category: 'image',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const avatarURL = target.displayAvatarURL({ extension: 'png', size: 128 });

        try {
            await message.channel.sendTyping();

            const avatar = await Jimp.read(avatarURL);
            avatar.resize(80, 80);

            // Create trash can
            const trashCan = new Jimp(200, 250, 0x00000000); // transparent

            // Trash can body (gray)
            const body = new Jimp(120, 150, 0x606060FF);
            trashCan.composite(body, 40, 80);

            // Trash can lid (darker gray)
            const lid = new Jimp(140, 20, 0x404040FF);
            trashCan.composite(lid, 30, 60);

            // Handle on lid
            const handle = new Jimp(40, 15, 0x505050FF);
            trashCan.composite(handle, 80, 45);

            // Add avatar sticking out of trash
            trashCan.composite(avatar, 60, 70);

            const buffer = await trashCan.getBufferAsync(Jimp.MIME_PNG);
            const attachment = new AttachmentBuilder(buffer, { name: 'trash.png' });

            await message.reply({
                content: `🗑️ **${target.username}** belongs in the trash!`,
                files: [attachment],
                allowedMentions: { repliedUser: false }
            });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to create trash image.');
        }
    }
};
