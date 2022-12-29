
const Discord = require('discord.js');

module.exports = {

    name: "antibot",
    description: "Active ou désactive l'antibot",
    category: "administration",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["Administrator", "SendMessages"],
    botPerms: ["KickMembers", "SendMessages"],
    options: [{
        type: Discord.ApplicationCommandOptionType.Integer,
        name: "choix",
        description: "Activer/désactiver l'antibot",
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

        db.query(`SELECT * FROM antibot WHERE guildID = ?`, [interaction.guild.id], async (err, req) => {

            if(rep === 1){
                if (req.length > 0) {
                    return interaction.reply('L\'antibot est déjà activé sur ce serveur.')
                }else{
                    db.query(`INSERT INTO antibot (guildID) VALUES (?)`, [interaction.guild.id], async (err, req) => {
                        if(err) throw err;
                        interaction.reply(`J'ai bien activé l'antibot sur ce serveur.`)
                    })
                }
            }else if(rep === 2){
                if (req.length < 1) {
                    return interaction.reply('L\'antibot n\'est pas activé sur ce serveur.')
                }else{
                    db.query(`DELETE FROM antibot WHERE guildID = ?`, [interaction.guild.id], async (err, warn) => {
                        if(err) throw err;
                        interaction.reply(`J'ai bien désactivé l'antibot sur ce serveur.`)
                    })
                }
            }
        })
    },
};