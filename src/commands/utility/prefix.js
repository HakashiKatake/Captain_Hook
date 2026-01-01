import { PermissionFlagsBits } from 'discord.js';
import { getPrefix, setPrefix as dbSetPrefix } from '../../utils/database.js';
import { successEmbed, errorEmbed } from '../../utils/embedBuilder.js';

export default {
    name: 'prefix',
    aliases: ['setprefix', 'changeprefix'],
    description: 'View or change the server prefix',
    usage: '[new_prefix]',
    example: '!prefix ?',
    category: 'utility',
    guildOnly: true,

    async execute(message, args, client) {
        const currentPrefix = getPrefix(message.guild.id);

        // If no new prefix provided, show current
        if (!args[0]) {
            const embed = successEmbed(
                'Server Prefix',
                `The current prefix for this server is: \`${currentPrefix}\`\n\nTo change it, use: \`${currentPrefix}prefix <new_prefix>\``
            );
            return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        }

        // Check permissions for changing prefix
        if (!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
            return message.reply({
                embeds: [errorEmbed('Missing Permissions', 'You need the `Manage Server` permission to change the prefix.')],
                allowedMentions: { repliedUser: false }
            });
        }

        const newPrefix = args[0];

        // Validate prefix
        if (newPrefix.length > 5) {
            return message.reply({
                embeds: [errorEmbed('Invalid Prefix', 'Prefix must be 5 characters or less.')],
                allowedMentions: { repliedUser: false }
            });
        }

        // Set new prefix
        dbSetPrefix(message.guild.id, newPrefix);

        const embed = successEmbed(
            'Prefix Updated',
            `Server prefix has been changed to: \`${newPrefix}\`\n\nExample: \`${newPrefix}help\``
        );

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
