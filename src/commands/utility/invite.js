import { EmbedBuilder } from 'discord.js';

export default {
    name: 'invite',
    aliases: ['inv', 'add'],
    description: 'Get the bot invite link',
    usage: '',
    example: '!invite',
    category: 'utility',
    guildOnly: false,

    async execute(message, args, client) {
        const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`;

        const embed = new EmbedBuilder()
            .setTitle('🪝 Invite Captain Hook')
            .setDescription(`[**Click here to add me to your server!**](${inviteLink})`)
            .addFields(
                {
                    name: '🔗 Other Links',
                    value: '[Support Server](https://discord.gg/MyneuXgVRr)\n[Bot Website](http://captain-hook.website2.me/)'
                }
            )
            .setColor('#5865F2')
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: 'Thank you for using Captain Hook!' })
            .setTimestamp();

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
