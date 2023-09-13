import { CommandInteractionOptionResolver } from 'discord.js';
import { client, cyan } from "../../main";
import { Event } from "../../structs/types/Event";

export default new Event({
    name: "ready",
    once: true,
    run() {
        const { commands, buttons, selects, modals } = client;

        console.log("✔ Chupingobô está online".green);
        console.log(`Comandos carregados ${commands.size}`.cyan);
        console.log(`Buttons carregados ${buttons.size}`.cyan);
        console.log(`Celects carregados ${selects.size}`.cyan);
    },
});