import { playLocalFile } from '../../utils/voiceHelper.js';

export default {
    name: 'jungle',
    aliases: ['nature', 'heli'],
    description: 'Play jungle/nature sounds',
    usage: '',
    example: '!jungle',
    category: 'voice',
    guildOnly: true,
    cooldown: 50,

    async execute(message, args, client) {
        // 48 seconds duration, no pre-message in original
        // Use nature.wav or heli.mp3? Existing cogs/voice.py said ('./sounds/nature.wav', 48, None) for jungle
        await playLocalFile(message, 'nature.wav', 48);
    }
};
