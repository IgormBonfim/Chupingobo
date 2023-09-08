import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';

import { Command } from '../../structs/types/Command';

export default new Command({
    name: "play",
    type: ApplicationCommandType.ChatInput,
    description: "Toca uma música",
    options: [
        {
            name: "musica",
            description: "URL ou nome da música",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],    
    run({interaction, client, options}) {

        const musica = options.getString("musica", true);

        const message = interaction as any;
        const voiceChannel = message.member.voice.channel
        
        client.distube.play(voiceChannel, musica, {
            member: message.member,
            textChannel: message.channel,
        });

        interaction.reply({content: `Música adicionada a fila: ${musica}`});
    }, 
});