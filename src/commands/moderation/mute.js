import { PermissionFlagsBits } from 'discord.js';
import { parseTime, formatDuration } from '../../utils/helpers.js';
import { successEmbed, errorEmbed } from '../../utils/embedBuilder.js';

export default {
    name: 'mute',
    aliases: ['timeout'],
    description: 'Mute a member for a specified duration',
    usage: '<@user> <duration> [reason]',
    example: '!mute @user 1h Spamming',
    category: 'moderation',
    guildOnly: true,
    permissions: [PermissionFlagsBits.ModerateMembers],

    async execute(message, args, client) {
        // Check for target user
        const target = message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);

        if (!target) {
            return message.reply({
                embeds: [errorEmbed('Missing User', 'Please mention a user to mute.\nUsage: `!mute @user <duration> [reason]`')],
                allowedMentions: { repliedUser: false }
            });
        }

        // Check if target can be moderated
        if (target.id === message.author.id) {
            return message.reply({
                embeds: [errorEmbed('Invalid Target', "You can't mute yourself!")],
                allowedMentions: { repliedUser: false }
            });
        }

        if (target.id === client.user.id) {
            return message.reply({
                embeds: [errorEmbed('Invalid Target', "You can't mute me!")],
                allowedMentions: { repliedUser: false }
            });
        }

        if (!target.moderatable) {
            return message.reply({
                embeds: [errorEmbed('Cannot Mute', "I can't mute this user. They may have higher permissions than me.")],
                allowedMentions: { repliedUser: false }
            });
        }

        // Parse duration
        const durationStr = args[1];
        if (!durationStr) {
            return message.reply({
                embeds: [errorEmbed('Missing Duration', 'Please specify a duration.\nExamples: `1h`, `30m`, `1d`')],
                allowedMentions: { repliedUser: false }
            });
        }

        const duration = parseTime(durationStr);
        if (!duration) {
            return message.reply({
                embeds: [errorEmbed('Invalid Duration', 'Please use a valid format: `1s`, `1m`, `1h`, `1d`, `1w`')],
                allowedMentions: { repliedUser: false }
            });
        }

        // Max timeout is 28 days (Discord limit)
        const maxDuration = 28 * 24 * 60 * 60 * 1000;
        if (duration > maxDuration) {
            return message.reply({
                embeds: [errorEmbed('Duration Too Long', 'Maximum timeout duration is 28 days.')],
                allowedMentions: { repliedUser: false }
            });
        }

        // Get reason
        const reason = args.slice(2).join(' ') || 'No reason provided';

        try {
            await target.timeout(duration, `${reason} | By: ${message.author.tag}`);

            const embed = successEmbed(
                'User Muted',
                `**${target.user.tag}** has been muted for **${formatDuration(duration)}**`
            )
                .addFields(
                    { name: 'Reason', value: reason, inline: true },
                    { name: 'Moderator', value: message.author.tag, inline: true }
                )
                .setThumbnail(target.user.displayAvatarURL());

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

        } catch (error) {
            console.error('Mute error:', error);
            message.reply({
                embeds: [errorEmbed('Mute Failed', `Failed to mute user: ${error.message}`)],
                allowedMentions: { repliedUser: false }
            });
        }
    }
};
