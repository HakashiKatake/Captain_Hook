import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load all events from the events directory
 * @param {Client} client - Discord.js client
 */
export async function loadEvents(client) {
    const eventsPath = join(__dirname, '../events');
    const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    let loadedCount = 0;

    for (const file of eventFiles) {
        const filePath = join(eventsPath, file);

        try {
            const event = await import(`file://${filePath}`);

            if (!event.default || !event.default.name) {
                console.warn(`⚠️  Skipping event ${file} - missing name property`);
                continue;
            }

            if (event.default.once) {
                client.once(event.default.name, (...args) => event.default.execute(...args, client));
            } else {
                client.on(event.default.name, (...args) => event.default.execute(...args, client));
            }

            loadedCount++;
        } catch (err) {
            console.error(`❌ Error loading event ${file}:`, err.message);
        }
    }

    console.log(`✅ Loaded ${loadedCount} events`);
}

export default { loadEvents };
