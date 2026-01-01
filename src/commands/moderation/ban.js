import { PermissionFlagsBits, EmbedBuilder } from 'discord.js';

export default {
    name: 'ban',
    aliases: ['hammer'],
    description: 'Ban a member',
    usage: '<user> [reason]',
    example: '!ban @user Breaking rules',
    category: 'moderation',
    guildOnly: true,
    permissions: ['BanMembers'],
    cooldown: 5,

    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return message.reply('❌ You need `Ban Members` permission!');
        }

        const target = message.mentions.members.first();
        if (!target) {
            return message.reply('❌ Please mention a user to ban!');
        }

        if (!target.bannable) {
            return message.reply('❌ I cannot ban this user!');
        }

        if (target.id === message.author.id) {
            return message.reply('❌ You cannot ban yourself!');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        // Confirmation
        const confirmMsg = await message.reply(`Are you sure you want to ban **${target.user.tag}**? React ✅ to confirm.`);
        await confirmMsg.react('✅');
        await confirmMsg.react('❌');

        const filter = (reaction, user) =>
            ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;

        try {
            const collected = await confirmMsg.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] });
            const reaction = collected.first();

            if (reaction.emoji.name === '✅') {
                try {
                    await target.send(`You were banned from **${message.guild.name}**. Reason: ${reason}`);
                } catch { }

                await target.ban({ reason });

                const embed = new EmbedBuilder()
                    .setTitle('🔨 Member Banned')
                    .setDescription(`**${target.user.tag}** has been banned by ${message.author}`)
                    .addFields({ name: 'Reason', value: reason })
                    .setColor('#ED4245');

                message.channel.send({ embeds: [embed] });
            } else {
                message.channel.send(`Ban cancelled. **${target.user.tag}** is safe... for now.`);
            }
        } catch {
            message.channel.send('⏰ Confirmation timed out.');
        }
    }
};
