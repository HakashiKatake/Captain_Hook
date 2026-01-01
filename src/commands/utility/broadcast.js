export default {
    name: 'broadcast',
    aliases: ['bc', 'announce', 'shout'],
    description: 'Broadcast a message to all servers (Owner Only)',
    usage: '<message>',
    example: '!broadcast Hello everyone!',
    category: 'utility',
    guildOnly: false,
    ownerOnly: true, // Custom check needed in code usually, or handled here

    async execute(message, args, client) {
        // Owner check
        if (message.author.id !== process.env.BOT_OWNER_ID) {
            return message.reply("❌ This command is restricted to the bot owner.");
        }

        const content = args.join(' ');
        if (!content) {
            return message.reply("❌ Please provide a message to broadcast.");
        }

        await message.reply("📢 Starting broadcast...");

        let sentCount = 0;
        let guildCount = 0;

        for (const [guildId, guild] of client.guilds.cache) {
            guildCount++;
            // Find a suitable channel: first text channel named 'general', 'chat', or just the first viewable text channel
            let channel = guild.channels.cache.find(c =>
                c.type === 0 && // TextChannel
                c.permissionsFor(guild.members.me).has('SendMessages') &&
                (c.name.includes('general') || c.name.includes('chat') || c.name.includes('announcements'))
            );

            // Fallback to ANY text channel we can send in
            if (!channel) {
                channel = guild.channels.cache.find(c =>
                    c.type === 0 &&
                    c.permissionsFor(guild.members.me).has('SendMessages')
                );
            }

            if (channel) {
                try {
                    await channel.send(`📢 **Broadcast:**\n${content}`);
                    sentCount++;
                } catch (err) {
                    console.error(`Failed to send to guild ${guild.name}:`, err);
                }
            }
        }

        message.author.send(`✅ Broadcast complete. Sent to ${sentCount}/${guildCount} servers.`);
    }
};
