import { EmbedBuilder } from 'discord.js';

export default {
    name: 'avatar',
    aliases: ['av', 'pfp'],
    description: 'Get the avatar of a user',
    usage: '[user]',
    example: '!avatar @user',
    category: 'info',
    guildOnly: true,
    cooldown: 5,
    slashOptions: [
        { name: 'user', description: 'User to get avatar for', type: 'user', required: false }
    ],

    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const member = await message.guild.members.fetch(target.id);

        const png = target.displayAvatarURL({ extension: 'png', size: 1024 });
        const jpg = target.displayAvatarURL({ extension: 'jpg', size: 1024 });
        const webp = target.displayAvatarURL({ extension: 'webp', size: 1024 });
        const gif = target.displayAvatarURL({ extension: 'gif', size: 1024 });

        const embed = new EmbedBuilder()
            .setTitle(`Avatar for ${target.username}`)
            .setDescription(`[PNG](${png}) | [JPG](${jpg}) | [WEBP](${webp})` + (target.avatar.startsWith('a_') ? ` | [GIF](${gif})` : ''))
            .setImage(target.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor(member.displayHexColor || '#5865F2')
            .setFooter({ text: `Requested by ${message.author.username}` });

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
