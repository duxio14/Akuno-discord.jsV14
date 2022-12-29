const ms = require('ms')
const Discord = require('discord.js')
const functionCooldown = require('../../function/cooldown')
const functionAddMoney = require('../../function/addmoney')
const functionID = require('../../function/createID')

module.exports = {

	name: "work",
	description: "Travaillez et gagner votre salaire !",
	category: "economie",
	ownerOnly: false,
	fondateurOnly: false,
	userPerms: ["SendMessages"],
	botPerms: ["SendMessages"],

	async execute(interaction, client, db, emoji, color) {
        const id = await functionID("money")
        const cooldownTime = ms("1h");
        const money = Math.round((Math.random() * 200) + 50);
        const msg = money < 100 ? `${money} <:xenos_money:1021001754558615623> en travaillant ! Tâchez de travaillez plus dur à l'avenir...` : money > 200 ? `${money} <:xenos_money:1021001754558615623> en travaillant ! Petite prime de votre employeur.` : `${money} <:xenos_money:1021001754558615623> de travail ! Voici un salaire normal et respectable.`
        db.query(`SELECT * FROM work WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, interaction.member.id], async (err, req) => {
            if(req.length < 1){
                db.query(`INSERT INTO work (guildID, memberID, cooldown, id) VALUES (?, ?, ?, ?)`, [interaction.guild.id, interaction.member.id, Date.now(), id])
                functionAddMoney(interaction.member.id, interaction.guild.id, money)
                return interaction.reply(`Vous venez de gagner ${msg}`);
            }else{
                const cooldown = req[0].cooldown; 
                
                if(Date.now() < (parseInt(cooldownTime) + parseInt(cooldown))){
                    functionCooldown(cooldown, cooldownTime, interaction)
                }else{
                    db.query(`UPDATE work SET cooldown = ? WHERE guildID = ? AND memberID = ?`,[Date.now(), interaction.guild.id, interaction.member.id], async (err, req) => {
                        functionAddMoney(interaction.member.id, interaction.guild.id, money)
                        return interaction.reply(`Vous venez de gagner ${msg}`);
                    })
                }
            }
        })
	},
};