export default {
    name: 'reverse',
    aliases: ['reversed'],
    description: 'Reverse text',
    usage: '<text>',
    example: '!reverse Hello',
    category: 'fun',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        if (!args.length) {
            return message.reply('❌ Please provide text to reverse!');
        }

        const text = args.join(' ');
        const reversed = text.split('').reverse().join('')
            .replace(/@/g, '@\u200B'); // Prevent mentions

        message.channel.send(`🔁 ${reversed}`);
    }
};
