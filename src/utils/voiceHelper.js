import { join } from 'path';
import { createAudioResource, createAudioPlayer, AudioPlayerStatus, joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper to play a local file and disconnect
export async function playLocalFile(message, fileName, durationSeconds, preMessage = null) {
    const channel = message.member?.voice.channel;

    if (!channel) {
        return message.reply({ content: '❌ You need to be in a voice channel!', allowedMentions: { repliedUser: false } });
    }

    // Permissions check
    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has('Connect') || !permissions.has('Speak')) {
        return message.reply({ content: '❌ I need permissions to join and speak in your voice channel!', allowedMentions: { repliedUser: false } });
    }

    if (preMessage) {
        await message.channel.send(preMessage);
    }

    try {
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer();
        // Resolve path relative to project root sounds folder
        // Assuming this file is in src/utils/
        const resourcePath = join(__dirname, '../../sounds', fileName);
        const resource = createAudioResource(resourcePath);

        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Playing, () => {
            // console.log(`Playing ${fileName}`);
        });

        player.on('error', error => {
            console.error(`Error: ${error.message} with resource ${resourcePath}`);
            // connection.destroy();
        });

        // Disconnect after duration 
        setTimeout(() => {
            if (connection.state.status !== VoiceConnectionStatus.Destroyed) {
                connection.destroy();
            }
        }, durationSeconds * 1000);

    } catch (error) {
        console.error(error);
        message.reply({ content: '❌ Error playing audio.', allowedMentions: { repliedUser: false } });
    }
}

// Helper for Party command (sequence of files)
export async function playSequence(message, sequence) {
    const channel = message.member?.voice.channel;

    if (!channel) {
        return message.reply({ content: '❌ You need to be in a voice channel!', allowedMentions: { repliedUser: false } });
    }

    try {
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer();
        connection.subscribe(player);

        const playNext = async (index) => {
            if (index >= sequence.length) {
                connection.destroy();
                return;
            }

            const { file, duration } = sequence[index];
            const resourcePath = join(__dirname, '../../sounds', file);
            const resource = createAudioResource(resourcePath);

            player.play(resource);

            // Wait for duration then play next
            setTimeout(() => {
                playNext(index + 1);
            }, duration * 1000);
        };

        playNext(0);

    } catch (error) {
        console.error(error);
        message.reply({ content: '❌ Error starting party.', allowedMentions: { repliedUser: false } });
    }
}
