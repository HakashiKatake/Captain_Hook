import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { parseTime } from '../../utils/helpers.js';

export default {
    name: 'timer',
    aliases: ['countdown'],
    description: 'Set a timer',
    usage: '<duration>',
    example: '!timer 5m',
    category: 'utility',
    guildOnly: false,
    cooldown: 10,

    async execute(message, args, client) {
        if (!args.length) {
            return message.reply('❌ Please provide a duration (e.g., 5m, 1h, 30s)');
        }

        const seconds = parseTime(args[0]);
        if (!seconds || seconds <= 0) {
            return message.reply('❌ Invalid duration! Use format like: 5m, 1h, 30s');
        }

        if (seconds > 86400) {
            return message.reply('❌ Maximum timer duration is 24 hours!');
        }

        const endTime = Date.now() + (seconds * 1000);

        const embed = new EmbedBuilder()
            .setTitle('⏱️ Timer Set')
            .setDescription(`Timer for **${args[0]}** started!`)
            .setColor('#3498db');

        await message.reply({ embeds: [embed] });

        setTimeout(() => {
            message.channel.send(`⏰ ${message.author}, your timer for **${args[0]}** has ended!`);
        }, seconds * 1000);
    }
};
