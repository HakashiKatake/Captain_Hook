import { EmbedBuilder } from 'discord.js';
import { getPrefix } from '../../utils/database.js';

export default {
    name: 'help',
    aliases: ['h', 'commands'],
    description: 'List all commands or info about a specific command',
    usage: '[command name]',
    example: '!help mute',
    category: 'help',
    guildOnly: false,

    async execute(message, args, client) {
        const prefix = message.guild ? getPrefix(message.guild.id) : process.env.DEFAULT_PREFIX;

        if (!args.length) {
            // General Help Embed
            const categories = {};

            client.commands.forEach(cmd => {
                const category = cmd.category ? cmd.category.charAt(0).toUpperCase() + cmd.category.slice(1) : 'Misc';
                if (!categories[category]) {
                    categories[category] = [];
                }
                categories[category].push(`\`${cmd.name}\``);
            });

            const embed = new EmbedBuilder()
                .setTitle('🪝 Captain Hook Commands')
                .setDescription(`Use \`${prefix}help <command>\` for details on a specific command.`)
                .setColor('#5865F2')
                .setThumbnail(client.user.displayAvatarURL());

            for (const [category, commands] of Object.entries(categories)) {
                embed.addFields({ name: `📂 ${category}`, value: commands.join(', ') });
            }

            return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        }

        // Specific Command Help
        const name = args[0].toLowerCase();
        const command = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply({ content: '❌ That\'s not a valid command!', allowedMentions: { repliedUser: false } });
        }

        const embed = new EmbedBuilder()
            .setTitle(`Command: ${command.name}`)
            .setDescription(command.description || 'No description provided.')
            .setColor('#5865F2')
            .addFields(
                { name: 'Category', value: command.category || 'Misc', inline: true },
                { name: 'Cooldown', value: `${command.cooldown || 3}s`, inline: true },
                { name: 'Usage', value: `\`${prefix}${command.name} ${command.usage || ''}\``, inline: true },
                { name: 'Aliases', value: command.aliases ? command.aliases.join(', ') : 'None', inline: true }
            );

        if (command.example) {
            embed.addFields({ name: 'Example', value: `\`${command.example}\`` });
        }

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
