import { EmbedBuilder } from 'discord.js';
import { randomChoice, randomInt } from '../../utils/helpers.js';

const roasts = [
    "You're the reason the gene pool needs a lifeguard.",
    "I'd agree with you but then we'd both be wrong.",
    "You're not stupid; you just have bad luck thinking.",
    "If laughter is the best medicine, your face must be curing the world.",
    "You're the human version of a participation award.",
    "I'm not saying I hate you, but I would unplug your life support to charge my phone.",
    "You bring everyone so much joy when you leave.",
    "Light travels faster than sound, which is why you seemed bright until you spoke.",
    "You're like a cloud. When you disappear, it's a beautiful day.",
    "I'd explain it to you but I left my crayons at home.",
    "Your secrets are always safe with me. I never even listen when you tell me them.",
    "You're not completely useless, you can always serve as a bad example.",
    "I'm jealous of people who don't know you.",
    "You're proof that evolution can go in reverse.",
    "If you were any more inbred you'd be a sandwich."
];

export default {
    name: 'roast',
    aliases: ['insult'],
    description: 'Roast someone (friendly banter)',
    usage: '<@user>',
    example: '!roast @user',
    category: 'fun',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const target = message.mentions.members.first();

        if (!target) {
            return message.reply({
                content: '❌ Please mention someone to roast!',
                allowedMentions: { repliedUser: false }
            });
        }

        const roast = randomChoice(roasts);

        const embed = new EmbedBuilder()
            .setTitle('🔥 Roasted!')
            .setDescription(`${target}, ${roast}`)
            .setColor('#FF6B6B')
            .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};
