import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export default {
    name: 'ip',
    aliases: ['iplookup', 'whoisip'],
    description: 'Get information about an IP address',
    usage: '<ip>',
    example: '!ip 8.8.8.8',
    category: 'utility',
    guildOnly: false,
    cooldown: 5,

    async execute(message, args, client) {
        if (args.length === 0) {
            return message.reply("❌ Please provide an IP address.");
        }

        const ip = args[0];
        // Using ip-api.com (free, no key, rate limited 45/min)
        // Previous used extreme-ip-lookup with key. ip-api is a good fallback.

        try {
            const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
            const data = await response.json();

            if (data.status !== 'success') {
                return message.reply(`❌ Error: ${data.message || 'Invalid IP'}`);
            }

            const embed = new EmbedBuilder()
                .setTitle(`IP Lookup: ${data.query}`)
                .setColor('#3498db')
                .addFields(
                    { name: 'Country', value: `${data.country} (${data.countryCode})`, inline: true },
                    { name: 'Region', value: data.regionName, inline: true },
                    { name: 'City', value: data.city, inline: true },
                    { name: 'ISP', value: data.isp, inline: true },
                    { name: 'Org', value: data.org || 'N/A', inline: true },
                    { name: 'Timezone', value: data.timezone, inline: true },
                    { name: 'Lat/Lon', value: `${data.lat}, ${data.lon}`, inline: true }
                )
                .setFooter({ text: 'Powered by ip-api.com' });

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

        } catch (error) {
            console.error(error);
            message.reply("❌ Failed to lookup IP info.");
        }
    }
};
