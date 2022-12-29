const ms = require('ms')
const Discord = require('discord.js')

function numStr(a, b) {
	a = '' + a;
	b = b || ' ';
	var c = '',
		d = 0;
	while (a.match(/^0[0-9]/)) {
		a = a.substr(1);
	}
	for (var i = a.length - 1; i >= 0; i--) {
		c = (d != 0 && d % 3 == 0) ? a[i] + b + c : a[i] + c;
		d++;
	}
	return c;
}

module.exports = {

	name: "leaderboard",
	description: "Affiche le leaderboard du serveur !",
	category: "economie",
	ownerOnly: false,
	fondateurOnly: false,
	userPerms: ["SendMessages"],
	botPerms: ["SendMessages"],
	options: [{
		type: Discord.ApplicationCommandOptionType.Integer,
		name: "choix",
		description: "Choisir entre banque, solde ou les deux (all).",
		required: true,
		choices: [{
				name: "Solde",
				value: 1
			},
			{
				name: "Banque",
				value: 2
			}
		]
	}],

	async execute(interaction, client, db, color) {
		const choice = interaction.options.getInteger("choix")
		let total = [];
		let total1 = [];
		let totalBanque = [];
		let total2 = []
		let total3 = []

		db.query(`SELECT * FROM money WHERE guildID = ?`, interaction.guild.id, async (err, req) => {
			db.query(`SELECT * FROM money WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, interaction.member.id], async (err, req2) => {
				db.query(`SELECT * FROM banque WHERE guildID = ?`, [interaction.guild.id], async (err, req1) => {
					db.query(`SELECT * FROM banque WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, interaction.member.id], async (err, req3) => {
						
							console.log(req4)

						if (choice === 1) {

							if (req.length < 1) {
								return interaction.reply('Aucun utilisateur n\'a de solde sur ce serveur !')
							}
							for (let i = 0; i < req.length; i++) {
								const thune = {
									name: req[i].memberID,
									value: req[i].money
								}
								total.push(thune)
							}
							total.sort(function (a, b) {
								return b.value - a.value;
							});

							const index = total.findIndex(obj => obj.name == interaction.user.id)
							console.log(index);
							let b;
							req.length < 10 ? b = req.length : b = 10;
							for (let a = 0; a < b; a++) {
								total1.push({
									name: a + 1,
									value: total[a]
								})
							}


							const embed = new Discord.EmbedBuilder()
								.setColor(color)
								.setTitle(`LeaderBoard des soldes des membres de ${interaction.guild.name}`)
								.setDescription(`${total1.map(k => `**#${k.name}** ${(interaction.guild.members.cache.get(k.value.name))}` + " → " + numStr(k.value.value) + " <:xenos_money:1021001754558615623>").join("\n")}\n\n**You**\n**#${index + 1}** ${interaction.member} → ${req2[0].money} <:xenos_money:1021001754558615623>`)

							await interaction.reply({
								embeds: [embed]
							})
						} else if (choice === 2) {

							if (req1.length < 1) {
								return interaction.reply('Aucun utilisateur n\'a d\'argent dans sa banque sur ce serveur !')
							}
							for (let y = 0; y < req.length; y++) {
								const thune = { name: req[y].memberID, value:req[y].money}
								total2.push(thune)
							}
							for (let y = 0; y < req1.length; y++) {
								const thune = { name: req1[y].memberID, value: req1[y].money}
								total3.push(thune)
							}
							total2.sort(function (a, b) {
								return b.value - a.value;
							});
							let c;
							const index = total2.findIndex(obj => obj.name == interaction.user.id)
							console.log(index);
							let b;

							req1.length < 10 ? c = req1.length : c = 10;
							for (let a = 0; a < c; a++) {
								total3.push({
									name: a + 1,
									value: total2[a]
								})
							}


							const embed = new Discord.EmbedBuilder()
								.setColor(color)
								.setTitle(`LeaderBoard de l'argent en banque des membres de ${interaction.guild.name}`)
								.setDescription(`${total3.map(k => `**#${k.name}** ${(interaction.guild.members.cache.get(k.value.name))}` + " → " + numStr(k.value.value) + " <:xenos_money:1021001754558615623>").join("\n")}\n\n**You**\n**#${index + 1}** ${interaction.member} → ${req3[0].money} <:xenos_money:1021001754558615623>`)

							await interaction.reply({
								embeds: [embed]
							})
						}
					
				})
			})
		})
		})
	},
};