import { EmbedBuilder } from 'discord.js';

export default {
    name: 'roulette',
    aliases: ['russianroulette', 'rr'],
    description: 'Play Russian Roulette',
    usage: '',
    example: '!roulette',
    category: 'games',
    guildOnly: true,
    cooldown: 10,

    async execute(message, args, client) {
        const numChambers = Math.floor(Math.random() * 5) + 2; // 2-6 chambers
        const bulletPosition = Math.floor(Math.random() * numChambers);

        const embed = new EmbedBuilder()
            .setTitle('🔫 Russian Roulette')
            .setDescription(`The cylinder has **${numChambers}** chambers...\nType \`shoot\` to pull the trigger!`)
            .setColor('#E74C3C');

        await message.channel.send({ embeds: [embed] });

        const filter = m => m.author.id === message.author.id && m.content.toLowerCase() === 'shoot';

        for (let i = 0; i < numChambers; i++) {
            try {
                await message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] });

                if (i === bulletPosition) {
                    return message.channel.send('💥 **BANG!** You\'re dead. 💀');
                } else {
                    await message.channel.send('*Click!* You survived this round... 😅');
                }
            } catch {
                return message.channel.send('⏰ You took too long! Game over.');
            }
        }

        message.channel.send('🎉 You survived all chambers! Lucky you!');
    }
};
