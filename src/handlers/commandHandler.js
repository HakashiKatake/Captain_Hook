import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Recursively load all commands from the commands directory
 * @param {Client} client - Discord.js client
 */
export async function loadCommands(client) {
    const commandsPath = join(__dirname, '../commands');
    const commandFolders = readdirSync(commandsPath);

    let loadedCount = 0;

    for (const folder of commandFolders) {
        const folderPath = join(commandsPath, folder);

        // Skip if not a directory
        try {
            const files = readdirSync(folderPath);

            for (const file of files) {
                if (!file.endsWith('.js')) continue;

                const filePath = join(folderPath, file);

                try {
                    const command = await import(`file://${filePath}`);

                    if (!command.default || !command.default.name) {
                        console.warn(`⚠️  Skipping ${file} - missing name property`);
                        continue;
                    }

                    // Add category from folder name
                    command.default.category = folder;

                    // Register main command name
                    client.commands.set(command.default.name, command.default);

                    // Register aliases
                    if (command.default.aliases && Array.isArray(command.default.aliases)) {
                        for (const alias of command.default.aliases) {
                            client.aliases.set(alias, command.default.name);
                        }
                    }

                    loadedCount++;
                } catch (err) {
                    console.error(`❌ Error loading command ${file}:`, err.message);
                }
            }
        } catch {
            // Not a directory, skip
            continue;
        }
    }

    console.log(`✅ Loaded ${loadedCount} commands`);
}

/**
 * Find a command by name or alias
 * @param {Client} client - Discord.js client
 * @param {string} commandName - Command name or alias
 * @returns {object|null} - Command object or null
 */
export function getCommand(client, commandName) {
    const name = commandName.toLowerCase();

    // Check direct command name
    if (client.commands.has(name)) {
        return client.commands.get(name);
    }

    // Check aliases
    if (client.aliases.has(name)) {
        return client.commands.get(client.aliases.get(name));
    }

    return null;
}

export default { loadCommands, getCommand };
