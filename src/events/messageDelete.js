import { setSnipe } from '../utils/database.js';

export default {
    name: 'messageDelete',
    once: false,

    async execute(message, client) {
        // Ignore bot messages and empty messages
        if (message.author?.bot) return;
        if (!message.content && !message.attachments.size) return;
        if (!message.guild) return;

        // Store the deleted message for snipe command
        setSnipe(
            message.channel.id,
            message.author.id,
            message.author.tag,
            message.content || '[Attachment/Embed]'
        );
    }
};
