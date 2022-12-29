
const Discord = require('discord.js')
const config = require('../../config/config.json')


module.exports = {

	name: "ownerinfo",
	description: "Affiche les informations du developpeur du bot",
	category: "information",
	ownerOnly: false,
	fondateurOnly: false,
	userPerms: ["SendMessages"],
	botPerms: ["SendMessages"],

	async execute(interaction, client, db, emoji, color) {

		const owner = config.owner.tag;
		const ownerId = config.owner.id;
		
		const embed = new Discord.EmbedBuilder()
		.setColor(color)
		.setTitle('Voici les informations de mon développeur')
		.setFields([
			{
				name: 'Informations générales', value: `**Tag :** \`${owner}\`\n**Id :** \`${ownerId}\`\n**Langages :** \`JavaScript, HTML, CSS, SQL\``
			}
		])
		interaction.reply({
			embeds: [embed]
		})
	},
};