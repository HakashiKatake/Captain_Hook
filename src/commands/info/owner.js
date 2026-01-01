import { EmbedBuilder } from 'discord.js';

export default {
    name: 'owner',
    aliases: ['serverowner'],
    description: 'Show server owner',
    usage: '',
    example: '!owner',
    category: 'info',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const owner = await message.guild.fetchOwner();

        const embed = new EmbedBuilder()
            .setTitle('👑 Server Owner')
            .setDescription(`The king of **${message.guild.name}** is **${owner.user.tag}**`)
            .setColor('#FFD700')
            .setThumbnail(owner.user.displayAvatarURL());

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
