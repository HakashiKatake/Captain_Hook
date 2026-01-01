import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize database
const db = new Database(join(__dirname, '../../data.sqlite'));

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS prefixes (
    guild_id TEXT PRIMARY KEY,
    prefix TEXT NOT NULL DEFAULT '!'
  );

  CREATE TABLE IF NOT EXISTS afk (
    user_id TEXT PRIMARY KEY,
    reason TEXT,
    timestamp INTEGER
  );

  CREATE TABLE IF NOT EXISTS snipe (
    channel_id TEXT PRIMARY KEY,
    author_id TEXT,
    author_name TEXT,
    content TEXT,
    timestamp INTEGER
  );
`);

// Prepared statements for better performance
const statements = {
    getPrefix: db.prepare('SELECT prefix FROM prefixes WHERE guild_id = ?'),
    setPrefix: db.prepare('INSERT OR REPLACE INTO prefixes (guild_id, prefix) VALUES (?, ?)'),

    getAfk: db.prepare('SELECT * FROM afk WHERE user_id = ?'),
    setAfk: db.prepare('INSERT OR REPLACE INTO afk (user_id, reason, timestamp) VALUES (?, ?, ?)'),
    removeAfk: db.prepare('DELETE FROM afk WHERE user_id = ?'),
    getAllAfk: db.prepare('SELECT * FROM afk'),

    setSnipe: db.prepare('INSERT OR REPLACE INTO snipe (channel_id, author_id, author_name, content, timestamp) VALUES (?, ?, ?, ?, ?)'),
    getSnipe: db.prepare('SELECT * FROM snipe WHERE channel_id = ?'),
};

/**
 * Get the prefix for a guild
 * @param {string} guildId 
 * @returns {string}
 */
export function getPrefix(guildId) {
    const row = statements.getPrefix.get(guildId);
    return row ? row.prefix : process.env.DEFAULT_PREFIX || '!';
}

/**
 * Set the prefix for a guild
 * @param {string} guildId 
 * @param {string} prefix 
 */
export function setPrefix(guildId, prefix) {
    statements.setPrefix.run(guildId, prefix);
}

/**
 * Get AFK status for a user
 * @param {string} userId 
 * @returns {object|null}
 */
export function getAfk(userId) {
    return statements.getAfk.get(userId) || null;
}

/**
 * Set AFK status for a user
 * @param {string} userId 
 * @param {string} reason 
 */
export function setAfk(userId, reason) {
    statements.setAfk.run(userId, reason, Date.now());
}

/**
 * Remove AFK status for a user
 * @param {string} userId 
 */
export function removeAfk(userId) {
    statements.removeAfk.run(userId);
}

/**
 * Get all AFK users
 * @returns {Array}
 */
export function getAllAfk() {
    return statements.getAllAfk.all();
}

/**
 * Store a sniped message
 * @param {string} channelId 
 * @param {string} authorId 
 * @param {string} authorName 
 * @param {string} content 
 */
export function setSnipe(channelId, authorId, authorName, content) {
    statements.setSnipe.run(channelId, authorId, authorName, content, Date.now());
}

/**
 * Get sniped message for a channel
 * @param {string} channelId 
 * @returns {object|null}
 */
export function getSnipe(channelId) {
    return statements.getSnipe.get(channelId) || null;
}

export default db;
