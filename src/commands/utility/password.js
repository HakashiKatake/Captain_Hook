import secrets from 'crypto';

export default {
    name: 'password',
    aliases: ['genpass', 'pw'],
    description: 'Generate a random password (sent via DM)',
    usage: '[length]',
    example: '!password 16',
    category: 'utility',
    guildOnly: false,
    cooldown: 10,

    async execute(message, args, client) {
        const length = parseInt(args[0]) || 18;

        if (length < 8 || length > 128) {
            return message.reply('❌ Password length must be between 8 and 128!');
        }

        // Generate random password
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        const randomBytes = secrets.randomBytes(length);
        for (let i = 0; i < length; i++) {
            password += chars[randomBytes[i] % chars.length];
        }

        try {
            await message.author.send(`🔐 **Your generated password (${length} chars):**\n\`${password}\``);
            if (message.guild) {
                message.reply('✅ Password sent to your DMs!');
            }
        } catch {
            message.reply('❌ Could not send DM. Please enable DMs from server members.');
        }
    }
};
