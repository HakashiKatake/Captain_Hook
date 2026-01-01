import { ActivityType } from 'discord.js';

export default {
    name: 'ready',
    once: true,

    async execute(client) {
        console.log(`✅ Logged in as ${client.user.tag}`);
        console.log(`📊 Serving ${client.guilds.cache.size} servers`);
        console.log(`👥 ${client.users.cache.size} users`);
        console.log('━'.repeat(40));
        console.log('🪝 Captain Hook is ready!');

        // Set bot activity/status
        const activities = [
            { name: `${client.guilds.cache.size} servers`, type: ActivityType.Watching },
            { name: '!help for commands', type: ActivityType.Playing },
            { name: 'your requests', type: ActivityType.Listening },
        ];

        let activityIndex = 0;

        // Rotate status every 30 seconds
        setInterval(() => {
            const activity = activities[activityIndex];
            client.user.setActivity(activity.name, { type: activity.type });
            activityIndex = (activityIndex + 1) % activities.length;
        }, 30000);

        // Set initial activity
        client.user.setActivity(activities[0].name, { type: activities[0].type });
    }
};
