import { PermissionFlagsBits } from 'discord.js';
import { successEmbed, errorEmbed } from '../../utils/embedBuilder.js';

export default {
    name: 'lock',
    aliases: ['lockdown'],
    description: 'Lock a channel to prevent members from sending messages',
    usage: '[#channel]',
    example: '!lock #general',
    category: 'moderation',
    guildOnly: true,
    permissions: [PermissionFlagsBits.ManageChannels],

    async execute(message, args, client) {
        // Get target channel (mentioned or current)
        const channel = message.mentions.channels.first() || message.channel;

        try {
            // Get the @everyone role
            const everyoneRole = message.guild.roles.everyone;

            // Deny send messages permission
            await channel.permissionOverwrites.edit(everyoneRole, {
                SendMessages: false
            });

            const embed = successEmbed(
                '🔒 Channel Locked',
                `${channel} has been locked.\nMembers can no longer send messages.`
            )
                .addFields({ name: 'Locked by', value: message.author.tag, inline: true });

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

            // If we locked a different channel, notify that channel too
            if (channel.id !== message.channel.id) {
                channel.send({
                    embeds: [successEmbed('🔒 Channel Locked', `This channel has been locked by ${message.author.tag}`)]
                }).catch(() => { });
            }

        } catch (error) {
            console.error('Lock error:', error);
            message.reply({
                embeds: [errorEmbed('Lock Failed', `Failed to lock channel: ${error.message}`)],
                allowedMentions: { repliedUser: false }
            });
        }
    }
};
