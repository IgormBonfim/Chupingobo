import { ExtendedClient } from "./structs/ExtendedClient";
import config from "./config.json"; 
export * from "colors";
import path from "path";
import fs from "fs";

// fs.readdirSync(path.join(__dirname, "commands")).forEach(local => {
//     fs.readdirSync(path.join(__dirname, "commands", local))
//     .filter(filename => filename.endsWith(".ts" || filename.endsWith(".js")))
//     .forEach(filename => {

//     })
// });

const client = new ExtendedClient();

client.start();

export { client, config }

// client.on("ready", () => {
//     console.log("Chupingobo está online".green); 
// });

// client.on("messageCreate", (message) => {
//     if (message.author.id == client.user?.id) return;
//     console.log("Recebi uma mensagem".red);
    
//     message.reply({
//         content: `Olá ${message.author.username}`
//     });
// });