import { EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

const actionEndpoints = {
    slap: { url: 'https://api.waifu.pics/sfw/slap', action: 'slapped' },
    hug: { url: 'https://api.waifu.pics/sfw/hug', action: 'hugged' },
    cuddle: { url: 'https://api.waifu.pics/sfw/cuddle', action: 'cuddled' },
    pat: { url: 'https://api.waifu.pics/sfw/pat', action: 'patted' },
    kiss: { url: 'https://api.waifu.pics/sfw/kiss', action: 'kissed' },
    bonk: { url: 'https://api.waifu.pics/sfw/bonk', action: 'bonked' },
    highfive: { url: 'https://api.waifu.pics/sfw/highfive', action: 'high-fived' },
    wink: { url: 'https://api.waifu.pics/sfw/wink', action: 'winked at', noTarget: true },
    blush: { url: 'https://api.waifu.pics/sfw/blush', action: 'blushed', noTarget: true },
    smug: { url: 'https://api.waifu.pics/sfw/smug', action: 'is smug', noTarget: true }
};

async function createActionCommand(name, config) {
    return {
        name,
        aliases: [],
        description: config.noTarget ? `${name} reaction` : `${name.charAt(0).toUpperCase() + name.slice(1)} someone`,
        usage: config.noTarget ? '' : '<user>',
        example: config.noTarget ? `!${name}` : `!${name} @user`,
        category: 'action',
        guildOnly: true,
        cooldown: 3,

        async execute(message, args, client) {
            const target = message.mentions.users.first();

            if (!config.noTarget && !target) {
                return message.reply(`❌ Please mention someone to ${name}!`);
            }

            try {
                const response = await fetch(config.url);
                const data = await response.json();

                const title = config.noTarget
                    ? `${message.author.username} ${config.action}!`
                    : `${message.author.username} ${config.action} ${target.username}!`;

                const embed = new EmbedBuilder()
                    .setTitle(title)
                    .setImage(data.url)
                    .setColor('#E016D7');

                message.channel.send({ embeds: [embed] });
            } catch (error) {
                console.error(error);
                message.reply('❌ Failed to fetch GIF.');
            }
        }
    };
}

// Export individual commands
export const slap = await createActionCommand('slap', actionEndpoints.slap);
export const hug = await createActionCommand('hug', actionEndpoints.hug);
export const cuddle = await createActionCommand('cuddle', actionEndpoints.cuddle);
export const pat = await createActionCommand('pat', actionEndpoints.pat);
export const kiss = await createActionCommand('kiss', actionEndpoints.kiss);
export const bonk = await createActionCommand('bonk', actionEndpoints.bonk);
export const highfive = await createActionCommand('highfive', actionEndpoints.highfive);
export const wink = await createActionCommand('wink', actionEndpoints.wink);
export const blush = await createActionCommand('blush', actionEndpoints.blush);
export const smug = await createActionCommand('smug', actionEndpoints.smug);

export default slap;
