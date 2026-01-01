export default {
    name: 'topic',
    aliases: ['settopic', 'channeltopic'],
    description: 'Change the channel topic',
    usage: '<new topic>',
    example: '!topic This channel is for general chat',
    category: 'utility',
    guildOnly: true,
    permissions: ['ManageChannels'],
    cooldown: 10,

    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageChannels')) {
            return message.reply("❌ You need `Manage Channels` permission to use this command.");
        }

        // Bot permissions check
        if (!message.guild.members.me.permissions.has('ManageChannels')) {
            return message.reply("❌ I need `Manage Channels` permission to change the topic.");
        }

        const newTopic = args.join(' ');
        if (!newTopic) {
            return message.reply("❌ Please provide a new topic.");
        }

        if (newTopic.length > 1024) {
            return message.reply("❌ Topic is too long (max 1024 characters).");
        }

        try {
            await message.channel.setTopic(newTopic);
            message.reply(`✅ Channel topic updated successfully!`);
        } catch (error) {
            console.error(error);
            message.reply("❌ Failed to update topic. Check my permissions or if I'm rate limited.");
        }
    }
};
