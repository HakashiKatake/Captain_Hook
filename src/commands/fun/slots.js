import { EmbedBuilder } from 'discord.js';

export default {
    name: 'slots',
    aliases: ['slot'],
    description: 'Play the slot machine',
    usage: '',
    example: '!slots',
    category: 'fun',
    guildOnly: false,
    cooldown: 5,

    async execute(message, args, client) {
        const emojis = ['🍎', '🍊', '🍐', '🍋', '🍉', '🍇', '🍓', '🍒'];
        const a = emojis[Math.floor(Math.random() * emojis.length)];
        const b = emojis[Math.floor(Math.random() * emojis.length)];
        const c = emojis[Math.floor(Math.random() * emojis.length)];

        let result;
        if (a === b && b === c) {
            result = '🎉 All matching, you won!';
        } else if (a === b || b === c || a === c) {
            result = '🎊 2 in a row, you won!';
        } else {
            result = '😢 No match, you lost!';
        }

        const embed = new EmbedBuilder()
            .setTitle('🎰 Slot Machine')
            .setDescription(`**[ ${a} | ${b} | ${c} ]**\n\n${result}`)
            .setColor(a === b && b === c ? '#57F287' : '#ED4245');
        message.channel.send({ embeds: [embed] });
    }
};
