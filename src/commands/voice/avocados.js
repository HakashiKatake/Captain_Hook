import { playLocalFile } from '../../utils/voiceHelper.js';

export default {
    name: 'avocados',
    aliases: ['avo'],
    description: 'Play Avocados from Mexico sound',
    usage: '',
    example: '!avocados',
    category: 'voice',
    guildOnly: true,
    cooldown: 10,

    async execute(message, args, client) {
        // 5 seconds duration, with message
        await playLocalFile(message, 'Avocados From Mexico.mp3', 5, 'Avocados from Mexico 🥑');
    }
};
