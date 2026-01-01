export default {
    name: 'say',
    aliases: ['echo'],
    description: 'Make the bot say something',
    usage: '<message>',
    example: '!say Hello World',
    category: 'fun',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        if (!args.length) {
            return message.reply('❌ Please provide a message!');
        }

        // Delete the command message if possible
        try {
            await message.delete();
        } catch { }

        // Remove @everyone and @here to prevent abuse
        const text = args.join(' ')
            .replace(/@everyone/g, '`@everyone`')
            .replace(/@here/g, '`@here`');

        message.channel.send(text);
    }
};
