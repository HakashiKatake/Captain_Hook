const letterMap = {
    'a': '🇦', 'b': '🇧', 'c': '🇨', 'd': '🇩', 'e': '🇪', 'f': '🇫', 'g': '🇬', 'h': '🇭', 'i': '🇮',
    'j': '🇯', 'k': '🇰', 'l': '🇱', 'm': '🇲', 'n': '🇳', 'o': '🇴', 'p': '🇵', 'q': '🇶', 'r': '🇷',
    's': '🇸', 't': '🇹', 'u': '🇺', 'v': '🇻', 'w': '🇼', 'x': '🇽', 'y': '🇾', 'z': '🇿',
    '!': '❗', '?': '❓', '#': '#️⃣', '*': '*️⃣', '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣',
    '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣'
};

export default {
    name: 'spellout',
    aliases: ['regional', 'emojify'],
    description: 'Convert text to regional indicator emojis',
    usage: '<text>',
    example: '!spellout hello',
    category: 'utility',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        const text = args.join(' ').toLowerCase();
        if (!text) return message.reply("❌ Please provide text to spell out.");

        let result = '';
        for (const char of text) {
            if (letterMap[char]) {
                result += letterMap[char] + ' ';
            } else if (char === ' ') {
                result += '   ';
            } else {
                result += char;
            }
        }

        message.channel.send(result);
    }
};
