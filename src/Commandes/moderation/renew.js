const Discord = require('discord.js');

module.exports = {

	name: "renew",
	description: "Permet de cloner un salon.",
	category: "modération",
	ownerOnly: false,
	fondateurOnly: false,
	userPerms: ["SendMessages", "ManageChannels"],
	botPerms: ["SendMessages", "ManageChannels"],

	async execute(interaction, client, db, emoji, color) {

		let channel = interaction.channel;

		channel.clone().then(async (chn) => {
			await chn.send(`${interaction.member}, ce salon a bien été **cloné**.`).then(message => setTimeout(() => message.delete(), 10000));
			channel.delete()
		})

	},
};