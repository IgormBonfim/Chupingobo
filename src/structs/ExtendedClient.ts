import { ClientEvents } from 'discord.js';
import {
    ApplicationCommandDataResolvable,
    BitFieldResolvable,
    Client,
    Collection,
    GatewayIntentsString,
    IntentsBitField,
    Partials,
} from 'discord.js';
import dotenv from 'dotenv';
import path from 'path';
import fs from "fs";

import { CommandType, ComponentsButton, ComponentsModal, ComponentsSelect } from './types/command';
import { EventType } from './types/Event';

dotenv.config();
const fileCondition = (fileName: string) => fileName.endsWith(".ts") || fileName.endsWith(".js");

export class ExtendedClient extends Client {

    public commands: Collection<string, CommandType> = new Collection();
    public buttons: ComponentsButton = new Collection();
    public selects: ComponentsSelect = new Collection();
    public modals: ComponentsModal = new Collection();

    constructor() {
        super({
            intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>,
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.GuildScheduledEvent,
                Partials.Message,
                Partials.Reaction,
                Partials.ThreadMember,
                Partials.User,
            ]
        });
    }

    public start(): void {
        this.registerModules();
        this.registerEvents();
        this.login(process.env.TOKEN);
    }

    private registerCommands(commands: Array<ApplicationCommandDataResolvable>): void {
        this.application?.commands.set(commands)
        .then(() => {
            console.log(`✔ ${commands.length} Commandos registrados`.green);
        })
        .catch(error => {
            console.log(`❌ Ocorreu um erro ao registrar comandos: \n${error}`.red);
            
        })
    }

    private registerModules(): void {
        const slashCommands: Array<ApplicationCommandDataResolvable> = new Array()

        const commandsPath = path.join(__dirname, "..", "commands");

        fs.readdirSync(commandsPath).forEach(local => {
            fs.readdirSync(commandsPath + `/${local}/`)
            .filter(fileCondition)
            .forEach(async fileName => {
                const command: CommandType = (await import(`../commands/${local}/${fileName}`))?.default;
                const { name, buttons, selects, modals } = command;

                if (!name) return

                this.commands.set(name, command);
                slashCommands.push(command)

                if (buttons) buttons.forEach((run, key) => this.buttons.set(key, run))
                if (selects) selects.forEach((run, key) => this.selects.set(key, run))
                if (modals) modals.forEach((run, key) => this.modals.set(key, run))
            });
        });

        this.on("ready", () => this.registerCommands(slashCommands))
    }

    private registerEvents(): void {
        const eventsPath = path.join(__dirname, "..", "events");

        fs.readdirSync(eventsPath).forEach(local => {
            fs.readdirSync(`${eventsPath}/${local}/`)
            .filter(fileCondition)
            .forEach(async fileName => {
                const { name, once, run }: EventType<keyof ClientEvents> = (await import(`../events/${local}/${fileName}`))?.default;

                try {
                    if (!name) return
                    
                    (once) ? this.once(name, run) : this.on(name, run);
                    
                } catch (error) {
                    console.log(`Ocorreu um erro ao registrar o evento: ${name} \n${error}`.red);
                    
                }
            });
        });  
    }
}