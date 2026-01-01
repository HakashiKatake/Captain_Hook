import { playLocalFile } from '../../utils/voiceHelper.js';

export default {
    name: 'cat',
    aliases: ['meow'],
    description: 'Play cat sound',
    usage: '',
    example: '!cat',
    category: 'voice',
    guildOnly: true,
    cooldown: 5,

    async execute(message, args, client) {
        // 2 seconds duration
        await playLocalFile(message, 'Cat.mp3', 2, 'Meow, Meow 🐱');
    }
};
