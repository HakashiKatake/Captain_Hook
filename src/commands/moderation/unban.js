import { PermissionFlagsBits } from 'discord.js';
import { successEmbed, errorEmbed } from '../../utils/embedBuilder.js';

export default {
    name: 'unban',
    aliases: [],
    description: 'Unban a user from the server',
    usage: '<user_id> [reason]',
    example: '!unban 123456789012345678 Appeal accepted',
    category: 'moderation',
    guildOnly: true,
    permissions: [PermissionFlagsBits.BanMembers],

    async execute(message, args, client) {
        // Get user ID
        const userId = args[0]?.replace(/[<@!>]/g, '');

        if (!userId || !/^\d{17,19}$/.test(userId)) {
            return message.reply({
                embeds: [errorEmbed('Invalid User', 'Please provide a valid user ID.\nUsage: `!unban <user_id> [reason]`')],
                allowedMentions: { repliedUser: false }
            });
        }

        // Get reason
        const reason = args.slice(1).join(' ') || 'No reason provided';

        try {
            // Check if user is actually banned
            const bans = await message.guild.bans.fetch();
            const bannedUser = bans.get(userId);

            if (!bannedUser) {
                return message.reply({
                    embeds: [errorEmbed('Not Banned', 'This user is not banned from this server.')],
                    allowedMentions: { repliedUser: false }
                });
            }

            // Unban the user
            await message.guild.members.unban(userId, `${reason} | By: ${message.author.tag}`);

            const embed = successEmbed(
                'User Unbanned',
                `**${bannedUser.user.tag}** has been unbanned from the server.`
            )
                .addFields(
                    { name: 'Reason', value: reason, inline: true },
                    { name: 'Moderator', value: message.author.tag, inline: true }
                )
                .setThumbnail(bannedUser.user.displayAvatarURL());

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

        } catch (error) {
            console.error('Unban error:', error);
            message.reply({
                embeds: [errorEmbed('Unban Failed', `Failed to unban user: ${error.message}`)],
                allowedMentions: { repliedUser: false }
            });
        }
    }
};
