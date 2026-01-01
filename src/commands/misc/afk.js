import { EmbedBuilder } from 'discord.js';
import { setAfk, getAfk, removeAfk } from '../../utils/database.js';

export default {
    name: 'afk',
    aliases: ['away'],
    description: 'Set your AFK status',
    usage: '[reason]',
    example: '!afk Going to sleep',
    category: 'misc',
    guildOnly: true,

    async execute(message, args, client) {
        const reason = args.join(' ') || 'No reason provided';
        const member = message.member;

        // Check if already AFK
        const existing = getAfk(message.author.id);
        if (existing) {
            removeAfk(message.author.id);
            return message.reply({
                content: `👋 Welcome back ${message.author}! Your AFK status has been removed.`,
                allowedMentions: { users: [] }
            });
        }

        // Set AFK
        setAfk(message.author.id, reason);

        // Try to add AFK prefix to nickname
        if (member && member.nickname !== null) {
            try {
                if (!member.displayName.startsWith('(AFK)')) {
                    await member.setNickname(`(AFK) ${member.displayName.slice(0, 26)}`);
                }
            } catch {
                // Can't change nickname
            }
        }

        const embed = new EmbedBuilder()
            .setTitle('💤 Member AFK')
            .setDescription(`${message.author} has gone AFK`)
            .addFields({ name: 'AFK Note', value: reason })
            .setColor(member?.displayColor || '#5865F2')
            .setThumbnail(message.author.displayAvatarURL())
            .setFooter({ text: 'I will notify people who mention you!' })
            .setTimestamp();

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
