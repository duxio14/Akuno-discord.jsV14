const Discord = require('discord.js');
const ms = require('ms')
module.exports = {

	name: "clear",
	description: "Permet de supprimer un nombre de message.",
	category: "modération",
	ownerOnly: false,
	fondateurOnly: false,
	userPerms: ["SendMessages", "ManageMessages"],
	botPerms: ["SendMessages", "ManageMessages"],
	options: [{
			type: Discord.ApplicationCommandOptionType.Number,
			name: "num",
			description: "Veuillez envoyer le nombre de message(s) à supprimer.",
			required: true
		},
		{
			type: Discord.ApplicationCommandOptionType.User,
			name: "membre",
			description: "Veuillez envoyer le membre à qui les messages seront supprimés.",
			required: false
		}
	],

	async execute(interaction, client, db, emoji, color) {
		let number = interaction.options.getNumber('num');
		let member = interaction.options.getMember('membre');

		if (number > 99 || number < 1) {
			return interaction.reply('Le nombre de message(s) à suprimmer doit etre compris entre **1** et **99** <:error:970287035090890752>')
		}
		try {

			if (member) {
				let i = 0;
				const messageToDelete = (await interaction.channel.messages.fetch());
				const filteredTargetMessages = [];
				messageToDelete.filter((msg) => {
					if (msg.author.id == member.id && number > i) {
						filteredTargetMessages.push(msg);
						i++;
					}
				});
				number = filteredTargetMessages.length;
				if (number < 1) return interaction.reply(`${member} n'a pas envoyé de message dans ce salon.`)

				await interaction.channel.bulkDelete(filteredTargetMessages).then(async () => {
					interaction.reply(`J'ai bien supprimé ${number} ${number < 2 ? "message" : "messages"} de ${member}.`)
				})
			} else {
				const messages = await interaction.channel.bulkDelete(number)
				interaction.reply(`J'ai bien supprimé ${messages.size} ${number < 2 ? "message" : "messages"}.`)
			}
		} catch (err) {
			const messageToDelete = (await interaction.channel.messages.fetch());
			const filteredTargetMessages = [];
			messageToDelete.filter((msg) => {
				if ((Date.now() - msg.createdAt) <= ms("14d")) {
					filteredTargetMessages.push(msg);
				}
			});
			if (filteredTargetMessages.length < 1) {
				return interaction.reply('Je ne peux que supprimer des messages datants de moin de 14 jours !')
			} else {
				number = filteredTargetMessages.length;
				interaction.channel.bulkDelete(filteredTargetMessages).then(async () => {
					interaction.reply(`j'ai bien supprimé ${number} ${number < 2 ? "message" : "messages"}`)
				})
			}
		}

	}
}