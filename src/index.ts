import { ExtendedClient } from "./structs/ExtendedClient"
export * from "colors";

const client = new ExtendedClient();

client.start();

export { client }

client.on("ready", () => {
    console.log("Chupingobo está online".green); 
});

client.on("messageCreate", (message) => {
    if (message.author.id == client.user?.id) return;
    console.log("Recebi uma mensagem".red);
    
    message.reply({
        content: `Olá ${message.author.username}`
    });
});