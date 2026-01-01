/**
 * Utility helper functions ported from converters.py and other Python utilities
 */

// Regex patterns (from converters.py)
export const IMAGE_LINKS = /(https?:\/\/[^"'\s]*\.(?:png|jpg|jpeg|gif|svg)(\?size=[0-9]*)?)/i;
export const MENTION_REGEX = /<@!?([0-9]+)>/g;
export const ID_REGEX = /[0-9]{17,}/g;

/**
 * Find an image from a message (attachments, embeds, mentions, links)
 * @param {Message} message - Discord message
 * @param {string} args - Additional arguments to parse
 * @returns {Promise<string|null>} - Image URL or null
 */
export async function findImage(message, args = '') {
    // Check attachments first
    if (message.attachments.size > 0) {
        const attachment = message.attachments.first();
        if (attachment.contentType?.startsWith('image/')) {
            return attachment.url;
        }
    }

    // Check for image links in args
    const linkMatch = args.match(IMAGE_LINKS);
    if (linkMatch) {
        return linkMatch[1];
    }

    // Check for user mentions
    const mentionMatch = args.match(/<@!?([0-9]+)>/);
    if (mentionMatch) {
        const userId = mentionMatch[1];
        try {
            const user = await message.client.users.fetch(userId);
            return user.displayAvatarURL({ extension: 'png', size: 512 });
        } catch {
            // User not found
        }
    }

    // Check for user IDs
    const idMatch = args.match(/^[0-9]{17,}$/);
    if (idMatch) {
        try {
            const user = await message.client.users.fetch(idMatch[0]);
            return user.displayAvatarURL({ extension: 'png', size: 512 });
        } catch {
            // User not found
        }
    }

    // Check if arg is a username in the guild
    if (message.guild && args.trim()) {
        const member = message.guild.members.cache.find(
            m => m.user.username.toLowerCase() === args.toLowerCase() ||
                m.displayName.toLowerCase() === args.toLowerCase()
        );
        if (member) {
            return member.user.displayAvatarURL({ extension: 'png', size: 512 });
        }
    }

    // Check referenced message
    if (message.reference) {
        try {
            const referenced = await message.fetchReference();
            if (referenced.attachments.size > 0) {
                const attachment = referenced.attachments.first();
                if (attachment.contentType?.startsWith('image/')) {
                    return attachment.url;
                }
            }
        } catch {
            // Referenced message not found
        }
    }

    // Default to author's avatar
    return message.author.displayAvatarURL({ extension: 'png', size: 512 });
}

/**
 * Parse a time duration string to milliseconds
 * @param {string} timeStr - Time string like "1h", "30m", "2d"
 * @returns {number} - Milliseconds
 */
export function parseTime(timeStr) {
    const units = {
        s: 1,
        m: 60,
        h: 60 * 60,
        d: 24 * 60 * 60,
        w: 7 * 24 * 60 * 60
    };

    const match = timeStr.toLowerCase().match(/^(\d+)([smhdw])$/);
    if (!match) return null;

    const [, amount, unit] = match;
    return parseInt(amount) * units[unit];
}

/**
 * Format milliseconds to a human-readable string
 * @param {number} ms - Milliseconds
 * @returns {string}
 */
export function formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

/**
 * Random integer between min and max (inclusive)
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Pick a random element from an array
 * @param {Array} array 
 * @returns {*}
 */
export function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle an array in place
 * @param {Array} array 
 * @returns {Array}
 */
export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Chunk an array into smaller arrays
 * @param {Array} array 
 * @param {number} size 
 * @returns {Array<Array>}
 */
export function chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * Truncate text to a maximum length with ellipsis
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export function truncate(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

/**
 * Convert text to regional indicators (emoji letters)
 * @param {string} text 
 * @returns {string}
 */
export function toRegionalIndicators(text) {
    return text.toLowerCase().split('').map(char => {
        if (char >= 'a' && char <= 'z') {
            return `:regional_indicator_${char}:`;
        }
        if (char === ' ') return '   ';
        return char;
    }).join('');
}

/**
 * Convert text to emojis (like emojify command)
 * @param {string} text 
 * @returns {string}
 */
export function emojify(text) {
    const emojis = {
        'a': '🇦', 'b': '🇧', 'c': '🇨', 'd': '🇩', 'e': '🇪',
        'f': '🇫', 'g': '🇬', 'h': '🇭', 'i': '🇮', 'j': '🇯',
        'k': '🇰', 'l': '🇱', 'm': '🇲', 'n': '🇳', 'o': '🇴',
        'p': '🇵', 'q': '🇶', 'r': '🇷', 's': '🇸', 't': '🇹',
        'u': '🇺', 'v': '🇻', 'w': '🇼', 'x': '🇽', 'y': '🇾',
        'z': '🇿', '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣',
        '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣',
        '9': '9️⃣', '!': '❗', '?': '❓', ' ': '  '
    };

    return text.toLowerCase().split('').map(char => emojis[char] || char).join(' ');
}

export default {
    findImage,
    parseTime,
    formatDuration,
    randomInt,
    randomChoice,
    shuffle,
    chunk,
    truncate,
    toRegionalIndicators,
    emojify,
    IMAGE_LINKS,
    MENTION_REGEX,
    ID_REGEX
};
