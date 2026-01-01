import { AttachmentBuilder } from 'discord.js';
import Jimp from 'jimp';

export default {
    name: 'rip',
    aliases: ['grave', 'tombstone'],
    description: 'Create a RIP tombstone with user avatar',
    usage: '[user]',
    example: '!rip @user',
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
            avatar.grayscale();

            // Create tombstone
            const tombstone = new Jimp(200, 280, 0x696969FF); // gray

            // Round top of tombstone
            const topPart = new Jimp(200, 50, 0x696969FF);

            // Add grass at bottom
            const grass = new Jimp(200, 40, 0x228B22FF); // green
            tombstone.composite(grass, 0, 240);

            // Add avatar to tombstone
            tombstone.composite(avatar, 60, 60);

            // Add darker band for "RIP" area
            const ripBand = new Jimp(160, 25, 0x505050FF);
            tombstone.composite(ripBand, 20, 20);

            // Add darker band for name area
            const nameBand = new Jimp(160, 40, 0x505050FF);
            tombstone.composite(nameBand, 20, 160);

            const buffer = await tombstone.getBufferAsync(Jimp.MIME_PNG);
            const attachment = new AttachmentBuilder(buffer, { name: 'rip.png' });

            await message.reply({
                content: `🪦 **R.I.P** ${target.username}`,
                files: [attachment],
                allowedMentions: { repliedUser: false }
            });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to create RIP image.');
        }
    }
};
