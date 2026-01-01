import { EmbedBuilder } from 'discord.js';

export default {
    name: 'math',
    aliases: ['calc', 'calculate', 'mathadd', 'mathsub', 'mathmult', 'mathdiv', 'mathrando'],
    description: 'Perform basic math operations',
    usage: '<operation> <num1> <num2>',
    example: '!math add 5 3',
    category: 'misc',
    guildOnly: false,

    async execute(message, args, client) {
        // Check for legacy command aliases
        const usedCommand = message.content.split(' ')[0].toLowerCase().replace(/^[!?\-.]/, '');

        let operation, num1, num2;

        // Handle legacy mathadd, mathsub, etc. commands
        if (usedCommand.startsWith('math') && usedCommand !== 'math') {
            operation = usedCommand.replace('math', '');
            num1 = parseFloat(args[0]);
            num2 = parseFloat(args[1]);
        } else {
            operation = args[0]?.toLowerCase();
            num1 = parseFloat(args[1]);
            num2 = parseFloat(args[2]);
        }

        if (!operation) {
            return message.reply({
                content: `❌ Usage: \`!math <operation> <num1> <num2>\`\n\nOperations: \`add\`, \`sub\`, \`mult\`, \`div\`, \`sqrt\`, \`rando\`\n\nExamples:\n\`!math add 5 3\`\n\`!math sqrt 16\`\n\`!math rando 1 10\``,
                allowedMentions: { repliedUser: false }
            });
        }

        let result;
        let emoji = '🔢';

        switch (operation) {
            case 'add':
            case '+':
                if (isNaN(num1) || isNaN(num2)) return message.reply('❌ Please provide two numbers!');
                result = num1 + num2;
                emoji = '➕';
                break;

            case 'sub':
            case 'subtract':
            case '-':
                if (isNaN(num1) || isNaN(num2)) return message.reply('❌ Please provide two numbers!');
                result = num1 - num2;
                emoji = '➖';
                break;

            case 'mult':
            case 'multiply':
            case '*':
            case 'x':
                if (isNaN(num1) || isNaN(num2)) return message.reply('❌ Please provide two numbers!');
                result = num1 * num2;
                emoji = '✖️';
                break;

            case 'div':
            case 'divide':
            case '/':
                if (isNaN(num1) || isNaN(num2)) return message.reply('❌ Please provide two numbers!');
                if (num2 === 0) return message.reply('❌ Cannot divide by zero!');
                result = num1 / num2;
                emoji = '➗';
                break;

            case 'sqrt':
                if (isNaN(num1)) {
                    num1 = parseFloat(args[1]) || parseFloat(args[0]);
                }
                if (isNaN(num1)) return message.reply('❌ Please provide a number!');
                if (num1 < 0) return message.reply('❌ Cannot calculate square root of negative number!');
                result = Math.sqrt(num1);
                emoji = '√';
                break;

            case 'rando':
            case 'random':
                if (isNaN(num1) || isNaN(num2)) return message.reply('❌ Please provide two numbers for range!');
                result = Math.floor(Math.random() * (Math.max(num1, num2) - Math.min(num1, num2) + 1)) + Math.min(num1, num2);
                emoji = '🎲';
                break;

            default:
                return message.reply({
                    content: `❌ Unknown operation: \`${operation}\`\n\nAvailable: \`add\`, \`sub\`, \`mult\`, \`div\`, \`sqrt\`, \`rando\``,
                    allowedMentions: { repliedUser: false }
                });
        }

        const embed = new EmbedBuilder()
            .setTitle(`${emoji} Math Result`)
            .setDescription(`\`\`\`${result}\`\`\``)
            .setColor('#5865F2')
            .setFooter({ text: `Requested by ${message.author.username}` });

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
};
