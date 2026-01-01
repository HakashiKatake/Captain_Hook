export default {
    name: 'coc_stats',
    aliases: ['coc', 'clash'],
    description: 'Get Clash of Clans player stats',
    usage: '<player_tag>',
    example: '!coc_stats #28A318F7',
    category: 'games',
    guildOnly: false,
    cooldown: 5,

    async execute(message, args, client) {
        if (args.length === 0) {
            return message.reply("❌ Please provide a player tag (e.g. #28A318F7).");
        }

        const playerTag = args[0];

        // Note: This command requires a valid Clash of Clans API token.
        // The original bot used a hardcoded JWT which is likely expired or invalid.
        // To enable this, you need to sign up at https://developer.clashofclans.com/
        // and add your token to .env as CLASH_API_TOKEN.

        const apiToken = process.env.CLASH_API_TOKEN;

        if (!apiToken) {
            return message.reply({
                content: "⚠️ **API Token Missing**: This command requires a Clash of Clans API token to function.\nPlease add `CLASH_API_TOKEN` to your `.env` file from https://developer.clashofclans.com/",
                allowedMentions: { repliedUser: false }
            });
        }

        // Placeholder implementation if token existed
        try {
            const fetch = (await import('node-fetch')).default;
            const url = `https://api.clashofclans.com/v1/players/${encodeURIComponent(playerTag)}`;
            const response = await fetch(url, {
                headers: {
                    "Accept": "application/json",
                    "authorization": `Bearer ${apiToken}`
                }
            });

            if (!response.ok) {
                return message.reply(`❌ API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            // Basic embed if successful
            const { EmbedBuilder } = await import('discord.js');
            const embed = new EmbedBuilder()
                .setTitle(`Clash of Clans Stats: ${data.name}`)
                .setColor('#FFF200')
                .addFields(
                    { name: 'Town Hall', value: `${data.townHallLevel}`, inline: true },
                    { name: 'Trophies', value: `${data.trophies}`, inline: true },
                    { name: 'Clan', value: data.clan ? data.clan.name : 'No Clan', inline: true }
                );

            message.reply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            message.reply("❌ Failed to fetch CoC stats.");
        }
    }
};
