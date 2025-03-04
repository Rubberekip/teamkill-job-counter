const fs = require("node:fs");
const path = require("node:path");
const daily = require("./methods/dailyMessage");
const increase = require("./methods/increaseCount");
const cron = require("node-cron");
const { Client, Events, GatewayIntentBits, Collection, MessageFlags } = require("discord.js");
const { initJop } = require('./controllers/jop.controller');

require("dotenv").config();

const client = new Client(
    { intents: [
        GatewayIntentBits.Guilds],
        disableEveryone: false
    }
);

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command){
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try{
        await command.execute(interaction, client);
    } catch(error){
        console.error(error);
        if(interaction.replied || interaction.deferred){
            await interaction.followUp({ content: "There was an error while executing this command!", flags: MessageFlags.Ephemeral });
        } else {
            await interaction.reply({ content: "There was an error while executing this command!", flags: MessageFlags.Ephemeral });
        }
    }
});




client.once(Events.ClientReady, async readyClient => {
    console.log(`Aaah, another day, another dollar \nLogged in as ${readyClient.user.tag}`);
    
    await initJop();

    cron.schedule("* 10 * * *", async () => {
        await increase.increaseCount();
        await daily.dailyMessage(client);
    });

});


client.login(process.env.DISCORD_TOKEN);
