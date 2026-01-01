export default {
    name: 'f',
    aliases: ['payrespects', 'respect'],
    description: 'Pay respects',
    usage: '[thing]',
    example: '!f fallen soldier',
    category: 'fun',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        const hearts = ['❤️', '💛', '💚', '💙', '💜'];
        const heart = hearts[Math.floor(Math.random() * hearts.length)];
        const reason = args.length ? `for **${args.join(' ')}** ` : '';

        message.channel.send(`**${message.author.username}** has paid their respects ${reason}${heart}`);
    }
};
