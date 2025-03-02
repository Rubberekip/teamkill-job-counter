const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");

const JSON_FILE = "./countdata.json";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newday')
		.setDescription('Increases counter'),
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

        data.count += 1;
        console.log("new day, new jop");

        console.log(data);

        try{
            fs.writeFileSync(JSON_FILE, JSON.stringify(data));
        } catch(error){
            console.error(error);
            await interaction.reply("oh no! something went wrong!");
            return;
        }
       
		await interaction.reply('Its a new day, new jop activities!');
	},
};