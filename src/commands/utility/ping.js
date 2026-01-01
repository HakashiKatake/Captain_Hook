import { EmbedBuilder } from 'discord.js';

export default {
    name: 'ping',
    aliases: ['latency', 'pong'],
    description: 'Check the bot\'s latency',
    usage: '',
    example: '!ping',
    category: 'utility',
    guildOnly: false,
    cooldown: 5,

    async execute(message, args, client) {
        const sent = await message.reply({ content: '🏓 Pinging...', allowedMentions: { repliedUser: false } });

        const latency = sent.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(client.ws.ping);

        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🏓 Pong!')
            .addFields(
                { name: 'Bot Latency', value: `${latency}ms`, inline: true },
                { name: 'API Latency', value: `${apiLatency}ms`, inline: true }
            );

        sent.edit({ content: null, embeds: [embed] });
    }
};
