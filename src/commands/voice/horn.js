import { playLocalFile } from '../../utils/voiceHelper.js';

export default {
    name: 'horn',
    aliases: ['airhorn'],
    description: 'Play loud air horn sound',
    usage: '',
    example: '!horn',
    category: 'voice',
    guildOnly: true,
    cooldown: 10,

    async execute(message, args, client) {
        // 5 seconds duration
        await playLocalFile(message, 'air-horn.mp3', 5, 'Did your ears survive? 📢');
    }
};
