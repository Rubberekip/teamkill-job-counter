const { SlashCommandBuilder } = require("discord.js");
const increase = require("../../methods/increaseCount");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newday')
		.setDescription('Increases counter'),
	async execute(interaction) {
        const val = await increase.increaseCount();
       
        if(val == 1){
            await interaction.reply("Oh no! Something went horribly wrong!");
            return;
        }

		await interaction.reply('Its a new day, new jop activities!');
	},
};