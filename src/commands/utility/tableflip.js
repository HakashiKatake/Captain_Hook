export default {
    name: 'tableflip',
    aliases: ['flip', 'rage'],
    description: 'Flip a table!',
    usage: '',
    example: '!tableflip',
    category: 'utility',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        message.channel.send('(╯°□°）╯︵ ┻━┻');
    }
};
