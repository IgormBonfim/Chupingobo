import { ApplicationCommandType } from 'discord.js';

import { Command } from '../../structs/types/Command';

export default new Command({
    name: "resume",
    type: ApplicationCommandType.ChatInput,
    description: "Continua a tocar a fila de reprodução",   
    run({interaction, client}) {

        const message = interaction as any;
        const queue = client.distube.getQueue(message);

        if (!queue) 
            return interaction.reply({content: "Não há nenhuma música na fila."});

        queue!.resume();

        interaction.reply({content: `Reprodução retomada`});
    }, 
});