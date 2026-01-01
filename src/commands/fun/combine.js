import { EmbedBuilder } from 'discord.js';

export default {
    name: 'combine',
    aliases: ['lovechild', 'mix'],
    description: 'Combine two names',
    usage: '<name1> <name2>',
    example: '!combine Name1 Name2',
    category: 'fun',
    guildOnly: false,
    cooldown: 5,

    async execute(message, args, client) {
        if (args.length < 2) {
            return message.reply("Please provide two names to combine!");
        }

        const name1 = args[0];
        const name2 = args[1];

        // Simple combination logic: First half of name1 + second half of name2
        const part1 = name1.substring(0, Math.ceil(name1.length / 2));
        const part2 = name2.substring(Math.ceil(name2.length / 2));

        const combined = part1 + part2;

        message.reply(`🧪 **${name1}** + **${name2}** = **${combined}** ✨`);
    }
};
