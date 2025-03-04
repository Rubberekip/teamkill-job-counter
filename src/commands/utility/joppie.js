const { SlashCommandBuilder } = require("discord.js");
const daily = require("../../methods/dailyMessage");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joppie')
		.setDescription('wats de count?'),
	async execute(interaction, client) {
        await daily.dailyMessage(client);

        await interaction.reply('ok');
	},
};