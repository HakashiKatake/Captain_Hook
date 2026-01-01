import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { randomChoice, randomInt } from '../../utils/helpers.js';

const enemies = ['Alien', 'Zombie', 'Monster', 'Ghost', 'Demon', 'Vampire', 'Undead', 'Dragon', 'Goblin', 'Orc'];
const enemyAttacks = ['punch', 'slash', 'bite', 'kick'];

export default {
    name: 'battle',
    aliases: ['fight', 'rpg'],
    description: 'Battle a random enemy in a turn-based RPG',
    usage: '',
    example: '!battle',
    category: 'games',
    guildOnly: true,
    cooldown: 15,

    async execute(message, args, client) {
        const player = message.author;
        const enemyName = randomChoice(enemies);

        // Game stats
        let playerHealth = 20; // Original was 5, let's make it a bit longer: 20
        let enemyHealth = 20;
        let turn = 0; // 0 = player, 1 = enemy

        const embed = createBattleEmbed(player, playerHealth, enemyName, enemyHealth, "Battle Start!", turn);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('punch').setLabel('👊 Punch').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId('heal').setLabel('❤️ Heal').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('surrender').setLabel('🏳️ Surrender').setStyle(ButtonStyle.Secondary)
        );

        const gameMsg = await message.channel.send({ embeds: [embed], components: [row] });

        const collector = gameMsg.createMessageComponentCollector({
            filter: i => i.user.id === player.id,
            time: 120000 // 2 minutes
        });

        collector.on('collect', async (interaction) => {
            const action = interaction.customId;
            let log = '';

            // Player Turn
            if (action === 'surrender') {
                collector.stop();
                const surrenderEmbed = new EmbedBuilder()
                    .setTitle('🏳️ Surrendered')
                    .setDescription(`**${player.username}** surrendered!\n\n**${enemyName}** Wins!`)
                    .setColor('#808080');
                return interaction.update({ embeds: [surrenderEmbed], components: [] });
            }

            if (action === 'punch') {
                const dmg = randomInt(3, 7);
                enemyHealth = Math.max(0, enemyHealth - dmg);
                log += `👊 You punched **${enemyName}** for **${dmg}** damage!\n`;

                if (enemyHealth <= 0) {
                    collector.stop();
                    const winEmbed = createBattleEmbed(player, playerHealth, enemyName, 0, log + `\n🎉 **${player.username}** defeated **${enemyName}**!`, 0)
                        .setColor('#57F287');
                    return interaction.update({ embeds: [winEmbed], components: [] });
                }
            } else if (action === 'heal') {
                const heal = randomInt(2, 5);
                const oldHealth = playerHealth;
                playerHealth = Math.min(30, playerHealth + heal); // Max 30 hp
                log += `❤️ You healed yourself for **${playerHealth - oldHealth}** HP.\n`;
            }

            // Enemy Turn
            const enemyAction = randomChoice(enemyAttacks);
            const enemyDmg = randomInt(2, 6);

            playerHealth = Math.max(0, playerHealth - enemyDmg);
            log += `💀 **${enemyName}** used ${enemyAction} dealing **${enemyDmg}** damage!`;

            if (playerHealth <= 0) {
                collector.stop();
                const loseEmbed = createBattleEmbed(player, 0, enemyName, enemyHealth, log + `\n💀 **${player.username}** was defeated...`, 1)
                    .setColor('#ED4245');
                return interaction.update({ embeds: [loseEmbed], components: [] });
            }

            // Update embed
            const updateEmbed = createBattleEmbed(player, playerHealth, enemyName, enemyHealth, log, 0);
            await interaction.update({ embeds: [updateEmbed], components: [row] });
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                gameMsg.edit({ content: '⏰ Battle timed out!', components: [] }).catch(() => { });
            }
        });
    }
};

function createBattleEmbed(player, pHealth, enemy, eHealth, log, turn) {
    const pBar = createHealthBar(pHealth, 30);
    const eBar = createHealthBar(eHealth, 30);

    return new EmbedBuilder()
        .setTitle(`⚔️ Battle: ${player.username} vs ${enemy}`)
        .setDescription(log || 'Choose your action!')
        .addFields(
            { name: `🧑 ${player.username}`, value: `HP: ${pHealth}\n${pBar}`, inline: true },
            { name: `👾 ${enemy}`, value: `HP: ${eHealth}\n${eBar}`, inline: true }
        )
        .setColor('#5865F2')
        .setFooter({ text: 'Turn-based RPG Battle' });
}

function createHealthBar(current, max) {
    const size = 10;
    const pct = Math.max(0, current / max);
    const filled = Math.round(pct * size);
    const empty = size - filled;

    return '🟩'.repeat(filled) + '⬛'.repeat(empty);
}
