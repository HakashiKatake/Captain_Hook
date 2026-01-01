import { EmbedBuilder } from 'discord.js';

const fightResults = [
    "and it was super effective!",
    "but %target% dodged it!",
    "and %target% got obliterated!",
    "but %attacker% missed!",
    "but they killed each other!",
    "and it wiped out everything within a five mile radius!",
    "but in a turn of events, they made up and became friends!",
    "and it worked!",
    "and %target% never saw it coming.",
    "but %target% grabbed the attack and used it against %attacker%!",
    "but it only scratched %target%!",
    "and %target% was defeated!",
    "but %attacker% activated %target%'s trap card!"
];

export default {
    name: 'fight',
    aliases: ['attack'],
    description: 'Fight someone with something',
    usage: '<user> <weapon>',
    example: '!fight @user sword',
    category: 'fun',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const target = message.mentions.users.first();

        if (!target) {
            return message.reply('❌ Please mention someone to fight!');
        }

        if (target.id === message.author.id) {
            return message.reply(`${message.author.username} fought themselves but only ended up in a mental hospital! 🏥`);
        }

        const weapon = args.slice(1).join(' ');
        if (!weapon) {
            return message.reply(`${message.author.username} tried to fight ${target.username} with nothing, so ${target.username} beat them up! 💪`);
        }

        const result = fightResults[Math.floor(Math.random() * fightResults.length)]
            .replace(/%target%/g, target.username)
            .replace(/%attacker%/g, message.author.username);

        const embed = new EmbedBuilder()
            .setTitle('⚔️ Fight!')
            .setDescription(`**${message.author.username}** used **${weapon}** on **${target.username}** ${result}`)
            .setColor('#E74C3C');

        message.channel.send({ embeds: [embed] });
    }
};
