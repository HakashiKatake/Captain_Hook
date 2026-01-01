export default {
    name: 'encode',
    aliases: ['base64encode'],
    description: 'Encode text to Base64',
    usage: '<text>',
    example: '!encode Hello World',
    category: 'utility',
    guildOnly: false,
    cooldown: 2,

    async execute(message, args, client) {
        const text = args.join(' ');
        if (!text) return message.reply("❌ Please provide text to encode.");

        const encoded = Buffer.from(text).toString('base64');
        message.reply(`**Encoded:**\n\`${encoded}\``);
    }
};
