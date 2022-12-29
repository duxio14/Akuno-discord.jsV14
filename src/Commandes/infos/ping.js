
const Discord = require('discord.js')


module.exports = {

	name: "ping",
	description: "Affiche la latence du bot",
	category: "information",
	ownerOnly: false,
	fondateurOnly: false,
	userPerms: ["SendMessages"],
	botPerms: ["SendMessages"],

	async execute(interaction, client, db, emoji, color, lang) {


		await interaction.reply(lang.command.utils.ping.ws(client.ws.ping));	
	},
};