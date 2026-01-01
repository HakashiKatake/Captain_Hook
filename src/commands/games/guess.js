import { EmbedBuilder } from 'discord.js';
import { randomInt } from '../../utils/helpers.js';

export default {
    name: 'guess',
    aliases: ['numguess', 'guessnumber'],
    description: 'Guess a number between 1 and 100',
    usage: '',
    example: '!guess',
    category: 'games',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        const targetNumber = randomInt(1, 100);
        let attempts = 0;
        const maxAttempts = 10;

        const embed = new EmbedBuilder()
            .setTitle('🔢 Number Guessing Game')
            .setDescription(`I'm thinking of a number between **1** and **100**.\nYou have **${maxAttempts}** attempts to guess it!\n\nType a number to guess.`)
            .setColor('#5865F2')
            .setFooter({ text: `${message.author.username}'s game`, iconURL: message.author.displayAvatarURL() });

        await message.channel.send({ embeds: [embed] });

        const filter = (m) => {
            if (m.author.id !== message.author.id) return false;
            const num = parseInt(m.content);
            return !isNaN(num) && num >= 1 && num <= 100;
        };

        const collector = message.channel.createMessageCollector({
            filter,
            time: 60000,
            max: maxAttempts
        });

        collector.on('collect', async (m) => {
            attempts++;
            const guess = parseInt(m.content);

            if (guess === targetNumber) {
                collector.stop('won');

                const winEmbed = new EmbedBuilder()
                    .setTitle('🎉 You Won!')
                    .setDescription(`Congratulations! The number was **${targetNumber}**!\nYou guessed it in **${attempts}** attempt(s)!`)
                    .setColor('#57F287')
                    .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() });

                return m.reply({ embeds: [winEmbed] });
            }

            const attemptsLeft = maxAttempts - attempts;
            const hint = guess < targetNumber ? '📈 Higher!' : '📉 Lower!';

            if (attemptsLeft === 0) {
                collector.stop('lost');
                return;
            }

            const hintEmbed = new EmbedBuilder()
                .setDescription(`${hint}\n\n*${attemptsLeft} attempt(s) remaining*`)
                .setColor('#FEE75C');

            m.reply({ embeds: [hintEmbed] });
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                const timeoutEmbed = new EmbedBuilder()
                    .setTitle('⏰ Time\'s Up!')
                    .setDescription(`You ran out of time! The number was **${targetNumber}**.`)
                    .setColor('#ED4245');

                message.channel.send({ embeds: [timeoutEmbed] });
            } else if (reason === 'lost' || (reason === 'limit' && collected.size === maxAttempts)) {
                const loseEmbed = new EmbedBuilder()
                    .setTitle('💀 Game Over!')
                    .setDescription(`You ran out of attempts! The number was **${targetNumber}**.`)
                    .setColor('#ED4245');

                message.channel.send({ embeds: [loseEmbed] });
            }
        });
    }
};
