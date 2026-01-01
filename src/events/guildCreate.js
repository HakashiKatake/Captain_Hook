import { EmbedBuilder } from 'discord.js';

export default {
    name: 'guildCreate',
    once: false,

    async execute(guild, client) {
        console.log(`📥 Joined new guild: ${guild.name} (${guild.id})`);
        console.log(`   Members: ${guild.memberCount}`);
        console.log(`   Now serving ${client.guilds.cache.size} servers`);

        // Try to send a welcome message to the first available text channel
        const channel = guild.systemChannel ||
            guild.channels.cache.find(ch =>
                ch.type === 0 && ch.permissionsFor(guild.members.me)?.has('SendMessages')
            );

        if (channel) {
            const embed = new EmbedBuilder()
                .setTitle('🪝 Thanks for adding Captain Hook!')
                .setDescription(
                    `Hello **${guild.name}**! I'm Captain Hook, your all-in-one Discord bot!\n\n` +
                    `**Getting Started:**\n` +
                    `• Use \`$help\` to see all commands\n` +
                    `• Use \`$prefix <prefix>\` to change the prefix\n` +
                    `• Use \`$invite\` to add me to other servers\n\n` +
                    `Have fun! 🎉`
                )
                .setColor('#5865F2')
                .setThumbnail(client.user.displayAvatarURL())
                .addFields(
                    {
                        name: '📜 Legal',
                        value: '[Terms of Service](https://captain-hook-bot.vercel.app/legal/terms) • [Privacy Policy](https://captain-hook-bot.vercel.app/legal/privacy)',
                        inline: false
                    },
                    {
                        name: '🔗 Links',
                        value: '[Support Server](https://discord.gg/MyneuXgVRr) • [Vote](https://top.gg/bot/916960367018651678/vote)',
                        inline: false
                    }
                )
                .setFooter({ text: `Serving ${client.guilds.cache.size} servers • By using this bot, you agree to our ToS` })
                .setTimestamp();

            try {
                await channel.send({ embeds: [embed] });
            } catch {
                // Can't send message
            }
        }
    }
};
