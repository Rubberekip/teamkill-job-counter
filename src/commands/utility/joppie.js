const { SlashCommandBuilder } = require("discord.js");
const daily = require("../../methods/dailyMessage");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joppie')
		.setDescription('stopid'),
	async execute(interaction, client) {

        await daily.dailyMessage(client);

        await interaction.reply('ok');
        
	},
};