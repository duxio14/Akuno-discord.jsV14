const ms = require('ms')
const Discord = require('discord.js')
const functionCooldown = require('../../function/cooldown')
const functionAddMoney = require('../../function/addmoney')
const functionRemoveMoney = require('../../function/removemoney')
const functionID = require('../../function/createID')
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

	name: "recover",
	description: "Récupere votre argent en banque.",
	category: "economie",
	ownerOnly: false,
	fondateurOnly: false,
	userPerms: ["SendMessages"],
	botPerms: ["SendMessages"],
    options: [
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "argent",
            description: "Le nombre d'argent à déplacer avec \"all\" pour tout.",
            required: true
        }
    ],

	async execute(interaction, client, db, emoji, color) {
        let amount = interaction.options.getString("argent");
        if(isNaN(amount) && amount !== "all"){
            return interaction.reply("Ceci n'est pas un nombre...")
        }
        if(amount.length > 255){
            return interaction.reply("Vous n'avez et n'aurez jamais une telle somme !")
        }
        const id = await functionID("recover")
       
        db.query(`SELECT * FROM money WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, interaction.member.id], async (err, cash) => {
        db.query(`SELECT * FROM banque WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, interaction.member.id], async (err, req) => {

            if(amount === "all") amount = req[0].money;
            if(req.length < 1 || amount < 1){
                return interaction.reply(`Vous n'avez pas d'argent dans votre banque !`)
            }else if(req[0].money < amount){
                const thune = cash[0].money < 1 ? 0 : cash[0].money;
                return interaction.reply(`Vous n'avez pas assez d'argent dans votre banque ! Il vous manque ${numStr(amount - thune)} <:xenos_money:1021001754558615623>`)
            }else if(cash.length < 1){
                db.query(`INSERT INTO money (memberID, money, guildID, id) VALUES (?, ?, ?, ?)`, [interaction.member.id, amount, interaction.guild.id, id])
                db.query(`UPDATE banque SET money = ? WHERE guildID = ? AND memberID = ?`,[parseInt(req[0].money) - amount, interaction.guild.id, interaction.member.id])
                return interaction.reply(`Vous avez retiré ${numStr(amount)} <:xenos_money:1021001754558615623> de votre banque.`)
            }else{
                functionAddMoney(interaction.member.id, interaction.guild.id, amount)
                db.query(`UPDATE banque SET money = ? WHERE guildID = ? AND memberID = ?`,[parseInt(req[0].money) - amount, interaction.guild.id, interaction.member.id])
                return interaction.reply(`Vous avez retiré ${numStr(amount)} <:xenos_money:1021001754558615623> de votre banque.`)
            }
        })
        })
	},
};