import { PermissionFlagsBits } from 'discord.js';
import { successEmbed, errorEmbed } from '../../utils/embedBuilder.js';

export default {
    name: 'unlock',
    aliases: [],
    description: 'Unlock a previously locked channel',
    usage: '[#channel]',
    example: '!unlock #general',
    category: 'moderation',
    guildOnly: true,
    permissions: [PermissionFlagsBits.ManageChannels],

    async execute(message, args, client) {
        // Get target channel (mentioned or current)
        const channel = message.mentions.channels.first() || message.channel;

        try {
            // Get the @everyone role
            const everyoneRole = message.guild.roles.everyone;

            // Reset send messages permission (null = inherit from default)
            await channel.permissionOverwrites.edit(everyoneRole, {
                SendMessages: null
            });

            const embed = successEmbed(
                '🔓 Channel Unlocked',
                `${channel} has been unlocked.\nMembers can now send messages again.`
            )
                .addFields({ name: 'Unlocked by', value: message.author.tag, inline: true });

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

            // If we unlocked a different channel, notify that channel too
            if (channel.id !== message.channel.id) {
                channel.send({
                    embeds: [successEmbed('🔓 Channel Unlocked', `This channel has been unlocked by ${message.author.tag}`)]
                }).catch(() => { });
            }

        } catch (error) {
            console.error('Unlock error:', error);
            message.reply({
                embeds: [errorEmbed('Unlock Failed', `Failed to unlock channel: ${error.message}`)],
                allowedMentions: { repliedUser: false }
            });
        }
    }
};
