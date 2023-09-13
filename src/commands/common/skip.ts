import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';

import { Command } from '../../structs/types/Command';

export default new Command({
    name: "skip",
    type: ApplicationCommandType.ChatInput,
    description: "Pula uma ou mais músicas",
    options: [
        {
            name: "quantidade",
            description: "Quantidade de músicas para pular",
            type: ApplicationCommandOptionType.Number,
            required: false
        }
    ],    
    async run({interaction, client, options}) {
        
        const message = interaction as any;
        const queue = client.distube.getQueue(message);

        if (!queue) 
            return interaction.reply({content: "Não há nenhuma música na fila."});

        let quantidade: number;

        options.getNumber("quantidade") ? quantidade = options.getNumber("quantidade") as number : quantidade = 1;

        for (let index = 1; index <= quantidade; index++) {
            let musica = await queue.skip()
            interaction.channel?.send(`Música pulada ${musica.name}}`)
        }
    }, 
});

