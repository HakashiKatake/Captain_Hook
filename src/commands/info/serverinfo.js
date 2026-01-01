import { EmbedBuilder } from 'discord.js';

export default {
    name: 'serverinfo',
    aliases: ['serveri', 'si', 'guildinfo', 'gi'],
    description: 'View detailed information about the server',
    usage: '',
    example: '!serverinfo',
    category: 'info',
    guildOnly: true,

    async execute(message, args, client) {
        const guild = message.guild;

        // Get member counts
        const members = guild.members.cache;
        const humans = members.filter(m => !m.bot).size;
        const bots = members.filter(m => m.bot).size;

        // Get online statuses
        const online = members.filter(m => m.presence?.status === 'online').size;
        const idle = members.filter(m => m.presence?.status === 'idle').size;
        const dnd = members.filter(m => m.presence?.status === 'dnd').size;
        const offline = members.filter(m => !m.presence || m.presence.status === 'offline').size;

        // Get channel counts
        const textChannels = guild.channels.cache.filter(c => c.type === 0).size;
        const voiceChannels = guild.channels.cache.filter(c => c.type === 2).size;
        const categories = guild.channels.cache.filter(c => c.type === 4).size;

        // Get ban count (if we have permission)
        let banCount = 'No permission';
        try {
            const bans = await guild.bans.fetch();
            banCount = bans.size;
        } catch {
            // No permission
        }

        // Get invite count (if we have permission)
        let inviteCount = 'No permission';
        try {
            const invites = await guild.invites.fetch();
            inviteCount = invites.size;
        } catch {
            // No permission
        }

        const embed = new EmbedBuilder()
            .setTitle('Server Information')
            .setColor(guild.members.me?.displayColor || '#5865F2')
            .setThumbnail(guild.iconURL({ size: 512 }))
            .setTimestamp()
            .addFields(
                { name: 'Name', value: guild.name, inline: true },
                { name: 'ID', value: guild.id, inline: true },
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Created At', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true },
                { name: 'Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Humans / Bots', value: `${humans} / ${bots}`, inline: true },
                { name: 'Statuses', value: `🟢 ${online} 🟠 ${idle} 🔴 ${dnd} ⚪ ${offline}`, inline: false },
                { name: 'Text Channels', value: `${textChannels}`, inline: true },
                { name: 'Voice Channels', value: `${voiceChannels}`, inline: true },
                { name: 'Categories', value: `${categories}`, inline: true },
                { name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
                { name: 'Emojis', value: `${guild.emojis.cache.size}`, inline: true },
                { name: 'Boost Level', value: `Level ${guild.premiumTier}`, inline: true },
                { name: 'Banned Members', value: `${banCount}`, inline: true },
                { name: 'Invites', value: `${inviteCount}`, inline: true }
            );

        if (guild.description) {
            embed.setDescription(guild.description);
        }

        if (guild.bannerURL()) {
            embed.setImage(guild.bannerURL({ size: 512 }));
        }

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
