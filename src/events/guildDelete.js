export default {
    name: 'guildDelete',
    once: false,

    async execute(guild, client) {
        console.log(`📤 Left guild: ${guild.name} (${guild.id})`);
        console.log(`   Now serving ${client.guilds.cache.size} servers`);
    }
};
