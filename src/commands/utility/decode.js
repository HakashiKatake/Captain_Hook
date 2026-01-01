export default {
    name: 'decode',
    aliases: ['base64decode'],
    description: 'Decode Base64 text',
    usage: '<base64_string>',
    example: '!decode SGVsbG8gV29ybGQ=',
    category: 'utility',
    guildOnly: false,
    cooldown: 2,

    async execute(message, args, client) {
        const text = args.join(' ');
        if (!text) return message.reply("❌ Please provide text to decode.");

        const decoded = Buffer.from(text, 'base64').toString('ascii');
        message.reply(`**Decoded:**\n\`${decoded}\``);
    }
};
