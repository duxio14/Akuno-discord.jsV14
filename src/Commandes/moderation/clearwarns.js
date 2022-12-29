const Discord = require('discord.js');
module.exports = {

    name: "clearwarns",
    description: "Permet de supprimer tout les avertissements d'un membre.",
    category: "modération",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages", "ManageMessages"],
    botPerms: ["SendMessages"],
    options: [{
        type: Discord.ApplicationCommandOptionType.User,
        name: "membre",
        description: "Veuillez selectionner le membre.",
        required: true
    }],

    async execute(interaction, client, db, emoji, color) {

        const member = interaction.options.getMember("membre");

        db.query(`SELECT * FROM warns WHERE userID = ? AND guildID = ?`, [member.id, interaction.guild.id], async (err, req) => {

            if (req.length < 1) {
                return interaction.reply('Cet utilisateur n\'a pas d\'avertissement n\'avez pas de warn.')
            } else {
                db.query(`DELETE FROM warns WHERE userID = ? AND guildID = ?`, [member.id, interaction.guild.id], async (err, warn) => {
                    interaction.reply(`J'ai bien **enlevé** tout les avertissements de **${member.user.username}**.`)
                })
            }
        })

    }
}