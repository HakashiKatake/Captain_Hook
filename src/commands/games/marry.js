import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
    name: 'marry',
    aliases: ['propose', 'marriage'],
    description: 'Propose to another user',
    usage: '<@user>',
    example: '!marry @user',
    category: 'games',
    guildOnly: true,
    cooldown: 30,

    async execute(message, args, client) {
        const proposer = message.author;
        const partner = message.mentions.users.first();

        if (!partner) {
            return message.reply({ content: '❌ Please mention the person you want to marry!', allowedMentions: { repliedUser: false } });
        }

        if (partner.id === proposer.id) {
            return message.reply({ content: "❌ You can't marry yourself!", allowedMentions: { repliedUser: false } });
        }

        if (partner.bot) {
            return message.reply({ content: "❌ You can't marry a bot!", allowedMentions: { repliedUser: false } });
        }

        // Step 1: Confirm with proposer (The original code asks the proposer "You will accept...". 
        // Usually a proposal is from proposer to partner, but we'll stick to the flow or improve it.
        // Let's improve it: Ask partner if they accept.

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('marry_yes').setLabel('Yes! 💍').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('marry_no').setLabel('No 💔').setStyle(ButtonStyle.Danger)
        );

        const embed = new EmbedBuilder()
            .setTitle('💍 Marriage Proposal')
            .setDescription(`${partner}, **${proposer.username}** has proposed to you!\n\nDo you accept them as your wedded partner?`)
            .setColor('#E91E63')
            .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/ring_1f48d.png');

        const msg = await message.channel.send({ content: `${partner}`, embeds: [embed], components: [row] });

        try {
            const confirmation = await msg.awaitMessageComponent({
                filter: i => i.user.id === partner.id,
                time: 60000
            });

            if (confirmation.customId === 'marry_no') {
                const rejectEmbed = new EmbedBuilder()
                    .setTitle('💔 Proposal Rejected')
                    .setDescription(`**${partner.username}** has rejected the proposal.\nSorry **${proposer.username}**...`)
                    .setColor('#000000');

                await confirmation.update({ embeds: [rejectEmbed], components: [] });
                return;
            }

            // Step 2: Accepted
            const acceptEmbed = new EmbedBuilder()
                .setTitle('💍 Proposal Accepted!')
                .setDescription(`**${partner.username}** said YES! 🎉\n\nOne last step... Does anyone object?`)
                .setColor('#E91E63');

            const objectRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('object').setLabel('I Object! ✋').setStyle(ButtonStyle.Danger)
            );

            await confirmation.update({ embeds: [acceptEmbed], components: [objectRow] });

            // Step 3: Objections
            try {
                const objection = await msg.awaitMessageComponent({
                    time: 15000 // 15 seconds for objections
                });

                const objectEmbed = new EmbedBuilder()
                    .setTitle('✋ Objection!')
                    .setDescription(`**${objection.user.username}** objects to this marriage! \n\n"I can't let this happen!"`)
                    .setColor('#FF0000');

                await objection.update({ embeds: [objectEmbed], components: [] });

            } catch (e) {
                // No objections
                const finalEmbed = new EmbedBuilder()
                    .setTitle('💒 Just Married!')
                    .setDescription(`🎉 Congratulations **${proposer.username}** and **${partner.username}**!\n\nYou are now happily married! 💑`)
                    .setColor('#FF69B4')
                    .setImage('https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif');

                await msg.edit({ embeds: [finalEmbed], components: [] });
            }

        } catch (e) {
            // Time out
            const timeoutEmbed = new EmbedBuilder()
                .setDescription(`❌ The proposal timed out. **${partner.username}** left you hanging...`)
                .setColor('#000000');

            await msg.edit({ embeds: [timeoutEmbed], components: [] });
        }
    }
};
