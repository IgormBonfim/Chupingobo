import { ApplicationCommandType } from 'discord.js';

import { Command } from '../../structs/types/Command';

export default new Command({
    name: "pause",
    type: ApplicationCommandType.ChatInput,
    description: "Pausa a música tocando",   
    run({interaction, client}) {

        const message = interaction as any;
        const queue = client.distube.getQueue(message);

        if (!queue) 
            return interaction.reply({content: "Não há nenhuma música na fila."});

        queue!.pause();

        interaction.reply({content: `Música pausada`});
    }, 
});