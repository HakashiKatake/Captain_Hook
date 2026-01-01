import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    name: 'poll',
    aliases: [],
    description: 'Create a simple yes/no poll',
    usage: '<question>',
    example: '!poll Should we have movie night?',
    category: 'utility',
    guildOnly: true,
    permissions: ['ManageMessages'],
    cooldown: 10,

    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return message.reply('❌ You need `Manage Messages` permission!');
        }

        if (!args.length) {
            return message.reply('❌ Please provide a question!');
        }

        const question = args.join(' ');

        const embed = new EmbedBuilder()
            .setTitle('📊 Poll')
            .setDescription(question)
            .setColor('#5865F2')
            .setFooter({ text: `Poll by ${message.author.username}`, iconURL: message.author.displayAvatarURL() });

        const pollMsg = await message.channel.send({ embeds: [embed] });
        await pollMsg.react('👍');
        await pollMsg.react('👎');
    }
};
