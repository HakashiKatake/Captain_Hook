import { PermissionFlagsBits } from 'discord.js';
import { successEmbed, errorEmbed } from '../../utils/embedBuilder.js';

export default {
    name: 'boom',
    aliases: ['purge', 'clear', 'prune'],
    description: 'Bulk delete messages from a channel',
    usage: '<amount>',
    example: '!boom 50',
    category: 'moderation',
    guildOnly: true,
    permissions: [PermissionFlagsBits.ManageMessages],

    async execute(message, args, client) {
        // Parse amount
        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount < 1) {
            return message.reply({
                embeds: [errorEmbed('Invalid Amount', 'Please specify a number between 1 and 100.')],
                allowedMentions: { repliedUser: false }
            });
        }

        if (amount > 100) {
            return message.reply({
                embeds: [errorEmbed('Too Many Messages', 'You can only delete up to 100 messages at a time.')],
                allowedMentions: { repliedUser: false }
            });
        }

        try {
            // Delete the command message first
            await message.delete().catch(() => { });

            // Bulk delete messages (can't delete messages older than 14 days)
            const deleted = await message.channel.bulkDelete(amount, true);

            // Send confirmation
            const confirmMsg = await message.channel.send({
                embeds: [successEmbed('Messages Deleted', `💥 Deleted **${deleted.size}** messages!`)]
            });

            // Auto-delete confirmation after 3 seconds
            setTimeout(() => {
                confirmMsg.delete().catch(() => { });
            }, 3000);

        } catch (error) {
            console.error('Boom error:', error);
            message.channel.send({
                embeds: [errorEmbed('Delete Failed', `Failed to delete messages: ${error.message}`)]
            });
        }
    }
};
