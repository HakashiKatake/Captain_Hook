import { getAccount, updateWallet } from '../../utils/economy.js';

export default {
    name: 'beg',
    aliases: [],
    description: 'Beg for coins',
    usage: '',
    example: '$beg',
    category: 'economy',
    guildOnly: true,
    cooldown: 30,

    async execute(message, args, client) {
        getAccount(message.author.id);

        // 20% chance of failure
        if (Math.random() < 0.2) {
            const fails = [
                'You begged but got ignored 😢',
                'Someone threw a shoe at you instead 🥿',
                'The cops showed up and you ran away 🚔',
                'A pigeon stole your change 🐦'
            ];
            return message.reply(fails[Math.floor(Math.random() * fails.length)]);
        }

        const amount = Math.floor(Math.random() * 301) + 100; // 100-400
        updateWallet(message.author.id, amount);

        const outcomes = [
            `A kind stranger gave you **${amount}** 🪙`,
            `You found **${amount}** 🪙 on the ground!`,
            `Someone felt bad and gave you **${amount}** 🪙`,
            `Batman threw **${amount}** 🪙 at you`,
            `Elon Musk donated **${amount}** 🪙`
        ];

        message.reply(outcomes[Math.floor(Math.random() * outcomes.length)]);
    }
};
