const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");
const daily = require("../../methods/dailyMessage");

const JSON_FILE = "countdata.json";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('Jop being stuupid'),
	async execute(interaction) {

        let data;
        
        try{
            const temp = fs.readFileSync(JSON_FILE);
            data = JSON.parse(temp);
        } catch(error){
            console.error(error);
            await interaction.reply("oh no! something went wrong!");
            return;
        }

        console.log(data);

        data.count = -1;
        console.log("jop has been stuupid");

        console.log(data);

        try{
            fs.writeFileSync(JSON_FILE, JSON.stringify(data));
        } catch(error){
            console.error(error);
            await interaction.reply("oh no! something went wrong!");
            return;
        }
       
		await interaction.reply("oops, jop did it again");

        
        await daily.dailyMessage(interaction.client);
	},
};