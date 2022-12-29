const Discord = require('discord.js');
const config = require('../../config/config.json')

module.exports = {

    name: "unwarn",
    description: "Permet d'enlever un avertissement à un utilisateur.",
    category: "modération",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages", "ManageMessages"],
    botPerms: ["SendMessages"],
    options: [{
            type: Discord.ApplicationCommandOptionType.User,
            name: "membre",
            description: "Veuillez selectionner le membre à unwarn.",
            required: true
        },
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "warnid",
            description: "Veuillez envoyer l'id du warn. (faire la commande warnlist pour l'avoir)",
            required: true
        }
    ],


    async execute(interaction, client, db, emoji, color) {

        let member = interaction.options.getMember('membre');
        if(!member) return interaction.reply('Cet utilisateur n\'est pas dans le serveur !')
        let warnid = interaction.options.getString('warnid');

        if(member.id === config.client.id){
            return interaction.reply('Naturelement je n\'ai aucuns avertissements ^^');
        }

        db.query(`SELECT * FROM warns WHERE userID = ? AND guildID = ?`, [member.id, interaction.guild.id], async (err, warn) => {
            if (warn.length < 1) {
                return interaction.reply('Cette personne n\'a pas d\'avertissement.')
            }
            db.query(`SELECT * FROM warns WHERE userID = ? AND guildID = ? AND warnID = ?`, [member.id, interaction.guild.id, warnid], async (err, warn) => {
                if (warn.length < 1) {
                    return interaction.reply('Identifiant de warn invalide')
                }
                db.query(`DELETE FROM warns WHERE userID = ? AND guildID = ? AND warnID = ?`, [member.id, interaction.guild.id, warnid], async (err, warn) => {
                    if (err) return interaction.reply('Le warnId que vous avez écrit est incorrecte');
                    await interaction.reply(`J'ai bien enlevé le warn : ${warnid} à ${member}`);
                })
            })
        })

    }
}