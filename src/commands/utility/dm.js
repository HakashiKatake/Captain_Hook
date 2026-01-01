export default {
    name: 'dm',
    aliases: ['message', 'senddm'],
    description: 'Send a DM to a user',
    usage: '<@user> <message>',
    example: '!dm @user Hello!',
    category: 'utility',
    guildOnly: true,
    permissions: ['ManageMessages'], // Restrict to mod/admin to prevent abuse
    cooldown: 10,

    async execute(message, args, client) {
        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply("❌ You don't have permission to use this command.");
        }

        const target = message.mentions.users.first();
        if (!target) {
            return message.reply("❌ Please mention a user to DM.");
        }

        const content = args.slice(1).join(' ');
        if (!content) {
            return message.reply("❌ Please provide a message to send.");
        }

        try {
            await target.send(`📩 **Message from ${message.author.username} in ${message.guild.name}:**\n\n${content}`);
            message.reply(`✅ Successfully sent DM to **${target.username}**.`);
        } catch (error) {
            console.error(error);
            message.reply("❌ Failed to send DM. The user might have DMs blocked.");
        }
    }
};
