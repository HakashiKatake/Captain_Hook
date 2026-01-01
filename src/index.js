import 'dotenv/config';
import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js';
import { loadCommands } from './handlers/commandHandler.js';
import { loadEvents } from './handlers/eventHandler.js';

// Create client with all necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
    ],
});

// Initialize collections for commands and aliases
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();

// Load commands and events
async function init() {
    console.log('🚀 Starting Captain Hook...');
    console.log('━'.repeat(40));

    try {
        // Load handlers
        await loadCommands(client);
        await loadEvents(client);

        console.log('━'.repeat(40));

        // Login
        await client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
        console.error('❌ Failed to start bot:', error);
        process.exit(1);
    }
}

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

// Start the bot
init();

export default client;
