const ms = require('ms')
const Discord = require('discord.js')
const functionCooldown = require('../../function/cooldown')
const functionAddMoney = require('../../function/addmoney')
const functionC = require('../../function/createID')

module.exports = {

	name: "beg",
	description: "Mendiez dans la rue et peut être que vous aurez de la chance !",
	category: "economie",
	ownerOnly: false,
	fondateurOnly: false,
	userPerms: ["SendMessages"],
	botPerms: ["SendMessages"],

	async execute(interaction, client, db, emoji, color) {
        const id = await functionC("beg")
        const cooldownTime = ms("1h");
        const amount = Math.round((Math.random() * 30) + 1);
        db.query(`SELECT * FROM beg WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, interaction.member.id], async (err, req) => {
            if(req.length < 1){
                db.query(`INSERT INTO beg (memberID, cooldown, guildID, id) VALUES (?, ?, ?, ?)`, [interaction.member.id, Date.now(), interaction.guild.id, id])
                functionAddMoney(interaction.member.id, interaction.guild.id, amount)
                return interaction.reply(`Vous venez de gagner ${amount} <:xenos_money:1021001754558615623> en mandiant.`);
            }else{
                const cooldown = req[0].cooldown; 

                if(Date.now() < parseInt(cooldownTime) + parseInt(cooldown)){
                    functionCooldown(cooldown, cooldownTime, interaction)
                }else{
                    db.query(`UPDATE beg SET cooldown = ? WHERE guildID = ? AND memberID = ?`,[Date.now(), interaction.guild.id, interaction.member.id], async (err, req) => {
                        functionAddMoney(interaction.member.id, interaction.guild.id, amount)
                        return interaction.reply(`Vous venez de gagner ${amount} <:xenos_money:1021001754558615623> en mandiant.`);
                    })
                }
            }
        })
	},
};