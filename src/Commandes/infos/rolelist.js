
const Discord = require('discord.js')

module.exports = {

	name: "rolelist",
	description: "Envoie le list de tout les roles",
	category: "information",
	ownerOnly: false,
	fondateurOnly: false,
	userPerms: ["SendMessages"],
	botPerms: ["SendMessages"],

	async execute(interaction, client, db, emoji, color) {

		const roles = interaction.guild.roles.cache;
        const roleslist = roles.map(r => "`" + r.name + "`").join(", ");

        const embed = new Discord.EmbedBuilder()
        .setColor(color)
        .setTitle(`Voici le liste des ${roles.size > 1 ? roles.size + " roles" : roles.size + " role"} du serveur.`)
        .setDescription(`${roleslist}`)

        interaction.reply({embeds: [embed]})
	},
};