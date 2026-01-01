import { EmbedBuilder } from 'discord.js';

export default {
    name: 'links',
    aliases: ['vote', 'support'],
    description: 'Get bot links',
    usage: '',
    example: '!links',
    category: 'info',
    guildOnly: false,
    cooldown: 5,

    async execute(message, args, client) {
        const clientId = client.user.id;

        const embed = new EmbedBuilder()
            .setTitle('🔗 Captain Hook Links')
            .setColor('#5865F2')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: '📨 Invite Me', value: `[Click Here](https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands)`, inline: true },
                { name: '🏠 Support Server', value: '[Join](https://discord.gg/MyneuXgVRr)', inline: true },
                { name: '⭐ Vote', value: `[top.gg](https://top.gg/bot/${clientId}/vote)`, inline: true }
            );

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
