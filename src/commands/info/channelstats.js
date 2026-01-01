import { EmbedBuilder, ChannelType } from 'discord.js';

export default {
    name: 'channelstats',
    aliases: ['cs', 'cinfo'],
    description: 'View statistics for the current or mentioned channel',
    usage: '[#channel]',
    example: '!channelstats #general',
    category: 'info',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const channel = message.mentions.channels.first() || message.channel;

        // Using generic text channel icon as fallback
        let typeName = "Unknown";
        switch (channel.type) {
            case ChannelType.GuildText: typeName = "Text Channel"; break;
            case ChannelType.GuildVoice: typeName = "Voice Channel"; break;
            case ChannelType.GuildCategory: typeName = "Category"; break;
            case ChannelType.GuildNews: typeName = "News Channel"; break;
            case ChannelType.GuildForum: typeName = "Forum"; break;
            // Add others as needed
            default: typeName = `Type ID: ${channel.type}`;
        }

        const embed = new EmbedBuilder()
            .setTitle(`📑 Channel Stats: ${channel.name}`)
            .setColor('#3498db')
            .addFields(
                { name: '🆔 ID', value: channel.id, inline: true },
                { name: '🏷️ Type', value: typeName, inline: true },
                { name: '📅 Created', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:R>`, inline: true }
            );

        if (channel.topic) {
            embed.setDescription(`**Topic:** ${channel.topic}`);
        }

        if (channel.type === ChannelType.GuildVoice) {
            embed.addFields(
                { name: '👥 Bitrate', value: `${channel.bitrate / 1000}kbps`, inline: true },
                { name: '🧢 User Limit', value: channel.userLimit === 0 ? 'Unlimited' : `${channel.userLimit}`, inline: true }
            );
        }

        if (channel.nsfw) {
            embed.addFields({ name: '🔞 NSFW', value: 'Yes', inline: true });
        }

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
