import { getCommand } from '../handlers/commandHandler.js';
import { EmbedBuilder } from 'discord.js';

export default {
    name: 'interactionCreate',
    once: false,

    async execute(interaction, client) {
        // Handle slash commands
        if (interaction.isChatInputCommand()) {
            const command = getCommand(client, interaction.commandName);

            if (!command) {
                return interaction.reply({
                    content: '❌ Command not found!',
                    ephemeral: true
                });
            }

            // Check if guild-only command used in DMs
            if (command.guildOnly && !interaction.guild) {
                return interaction.reply({
                    content: '❌ This command can only be used in a server!',
                    ephemeral: true
                });
            }

            // Check cooldowns
            if (command.cooldown) {
                const cooldownKey = `${interaction.user.id}-${command.name}`;
                const now = Date.now();
                const cooldownAmount = (command.cooldown || 3) * 1000;

                if (client.cooldowns.has(cooldownKey)) {
                    const expirationTime = client.cooldowns.get(cooldownKey) + cooldownAmount;
                    if (now < expirationTime) {
                        const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
                        return interaction.reply({
                            content: `⏳ Please wait ${timeLeft}s before using \`/${command.name}\` again.`,
                            ephemeral: true
                        });
                    }
                }
                client.cooldowns.set(cooldownKey, now);
            }

            try {
                // Create a fake message object for compatibility with existing commands
                const fakeMessage = createFakeMessage(interaction);

                // Get args from slash command options
                const args = extractArgs(interaction);

                // Execute command
                if (command.executeSlash) {
                    // Use dedicated slash handler if available
                    await command.executeSlash(interaction, args, client);
                } else if (command.execute) {
                    // Defer reply for longer commands
                    await interaction.deferReply();

                    // Use existing execute with fake message
                    await command.execute(fakeMessage, args, client);
                }
            } catch (error) {
                console.error(`Error executing /${interaction.commandName}:`, error);

                const errorMsg = {
                    content: '❌ An error occurred while executing this command.',
                    ephemeral: true
                };

                if (interaction.deferred || interaction.replied) {
                    await interaction.followUp(errorMsg);
                } else {
                    await interaction.reply(errorMsg);
                }
            }
        }

        // Handle button interactions
        if (interaction.isButton()) {
            // Button handling is done in individual commands
        }

        // Handle select menu interactions
        if (interaction.isStringSelectMenu()) {
            // Select menu handling is done in individual commands
        }
    }
};

/**
 * Create a fake message object for compatibility with text command handlers
 */
function createFakeMessage(interaction) {
    return {
        author: interaction.user,
        member: interaction.member,
        channel: interaction.channel,
        guild: interaction.guild,
        mentions: {
            users: interaction.options.resolved?.users || new Map(),
            members: interaction.options.resolved?.members || new Map(),
            channels: interaction.options.resolved?.channels || new Map(),
            roles: interaction.options.resolved?.roles || new Map()
        },
        reply: async (content) => {
            if (interaction.deferred || interaction.replied) {
                return interaction.followUp(content);
            }
            return interaction.reply(content);
        },
        channel: {
            ...interaction.channel,
            send: (content) => interaction.channel.send(content),
            sendTyping: () => Promise.resolve()
        },
        delete: () => Promise.resolve(),
        react: () => Promise.resolve(),
        // Flag to indicate this is from a slash command
        isSlashCommand: true,
        interaction: interaction
    };
}

/**
 * Extract arguments from slash command options
 */
function extractArgs(interaction) {
    const args = [];

    // Get all options
    const options = interaction.options.data;

    for (const option of options) {
        if (option.type === 6) { // USER type
            args.push(`<@${option.value}>`);
        } else if (option.type === 7) { // CHANNEL type
            args.push(`<#${option.value}>`);
        } else if (option.type === 8) { // ROLE type
            args.push(`<@&${option.value}>`);
        } else {
            args.push(String(option.value));
        }
    }

    return args;
}
