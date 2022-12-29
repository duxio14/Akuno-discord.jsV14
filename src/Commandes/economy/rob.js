const ms = require('ms')
const Discord = require('discord.js')
const functionCooldown = require('../../function/cooldown')
const functionAddMoney = require('../../function/addmoney')
const functionID = require('../../function/createID')
const functionRemoveMoney = require('../../function/removemoney')

module.exports = {

    name: "rob",
    description: "Volez de l'argent aux autres joueurs !",
    category: "economie",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    options: [{
        type: Discord.ApplicationCommandOptionType.User,
        name: "membre",
        description: "Le membre",
        required: true
    }],

    async execute(interaction, client, db, emoji, color) {
        const member = interaction.options.getMember('membre');
        if (!member) return interaction.reply({
            content: "Ce membre n'est pas dans le serveur !",
            ephemeral: true
        })
        const id = await functionID("rob")
        let thune;
        const cooldownTime = ms("1h");
        if (member.id === interaction.member.id) {
            return interaction.reply("Vous ne pouvez pas vous voler !")
        }
        db.query(`SELECT * FROM money WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, member.id], async (err, req) => {
            db.query(`SELECT * FROM rob WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, interaction.member.id], async (err, rob) => {
                db.query(`SELECT * FROM lvl WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, interaction.member.id], async (err, lvl) => {
                    if (lvl.length < 1) {
                        thune = Math.round((Math.random() * 50) + 25);
                    } else if (lvl[0].lvl < 20 && lvl[0].lvl > 0) {
                        thune = Math.round((Math.random() * 50) + 75);

                    } else if (lvl[0].lvl < 40 && lvl[0].lvl > 19) {
                        thune = Math.round((Math.random() * 50) + 150);

                    } else if (lvl[0].lvl < 60 && lvl[0].lvl > 39) {
                        thune = Math.round((Math.random() * 50) + 250);

                    } else if (lvl[0].lvl < 80 && lvl[0].lvl > 59) {
                        thune = Math.round((Math.random() * 50) + 400);

                    } else if (lvl[0].lvl < 100 && lvl[0].lvl > 79) {
                        thune = Math.round((Math.random() * 50) + 500);
                    } else if (lvl[0].lvl === 100) {
                        thune = Math.round((Math.random() * 50) + 650);
                    }
                    if (req.length < 1 || req[0].money < 25 || req[0].money < thune) {
                        if (req.length < 1) {
                            return interaction.reply(`${member} n'a aucun argents à voler !.`)
                        } else if (req[0].money < thune) {
                            thune = (parseInt(req[0].money) / 2)
                        } else {
                            return interaction.reply(`${member} n'a pas asser d'argents à voler !`);
                        }
                    } 
                        if (rob.length < 1) {
                            db.query(`INSERT INTO rob (memberID, cooldown, guildID, id) VALUES (?, ?, ?, ?)`, [interaction.member.id, Date.now(), interaction.guild.id, id])
                            functionAddMoney(interaction.member.id, interaction.guild.id, thune)
                            functionRemoveMoney(member.id, interaction.guild.id, thune)
                            return interaction.reply(`Vous venez de voler ${thune} <:xenos_money:1021001754558615623> à ${member}.\nSe vengera-t-il, je l'espère !`);
                        } else {

                            const cooldown = rob[0].cooldown;

                            if (Date.now() < parseInt(cooldownTime) + parseInt(cooldown)) {
                                functionCooldown(cooldown, cooldownTime, interaction)
                            } else {
                                db.query(`UPDATE rob SET cooldown = ? WHERE guildID = ? AND memberID = ?`, [Date.now(), interaction.guild.id, interaction.member.id], async (err, req) => {
                                    functionAddMoney(interaction.member.id, interaction.guild.id, thune)
                                    functionRemoveMoney(member.id, interaction.guild.id, thune)
                                    return interaction.reply(`Vous venez de voler ${thune} <:xenos_money:1021001754558615623> à ${member}.\nSe vengera-t-il, je l'espère !`);
                                })
                            }
                        }
                    
                })
            })
        })
    },
};