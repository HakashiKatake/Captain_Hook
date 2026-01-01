import { EmbedBuilder } from 'discord.js';

export default {
    name: 'ship',
    aliases: ['love', 'compatibility'],
    description: 'Calculate the love percentage between two people',
    usage: '<name1> <name2>',
    example: '!ship John Jane',
    category: 'fun',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        let name1, name2;

        // Handle mentions or text names
        if (message.mentions.users.size >= 2) {
            const users = [...message.mentions.users.values()];
            name1 = users[0].username;
            name2 = users[1].username;
        } else if (message.mentions.users.size === 1) {
            name1 = message.mentions.users.first().username;
            name2 = args.filter(a => !a.startsWith('<@')).join(' ') || message.author.username;
        } else if (args.length >= 2) {
            name1 = args[0];
            name2 = args.slice(1).join(' ');
        } else {
            return message.reply({
                content: '❌ Please provide two names! Example: `!ship John Jane` or `!ship @user1 @user2`',
                allowedMentions: { repliedUser: false }
            });
        }

        // Generate a consistent percentage based on the names
        const combined = (name1.toLowerCase() + name2.toLowerCase()).split('').sort().join('');
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            hash = ((hash << 5) - hash) + combined.charCodeAt(i);
            hash = hash & hash; // Convert to 32-bit integer
        }
        const percentage = Math.abs(hash % 101);

        // Create ship name
        const shipName = name1.slice(0, Math.ceil(name1.length / 2)) +
            name2.slice(Math.floor(name2.length / 2));

        // Get response based on percentage
        let response, color;
        if (percentage >= 90) {
            response = '💕 Perfect match! You two are meant to be together!';
            color = '#FF69B4';
        } else if (percentage >= 70) {
            response = '💗 Great compatibility! There is definitely something there!';
            color = '#FF1493';
        } else if (percentage >= 50) {
            response = '💛 Not bad! There is potential here.';
            color = '#FFD700';
        } else if (percentage >= 30) {
            response = '💔 Hmm... it might take some work.';
            color = '#FFA500';
        } else {
            response = '💀 Just friends... or enemies?';
            color = '#808080';
        }

        // Create progress bar
        const filled = Math.round(percentage / 10);
        const empty = 10 - filled;
        const progressBar = '❤️'.repeat(filled) + '🖤'.repeat(empty);

        const embed = new EmbedBuilder()
            .setTitle('💕 Love Calculator')
            .setDescription(`**${name1}** 💕 **${name2}**`)
            .addFields(
                { name: 'Compatibility', value: `${progressBar} **${percentage}%**` },
                { name: 'Ship Name', value: `✨ ${shipName}` },
                { name: 'Verdict', value: response }
            )
            .setColor(color)
            .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
