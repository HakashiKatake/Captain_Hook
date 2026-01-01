import { playLocalFile } from '../../utils/voiceHelper.js';

export default {
    name: 'water',
    aliases: ['h2o'],
    description: 'Play water sound effect',
    usage: '',
    example: '!water',
    category: 'voice',
    guildOnly: true,
    cooldown: 20,

    async execute(message, args, client) {
        // 20 seconds duration, with message
        await playLocalFile(message, 'water.mp3', 20, 'Water, water 💧!');
    }
};
