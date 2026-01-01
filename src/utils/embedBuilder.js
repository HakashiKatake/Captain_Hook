import { EmbedBuilder } from 'discord.js';
import config from '../config.json' with { type: 'json' };

/**
 * Create a success embed
 * @param {string} title 
 * @param {string} description 
 * @returns {EmbedBuilder}
 */
export function successEmbed(title, description) {
    return new EmbedBuilder()
        .setColor(config.colors.success)
        .setTitle(`${config.emojis.success} ${title}`)
        .setDescription(description)
        .setTimestamp();
}

/**
 * Create an error embed
 * @param {string} title 
 * @param {string} description 
 * @returns {EmbedBuilder}
 */
export function errorEmbed(title, description) {
    return new EmbedBuilder()
        .setColor(config.colors.danger)
        .setTitle(`${config.emojis.error} ${title}`)
        .setDescription(description)
        .setTimestamp();
}

/**
 * Create an info embed
 * @param {string} title 
 * @param {string} description 
 * @returns {EmbedBuilder}
 */
export function infoEmbed(title, description) {
    return new EmbedBuilder()
        .setColor(config.colors.primary)
        .setTitle(title)
        .setDescription(description)
        .setTimestamp();
}

/**
 * Create a warning embed
 * @param {string} title 
 * @param {string} description 
 * @returns {EmbedBuilder}
 */
export function warningEmbed(title, description) {
    return new EmbedBuilder()
        .setColor(config.colors.warning)
        .setTitle(`${config.emojis.warning} ${title}`)
        .setDescription(description)
        .setTimestamp();
}

/**
 * Create a custom embed with flexible options
 * @param {object} options 
 * @returns {EmbedBuilder}
 */
export function customEmbed(options = {}) {
    const embed = new EmbedBuilder();

    if (options.color) embed.setColor(options.color);
    if (options.title) embed.setTitle(options.title);
    if (options.description) embed.setDescription(options.description);
    if (options.thumbnail) embed.setThumbnail(options.thumbnail);
    if (options.image) embed.setImage(options.image);
    if (options.url) embed.setURL(options.url);
    if (options.timestamp !== false) embed.setTimestamp();

    if (options.author) {
        embed.setAuthor({
            name: options.author.name,
            iconURL: options.author.iconURL,
            url: options.author.url
        });
    }

    if (options.footer) {
        embed.setFooter({
            text: options.footer.text,
            iconURL: options.footer.iconURL
        });
    }

    if (options.fields && Array.isArray(options.fields)) {
        embed.addFields(options.fields);
    }

    return embed;
}

export default {
    successEmbed,
    errorEmbed,
    infoEmbed,
    warningEmbed,
    customEmbed
};
