import { EmbedBuilder } from 'discord.js';

export default {
    name: 'reminder',
    aliases: ['remind', 'remindme'],
    description: 'Set a reminder for yourself',
    usage: '<time> <message>',
    example: '!reminder 1h Check the oven',
    category: 'utility',
    guildOnly: false,

    async execute(message, args, client) {
        if (args.length < 2) {
            return message.reply({
                content: '❌ Usage: `!reminder <time> <message>`\nExample: `!reminder 1h Check the oven`',
                allowedMentions: { repliedUser: false }
            });
        }

        const timeStr = args[0];
        const reminderText = args.slice(1).join(' ');

        const duration = parseTime(timeStr);

        if (!duration) {
            return message.reply({
                content: '❌ Invalid time format! Use: `1s`, `1m`, `1h`, `1d`',
                allowedMentions: { repliedUser: false }
            });
        }

        // Max 7 days
        if (duration > 7 * 24 * 60 * 60 * 1000) {
            return message.reply({
                content: '❌ Maximum reminder time is 7 days!',
                allowedMentions: { repliedUser: false }
            });
        }

        const embed = new EmbedBuilder()
            .setTitle('⏰ Reminder Set!')
            .setDescription(`I'll remind you in **${timeStr}**`)
            .addFields({ name: 'Reminder', value: reminderText })
            .setColor('#57F287')
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
            .setTimestamp(Date.now() + duration);

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

        // Set the reminder
        setTimeout(async () => {
            const reminderEmbed = new EmbedBuilder()
                .setTitle('⏰ Reminder!')
                .setDescription(reminderText)
                .setColor('#5865F2')
                .setFooter({ text: `Reminder from ${timeStr} ago` })
                .setTimestamp();

            try {
                // Try to send in the same channel
                await message.channel.send({
                    content: `${message.author}`,
                    embeds: [reminderEmbed]
                });
            } catch {
                // Try to DM the user
                try {
                    await message.author.send({ embeds: [reminderEmbed] });
                } catch {
                    // Can't reach user
                }
            }
        }, duration);
    }
};

function parseTime(timeStr) {
    const units = {
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000
    };

    const match = timeStr.toLowerCase().match(/^(\d+)([smhd])$/);
    if (!match) return null;

    const [, amount, unit] = match;
    return parseInt(amount) * units[unit];
}
