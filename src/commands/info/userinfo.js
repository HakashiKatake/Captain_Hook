import { EmbedBuilder } from 'discord.js';

export default {
    name: 'userinfo',
    aliases: ['whois', 'uinfo', 'minfo', 'profile'],
    description: 'Get information about a user',
    usage: '[user]',
    example: '!userinfo @user',
    category: 'info',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const member = await message.guild.members.fetch(target.id);

        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1); // Exclude @everyone

        const embed = new EmbedBuilder()
            .setAuthor({ name: `User Info: ${target.username}`, iconURL: target.displayAvatarURL() })
            .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor(member.displayHexColor || '#5865F2')
            .addFields(
                { name: '🆔 User ID', value: target.id, inline: true },
                { name: '📅 Joined Server', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: '📅 Account Created', value: `<t:${Math.floor(target.createdTimestamp / 1000)}:R>`, inline: true },
                { name: '🎭 Roles', value: roles.length > 0 ? roles.join(', ') : 'None', inline: false }
            )
            .setFooter({ text: `Requested by ${message.author.username}` })
            .setTimestamp();

        if (member.nickname) {
            embed.addFields({ name: '📝 Nickname', value: member.nickname, inline: true });
        }

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
