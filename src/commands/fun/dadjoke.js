import { EmbedBuilder } from 'discord.js';

const dadjokes = [
    "What do you call a mac 'n' cheese that gets all up in your face? Too close for comfort food!",
    "What concert costs just 45 cents? 50 Cent featuring Nickelback!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What do sprinters eat before a race? Nothing, they fast!",
    "Why couldn't the bicycle stand up by itself? It was two tired!",
    "Did you hear about the guy who invented Lifesavers? They say he made a mint!",
    "Why do you never see elephants hiding in trees? Because they're so good at it!",
    "How does a penguin build its house? Igloos it together!",
    "Why did the old man fall in the well? Because he couldn't see that well!",
    "Why don't skeletons ever go trick or treating? Because they have no body to go with!",
    "What do you call a factory that sells passable products? A satisfactory!",
    "Why did the invisible man turn down the job offer? He couldn't see himself doing it!",
    "Want to hear a joke about construction? I'm still working on it!",
    "I like telling Dad jokes. Sometimes he laughs!",
    "To whoever stole my copy of Microsoft Office, I will find you. You have my Word!",
    "What does a baby computer call his father? Data.",
    "Which days are the strongest? Saturday and Sunday. The rest are weekdays."
];

export default {
    name: 'dadjoke',
    aliases: ['dad', 'dadj'],
    description: 'Get a random dad joke',
    usage: '',
    example: '!dadjoke',
    category: 'fun',
    guildOnly: false,
    cooldown: 3,

    async execute(message, args, client) {
        const joke = dadjokes[Math.floor(Math.random() * dadjokes.length)];
        const embed = new EmbedBuilder()
            .setTitle('👴 Dad Joke')
            .setDescription(joke)
            .setColor('#FFA500');
        message.channel.send({ embeds: [embed] });
    }
};
