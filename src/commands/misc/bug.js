import { EmbedBuilder } from 'discord.js';

export default {
    name: 'bug',
    aliases: ['report', 'suggest'],
    description: 'Report a bug or suggest a feature',
    usage: '<message>',
    example: '!bug This command is broken',
    category: 'misc',
    guildOnly: false,
    cooldown: 60,

    async execute(message, args, client) {
        const content = args.join(' ');
        if (!content) {
            return message.reply("❌ Please provide a description of the bug or suggestion.");
        }

        const reportEmbed = new EmbedBuilder()
            .setTitle('📢 New Report / Suggestion')
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setDescription(content)
            .addFields(
                { name: 'User ID', value: message.author.id, inline: true },
                { name: 'Guild', value: message.guild ? `${message.guild.name} (${message.guild.id})` : 'DM', inline: true }
            )
            .setColor('#E67E22')
            .setTimestamp();

        // Log to console for now
        console.log('--- NEW BUG REPORT ---');
        console.log(`From: ${message.author.tag} (${message.author.id})`);
        console.log(`Content: ${content}`);
        console.log('----------------------');

        // Try to DM owner if configured
        const ownerId = process.env.BOT_OWNER_ID;
        if (ownerId) {
            try {
                const owner = await client.users.fetch(ownerId);
                if (owner) await owner.send({ embeds: [reportEmbed] });
            } catch (e) {
                console.error('Could not DM owner:', e);
            }
        }

        message.reply("✅ Thank you! Your report has been sent to the developer.");
    }
};
