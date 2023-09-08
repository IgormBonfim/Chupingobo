import { Collection } from 'discord.js';
import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Command } from "../../structs/types/Command";

export default new Command({
    name: "ping",
    type: ApplicationCommandType.ChatInput,
    description: "Responde com pong",
    run({interaction}) {

        const row = new ActionRowBuilder<ButtonBuilder>({components: [
            new ButtonBuilder({ customId: "test-button", label: "Clique aqui", style: ButtonStyle.Success})
        ]})

        interaction.reply({ephemeral: true, content: "Pong", components: [row]})
    }, 
    buttons: new Collection([
        ["test-button", async (interaction) => {
            interaction.update({components: []})
        }],
    ]),
});