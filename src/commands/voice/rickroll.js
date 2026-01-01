import { playLocalFile } from '../../utils/voiceHelper.js';

export default {
    name: 'rickroll',
    aliases: ['rick', 'nevergonna'],
    description: 'Rickroll the voice channel',
    usage: '',
    example: '!rickroll',
    category: 'voice',
    guildOnly: true,
    cooldown: 20,

    async execute(message, args, client) {
        // 18 seconds duration, with message
        await playLocalFile(message, 'Rick_Astley.mp3', 18, 'Get Rick Rolled! 🕺');
    }
};
