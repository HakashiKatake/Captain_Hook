import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Build slash command data from a command object
 */
function buildSlashCommand(command) {
    const builder = new SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description || 'No description');

    // Add options based on command usage hints
    if (command.slashOptions) {
        for (const option of command.slashOptions) {
            switch (option.type) {
                case 'user':
                    builder.addUserOption(opt =>
                        opt.setName(option.name)
                            .setDescription(option.description)
                            .setRequired(option.required ?? false));
                    break;
                case 'string':
                    builder.addStringOption(opt =>
                        opt.setName(option.name)
                            .setDescription(option.description)
                            .setRequired(option.required ?? false));
                    break;
                case 'integer':
                    builder.addIntegerOption(opt =>
                        opt.setName(option.name)
                            .setDescription(option.description)
                            .setRequired(option.required ?? false));
                    break;
                case 'boolean':
                    builder.addBooleanOption(opt =>
                        opt.setName(option.name)
                            .setDescription(option.description)
                            .setRequired(option.required ?? false));
                    break;
                case 'channel':
                    builder.addChannelOption(opt =>
                        opt.setName(option.name)
                            .setDescription(option.description)
                            .setRequired(option.required ?? false));
                    break;
            }
        }
    }

    return builder;
}

/**
 * Load all commands and convert to slash command format
 */
async function loadSlashCommands() {
    const commands = [];
    const registeredNames = new Set(); // Track to avoid duplicates
    const commandsPath = join(__dirname, '../commands');
    const commandFolders = readdirSync(commandsPath);

    // Commands to skip (games with complex state, duplicates, voice commands, etc.)
    // Discord limit: 100 slash commands
    const skipCommands = [
        // Game commands with complex state
        'tictactoe', 'place', 'end', 'hangman', 'hguess', 'hend', 'rend',
        // Voice commands (require voice state)
        'play', 'stop', 'leave', 'party', 'fbi', 'rickroll', 'airhorn', 'bruh',
        'oof', 'mario', 'emotional', 'nani', 'yeet', 'moan', 'gamer', 'windows',
        'joinvc', 'leavevc',
        // Duplicate/alias-type commands
        'ball', 'eightball', 'magic8ball', 'av', 'pfp', 'hammer',
        // Owner-only commands
        'broadcast', 'eval', 'reload',
        // Complex interactive commands
        'riddle', 'trivia', 'quiz', 'wpm', 'roulette',
        // Economy commands (keep main ones, skip exported named commands)
        'beg', 'work', 'dep', 'with', 'deposit', 'withdraw', 'gamble',
        // Less common commands
        'ranping', 'findimposter', 'sus', 'randomsus', 'imgen', 'imgdec',
        // Image commands (keep popular ones, skip variants)
        'bw', 'blackandwhite', 'negative', 'round', 'vintage', 'old', 'pixel',
        'bright', 'prison', 'arrested', 'grave', 'tombstone', 'rage', 'garbage',
        // Action commands (all from actions.js)
        'slap', 'hug', 'cuddle', 'pat', 'kiss', 'bonk', 'highfive', 'wink', 'blush', 'smug',
        'actions',
        // Misc skips
        'spellout', 'combine', 'hack', 'ranick', 'coc_stats',
        // More to reduce count
        'ip', 'topic', 'password', 'timer', 'poll', 'setdelay',
        'links', 'banner', 'owner', 'members', 'uptime',
        'fight', 'f', 'reverse', 'say', 'hotcalc', 'slots', 'roll', 'coinflip', 'dadjoke'
    ];

    for (const folder of commandFolders) {
        const folderPath = join(commandsPath, folder);

        try {
            const files = readdirSync(folderPath);

            for (const file of files) {
                if (!file.endsWith('.js')) continue;

                const filePath = join(folderPath, file);

                try {
                    const command = await import(`file://${filePath}`);

                    if (!command.default || !command.default.name) continue;
                    if (skipCommands.includes(command.default.name)) continue;

                    // Skip if already registered (handles duplicates)
                    if (registeredNames.has(command.default.name)) continue;
                    registeredNames.add(command.default.name);

                    // Build slash command
                    const slashCmd = buildSlashCommand(command.default);
                    commands.push(slashCmd.toJSON());

                } catch (err) {
                    console.error(`Error loading ${file}:`, err.message);
                }
            }
        } catch {
            continue;
        }
    }

    return commands;
}

/**
 * Register slash commands with Discord
 */
async function registerCommands() {
    console.log('🔄 Loading slash commands...');

    const commands = await loadSlashCommands();
    console.log(`📦 Found ${commands.length} commands to register`);

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        console.log('🚀 Registering slash commands globally...');

        // Register globally (takes up to 1 hour to propagate)
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID || '916960367018651678'),
            { body: commands }
        );

        console.log(`✅ Successfully registered ${data.length} slash commands!`);
        console.log('\n⚠️  Note: Global commands may take up to 1 hour to appear.');
        console.log('   For instant testing, use guild-specific commands.');

    } catch (error) {
        console.error('❌ Error registering commands:', error);
    }
}

// Run registration
registerCommands();
