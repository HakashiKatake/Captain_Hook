import { EmbedBuilder } from 'discord.js';
import { randomChoice, randomInt } from '../../utils/helpers.js';

const fakeEmails = [
    'badboy@gmail.com:badboi12345',
    'shittygamer@gmail.com:poop1234',
    'idk@gmail.com:idkthepassword',
    'bruhgamer@gmail.com:eeeeeeeeeeee123qwe',
    'coolguy123@hotmail.com:password123',
    'gamerz@yahoo.com:qwerty789'
];

const fakeIps = [
    '134.57.567.45',
    '145.57.25.90',
    '344.54.78.133',
    '192.168.1.256',
    '69.420.13.37'
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
    name: 'hack',
    aliases: ['fakehack'],
    description: 'Pretend to hack someone (just for fun!)',
    usage: '<@user>',
    example: '!hack @user',
    category: 'fun',
    guildOnly: true,
    cooldown: 30,

    async execute(message, args, client) {
        const target = message.mentions.members.first();

        if (!target) {
            return message.reply({
                content: '❌ Please mention someone to "hack"!',
                allowedMentions: { repliedUser: false }
            });
        }

        if (target.user.bot) {
            return message.reply({
                content: "❌ I can't hack a bot! They're too powerful! 🤖",
                allowedMentions: { repliedUser: false }
            });
        }

        const embed = new EmbedBuilder()
            .setTitle('🔓 H A C K I N G')
            .setDescription(`Target: **${target.displayName}**\n\nInitializing hack...`)
            .setColor('#00FF00')
            .setFooter({ text: 'This is just for fun!' });

        const hackMessage = await message.channel.send({ embeds: [embed] });

        const stages = [
            { text: '📡 Connecting to Discord servers...', delay: 1500 },
            { text: '🔍 Finding user data...', delay: 1500 },
            { text: `📧 Email found: \`${randomChoice(fakeEmails)}\``, delay: 2000 },
            { text: `🌐 IP Address: \`${randomChoice(fakeIps)}\``, delay: 2000 },
            { text: `💳 Credit Card: \`**** **** **** ${randomInt(1000, 9999)}\``, delay: 2000 },
            { text: `🔑 Password: \`${generateFakePassword()}\``, delay: 2000 },
            { text: '📤 Uploading virus.exe...', delay: 1500 },
            { text: '💰 Stealing Discord Nitro...', delay: 1500 },
            { text: '✅ Hack complete! (jk, this is all fake)', delay: 1000 }
        ];

        let progress = '';

        for (const stage of stages) {
            progress += stage.text + '\n';

            const updateEmbed = new EmbedBuilder()
                .setTitle('🔓 H A C K I N G')
                .setDescription(`Target: **${target.displayName}**\n\n\`\`\`\n${progress}\`\`\``)
                .setColor('#00FF00')
                .setFooter({ text: 'This is just for fun!' });

            await hackMessage.edit({ embeds: [updateEmbed] });
            await sleep(stage.delay);
        }

        const finalEmbed = new EmbedBuilder()
            .setTitle('🔓 H A C K   C O M P L E T E')
            .setDescription(`Target: **${target.displayName}** has been "hacked"!\n\n*Just kidding! This was all fake.* 😄`)
            .setColor('#00FF00')
            .setThumbnail(target.user.displayAvatarURL())
            .setFooter({ text: 'No actual hacking occurred. This is for entertainment only!' });

        await hackMessage.edit({ embeds: [finalEmbed] });
    }
};

function generateFakePassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let password = '';
    for (let i = 0; i < randomInt(8, 12); i++) {
        password += chars[randomInt(0, chars.length - 1)];
    }
    return password;
}
