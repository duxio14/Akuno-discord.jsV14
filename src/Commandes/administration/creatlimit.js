
const Discord = require('discord.js')

module.exports = {

    name: "creatlimit",
    description: "Active ou désactive le creatlimit",
    category: "administration",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["Administrator", "SendMessages"],
    botPerms: ["KickMembers", "SendMessages"],
    options: [{
        type: Discord.ApplicationCommandOptionType.Integer,
        name: "choix",
        description: "Activer/désactiver le creatlimit",
        required: true,
        choices: [{
                name: "Activer",
                value: 1
            },
            {
                name: "Désactiver",
                value: 2
            }
        ]
    }],


    async execute(interaction, client, db, emoji, color) {

        const rep = interaction.options.getInteger('choix');

        db.query(`SELECT * FROM creatlimit WHERE guildID = ?`, [interaction.guild.id], async (err, req) => {

            if(rep === 1){
                if (req.length > 0) {
                    return interaction.reply('Le creatlimit est déjà activé sur ce serveur.')
                }else{
                    db.query(`INSERT INTO creatlimit (guildID) VALUES (?)`, [interaction.guild.id], async (err, req) => {
                        if(err) throw err;
                        interaction.reply(`J'ai bien activé le creatlimit sur ce serveur.\nCela veut dire que si une personne a crée son compte Discord il y a moin de 30 minutes, elle sera immédiatement expulsée du serveur.\n(comande prochainement modifiable))`)
                    })
                }
            }else if(rep === 2){
                if (req.length < 1) {
                    return interaction.reply('Le creatlimit n\'est pas activé sur ce serveur.')
                }else{
                    db.query(`DELETE FROM creatlimit WHERE guildID = ?`, [interaction.guild.id], async (err, warn) => {
                        if(err) throw err;
                        interaction.reply(`J'ai bien désactivé le creatlimit sur ce serveur.`)
                    })
                }
            }
        })
    },
};