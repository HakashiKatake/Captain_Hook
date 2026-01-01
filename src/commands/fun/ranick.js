export default {
    name: 'ranick',
    aliases: ['randomnick', 'rollnick'],
    description: 'Change your nickname to a random string',
    usage: '',
    example: '!ranick',
    category: 'fun',
    guildOnly: true,
    permissions: ['ChangeNickname'],
    cooldown: 10,

    async execute(message, args, client) {
        // Check bot permissions
        if (!message.guild.members.me.permissions.has('ManageNicknames')) {
            return message.reply("❌ I need `Manage Nicknames` permission to change nicknames.");
        }

        // Self permission check? Usually users can change their own nick if 'Change Nickname' is on, 
        // but bot needs 'Manage Nicknames' to change others. 
        // Logic: User asks bot to change USER's nick. Bot needs Manage Nicknames.
        // Unless user is owner/higher role than bot.

        if (message.author.id === message.guild.ownerId) {
            return message.reply("❌ I cannot change the server owner's nickname.");
        }

        if (message.member.roles.highest.position >= message.guild.members.me.roles.highest.position) {
            return message.reply("❌ I cannot change your nickname because your role is higher or equal to mine.");
        }

        const randomName = Math.random().toString(36).substring(2, 10);

        try {
            await message.member.setNickname(randomName);
            message.reply(`✅ Your nickname has been changed to **${randomName}**`);
        } catch (error) {
            console.error(error);
            message.reply("❌ Failed to change nickname.");
        }
    }
};
