import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { randomChoice, randomInt } from '../../utils/helpers.js';

export default {
    name: 'findimposter',
    aliases: ['poker', 'amongus', 'fi'],
    description: 'Find the imposter before the reactor melts down!',
    usage: '',
    example: '!findimposter',
    category: 'games',
    guildOnly: true,
    cooldown: 10,

    async execute(message, args, client) {
        const participants = {
            Red: ["I didn't do anything, I was in reactor", "I was in electric"],
            Blue: ["I was in main hallway", "Sorry I was checking my mom's text, what happened?"],
            Lime: ["I was checking cams, don't vote me :(", "Vote Red"],
            White: ["I have sus on Lime", "It wasn't me, don't vote me"]
        };

        // Select imposter randomly
        const colors = Object.keys(participants);
        const imposter = randomChoice(colors);

        // Create embed fields with statements
        const fields = colors.map(color => ({
            name: color,
            value: `${getCrewmateEmoji(color)} ${color} says: "${randomChoice(participants[color])}"`,
            inline: false
        }));

        const embed = new EmbedBuilder()
            .setTitle("🔪 Who's the Imposter?")
            .setDescription("Find out who the imposter is before the reactor breaks down!\n\n**Vote by clicking a button below!**")
            .addFields(fields)
            .setColor('#FF0000')
            .setThumbnail('https://i.imgur.com/h5jqG4D.png'); // Generic Among Us image

        // Create buttons
        const row = new ActionRowBuilder().addComponents(
            colors.map(color =>
                new ButtonBuilder()
                    .setCustomId(`vote_${color}`)
                    .setLabel(color)
                    .setStyle(getButtonStyle(color))
                    .setEmoji(getCrewmateEmoji(color))
            )
        );

        const gameMsg = await message.channel.send({ embeds: [embed], components: [row] });

        // Create collector
        const collector = gameMsg.createMessageComponentCollector({
            filter: i => i.user.id === message.author.id,
            time: 30000,
            max: 1
        });

        collector.on('collect', async (interaction) => {
            const votedColor = interaction.customId.split('_')[1];
            const won = votedColor === imposter;

            const resultEmbed = new EmbedBuilder()
                .setTitle(won ? '🏆 Victory!' : '💀 Defeat')
                .setDescription(won
                    ? `**${imposter}** was the Imposter! You saved the ship!`
                    : `**${imposter}** was the Imposter...\n\nReason: Reactor Meltdown. **${votedColor}** was not the Imposter.`)
                .setColor(won ? '#57F287' : '#ED4245')
                .setImage(won
                    ? 'https://media.giphy.com/media/uNx0YANtET46k/giphy.gif' // Victory gif
                    : 'https://media.giphy.com/media/VbQfgkDtHZRM5Zrktb/giphy.gif'); // Defeat gif

            await interaction.update({ embeds: [resultEmbed], components: [] });
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                const timeoutEmbed = new EmbedBuilder()
                    .setTitle('💀 Defeat')
                    .setDescription(`Time ran out! Reactor Meltdown.\n**${imposter}** was the Imposter.`)
                    .setColor('#ED4245');

                gameMsg.edit({ embeds: [timeoutEmbed], components: [] }).catch(() => { });
            }
        });
    }
};

function getCrewmateEmoji(color) {
    // Using standard emojis as fallbacks if custom ones aren't available
    // The original code used custom emojis which we might not have access to
    // We'll use color squares for now
    switch (color) {
        case 'Red': return '🟥';
        case 'Blue': return '🟦';
        case 'Lime': return '🟩';
        case 'White': return '⬜';
        default: return '❓';
    }
}

function getButtonStyle(color) {
    switch (color) {
        case 'Red': return ButtonStyle.Danger;
        case 'Blue': return ButtonStyle.Primary;
        case 'Lime': return ButtonStyle.Success;
        case 'White': return ButtonStyle.Secondary;
        default: return ButtonStyle.Secondary;
    }
}
