const { SlashCommandBuilder } = require("discord.js");
const daily = require("../../methods/dailyMessage");
const { getCount, resetCount } = require('../../controllers/jop.controller');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('Jop being stuupid'),
	async execute(interaction) {

        console.log("-----{ RESET }-----")
        let countOld = await getCount();

        if(countOld == -1){
            console.error("COUNT IS NOT FOUND IN DATABASE");
            await interaction.reply("Oh no! Something went horribly wrong!")
            return;
        }

        await resetCount();
        let countNew = await getCount();

        if(countNew == -1){
            console.error("COUNT IS NOT FOUND IN DATABASE");
            await interaction.reply("Oh no! Something went horribly wrong!")
            return;
        }

		await interaction.reply("Oops Jop did it again");

        console.log("-----{ END RESET }-----")

        
        await daily.dailyMessage(interaction.client);
	},
};