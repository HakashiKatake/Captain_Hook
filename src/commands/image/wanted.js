import { AttachmentBuilder } from 'discord.js';
import Jimp from 'jimp';

export default {
    name: 'wanted',
    aliases: [],
    description: 'Create a wanted poster with user avatar',
    usage: '[user]',
    example: '!wanted @user',
    category: 'image',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const avatarURL = target.displayAvatarURL({ extension: 'png', size: 256 });

        try {
            await message.channel.sendTyping();

            // Create wanted poster
            const avatar = await Jimp.read(avatarURL);
            avatar.resize(200, 200);

            // Create brown wanted poster background
            const poster = new Jimp(300, 400, 0xD2691EFF);

            // Add WANTED text at top (simulated with color bar)
            const topBar = new Jimp(280, 40, 0x8B4513FF);
            poster.composite(topBar, 10, 10);

            // Add avatar in center
            poster.composite(avatar, 50, 80);

            // Add DEAD OR ALIVE bar at bottom
            const bottomBar = new Jimp(280, 40, 0x8B4513FF);
            poster.composite(bottomBar, 10, 300);

            // Add reward bar
            const rewardBar = new Jimp(280, 30, 0x8B4513FF);
            poster.composite(rewardBar, 10, 350);

            const buffer = await poster.getBufferAsync(Jimp.MIME_PNG);
            const attachment = new AttachmentBuilder(buffer, { name: 'wanted.png' });

            await message.reply({
                content: `🤠 **WANTED:** ${target.username}`,
                files: [attachment],
                allowedMentions: { repliedUser: false }
            });
        } catch (error) {
            console.error(error);
            message.reply('❌ Failed to create wanted poster.');
        }
    }
};
