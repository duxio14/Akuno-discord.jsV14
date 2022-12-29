
const Discord = require('discord.js')


module.exports = {

	name: "bllist",
	description: "Affiche la latence du bot",
	category: "administration",
	ownerOnly: false,
	crownOnly: true,
	userPerms: ["SendMessages"],
	botPerms: ["SendMessages"],

	async execute(interaction, client, db, emoji, color) {

		let total = [];

		db.query(`SELECT * FROM blacklist WHERE guildID = ?`, interaction.guild.id, async (err, req) => {
			if(req.length < 1){
				return interaction.reply('Aucun utilisateur n\'est blacklist sur ce serveur !')
			}
			for (let i = 0; i < req.length; i++){
				const id = req[i].memberID
				total.push(id)
				console.log(total);
			}
			const embed = new Discord.EmbedBuilder()
			.setColor(color)
			.setTitle(`Liste des membres blacklist (${total.length}) du serveur.`)
			.setDescription(total.map(k => `<@${k}>`).join(" ").toString())
			
			await interaction.reply({embeds: [embed]})
        })
	},
};