import { EmbedBuilder } from 'discord.js';
import { randomChoice } from '../../utils/helpers.js';

export default {
    name: 'eject',
    aliases: [],
    description: 'Eject someone into space (Among Us style)',
    usage: '<@user>',
    example: '!eject @user',
    category: 'fun',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;

        const impostorStatus = Math.random() < 0.2 ? 'was The Impostor' : 'was not The Impostor';
        const crewmateColors = ['red', 'blue', 'green', 'pink', 'orange', 'yellow', 'black', 'white', 'purple', 'brown', 'cyan', 'lime'];
        const color = randomChoice(crewmateColors);

        const embed = new EmbedBuilder()
            .setTitle(`${target.username} was ejected.`)
            .setDescription(`.**      .      .     .**.      .\n   .      .   .      .\n .    .  ${target.username} ${impostorStatus}.  .   .\n    .    .    .    .\n  .     .     .     .`)
            .setColor('#000000')
            .setThumbnail(`https://vignette.wikia.nocookie.net/among-us-wiki/images/a/a6/${color.charAt(0).toUpperCase() + color.slice(1)}.png/revision/latest?cb=20200912125055`);

        message.channel.send({ embeds: [embed] });
    }
};
