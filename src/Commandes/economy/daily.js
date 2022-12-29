const ms = require('ms')
const Discord = require('discord.js')
const functionCooldown = require('../../function/cooldown')
const functionAddMoney = require('../../function/addmoney')
const functionC = require('../../function/createID')

module.exports = {

	name: "daily",
	description: "Vous donne de l'argent toute les 12 heures.",
	category: "economie",
	ownerOnly: false,
	fondateurOnly: false,
	userPerms: ["SendMessages"],
	botPerms: ["SendMessages"],

	async execute(interaction, client, db, emoji, color) {
        const id = await functionC("daily")
        const cooldownTime = ms("24h");
        db.query(`SELECT * FROM daily WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, interaction.member.id], async (err, req) => {
            if(req.length < 1){
                db.query(`INSERT INTO daily (memberID, cooldown, guildID, id) VALUES (?, ?, ?, ?)`, [interaction.member.id, Date.now(), interaction.guild.id, id])
                functionAddMoney(interaction.member.id, interaction.guild.id, 100)
                return interaction.reply(`Vous venez de gagner 100 <:xenos_money:1021001754558615623> de récompenses quotidiennes.`);
            }else{
                const cooldown = req[0].cooldown; 

                if(Date.now() < parseInt(cooldownTime) + parseInt(cooldown)){
                    functionCooldown(cooldown, cooldownTime, interaction)
                }else{
                    db.query(`UPDATE daily SET cooldown = ? WHERE guildID = ? AND memberID = ?`,[Date.now(), interaction.guild.id, interaction.member.id], async (err, req) => {
                        functionAddMoney(interaction.member.id, interaction.guild.id, 100)
                        return interaction.reply(`Vous venez de gagner 100 <:xenos_money:1021001754558615623> de récompenses quotidiennes.`);
                    })
                }
            }
        })
	},
};