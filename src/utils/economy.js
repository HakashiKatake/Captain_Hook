import { EmbedBuilder } from 'discord.js';
import db from '../../utils/database.js';

// Initialize economy table
try {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS economy (
            user_id TEXT PRIMARY KEY,
            wallet INTEGER DEFAULT 500,
            bank INTEGER DEFAULT 0,
            last_daily INTEGER DEFAULT 0,
            last_work INTEGER DEFAULT 0
        )
    `).run();
} catch { }

export function getAccount(userId) {
    let account = db.prepare('SELECT * FROM economy WHERE user_id = ?').get(userId);
    if (!account) {
        db.prepare('INSERT INTO economy (user_id, wallet, bank) VALUES (?, 500, 0)').run(userId);
        account = { user_id: userId, wallet: 500, bank: 0, last_daily: 0, last_work: 0 };
    }
    return account;
}

export function updateWallet(userId, amount) {
    getAccount(userId); // Ensure account exists
    db.prepare('UPDATE economy SET wallet = wallet + ? WHERE user_id = ?').run(amount, userId);
}

export function updateBank(userId, amount) {
    getAccount(userId);
    db.prepare('UPDATE economy SET bank = bank + ? WHERE user_id = ?').run(amount, userId);
}

export function setLastDaily(userId, timestamp) {
    db.prepare('UPDATE economy SET last_daily = ? WHERE user_id = ?').run(timestamp, userId);
}

export function getTopUsers(limit = 10) {
    return db.prepare('SELECT user_id, wallet + bank as total FROM economy ORDER BY total DESC LIMIT ?').all(limit);
}
