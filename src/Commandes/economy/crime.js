const ms = require('ms')
const Discord = require('discord.js')
const functionCooldown = require('../../function/cooldown')
const functionAddMoney = require('../../function/addmoney')
const functionRemoveMoney = require('../../function/removemoney')
const functionC = require('../../function/createID')

module.exports = {

    name: "crime",
    description: "aurez vous le courage de cambrioler la maison d'un inconnu ?",
    category: "economie",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],

    async execute(interaction, client, db, emoji, color) {
        const id = await functionC("crime")
        const cooldownTime = ms("6h");
        let amount = Math.round((Math.random() * 250) + 400)
        db.query(`SELECT * FROM money WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, interaction.member.id], async (err, thune) => {
            if(thune.length < 1){
                return interaction.reply(`Vous n'avez aucun argent !`)
            }
            if(thune[0].money < 1000){
                return interaction.reply("Vous devez avoir au moin 1000 <:xenos_money:1021001754558615623> pour faire un crime ! Si vous n'avez pas l'argent pour payer la caution, vous irez en prison...")
            }
            db.query(`SELECT * FROM crime WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, interaction.member.id], async (err, req) => {
                const win = Math.round(Math.random() + 1)
                console.log(win);
                if (req.length < 1) {
                    db.query(`INSERT INTO crime (memberID, cooldown, guildID, id) VALUES (?, ?, ?, ?)`, [interaction.member.id, Date.now(), interaction.guild.id, id])
                    if (win === 1) {
                        functionAddMoney(interaction.member.id, interaction.guild.id, amount)
                        return interaction.reply(`Vous venez de gagner ${amount} <:xenos_money:1021001754558615623> en combriolant la maison d'un pauvre innocent.\nJ'espère qu'il se vangera !`);
                    } else {
                        let tamount = thune[0].money;
                        if (tamount > 10000) {
                            functionRemoveMoney(interaction.member.id, interaction.guild.id, amount)
                            return interaction.reply(`Vous venez de perdre ${amount} <:xenos_money:1021001754558615623> ! En voulant cambrioler une vieille femme, celle ci s'est avérée être plus coriace que vous...`);
                        } else {
                            functionRemoveMoney(interaction.member.id, interaction.guild.id, (parseInt(amount) / 10) + 50)
                            return interaction.reply(`Vous venez de perdre ${amount} <:xenos_money:1021001754558615623> en vous faisant attraper par un bandit en voulant le cambrioler ! Sa rançon sera pire la prochaine fois !`);
                        }
                    }
                } else {
                    const cooldown = req[0].cooldown;

                    if (Date.now() < parseInt(cooldownTime) + parseInt(cooldown)) {
                        functionCooldown(cooldown, cooldownTime, interaction)
                    } else {
                        db.query(`UPDATE crime SET cooldown = ? WHERE guildID = ? AND memberID = ?`, [Date.now(), interaction.guild.id, interaction.member.id], async (err, req) => {
                            if (win === 1) {
                                functionAddMoney(interaction.member.id, interaction.guild.id, amount)
                                return interaction.reply(`Vous venez de gagner ${amount} <:xenos_money:1021001754558615623> en combriolant la maison d'un pauvre innocent.\nJ'espere qu'il se vangera !`);
                            } else {
                                let tamount = thune[0].money;
                                if (tamount > 10000) {
                                    functionRemoveMoney(interaction.member.id, interaction.guild.id, amount)
                                    return interaction.reply(`Vous venez de perdre ${amount} <:xenos_money:1021001754558615623> ! En voulant cambrioler une vieille femme, celle ci s'est avérée être plus coriace que vous...`);
                                } else {
                                    functionRemoveMoney(interaction.member.id, interaction.guild.id, (parseint(amount) / 10) + 50)
                                    return interaction.reply(`Vous venez de perdre ${amount} <:xenos_money:1021001754558615623> en vous faisant attraper par un bandit en voulant le cambrioler ! Sa rançon sera pire la prochaine fois !`);
                                }
                            }
                        })
                    }
                }
            })
        })
    },
};