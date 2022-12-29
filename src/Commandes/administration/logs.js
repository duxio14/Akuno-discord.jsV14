
const Discord = require('discord.js')

module.exports = {

    name: "logs",
    description: "Créer le salon où seront envoyées les logs du serveur.",
    category: "administration",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["Administrator", "SendMessages"],
    botPerms: ["ManageChannels", "ViewAuditLog", "SendMessages"],

    async execute(interaction, client, db, emoji, color) {

        db.query(`SELECT * FROM channellogs WHERE guildID = ?`, [interaction.guild.id], async (err, req) => {

            let a = req.length

            if (a > 0) {
                return interaction.reply('Le salon des logs est déjà programmé.')
            }
            interaction.guild.channels.create({
                name: "Logs",
                reason: "",
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: [Discord.PermissionFlagsBits.ViewChannel],
                }, ],
            }).then((channel) => {
                db.query(`INSERT INTO channellogs (guildID, channelID) VALUES (?, ?)`, [interaction.guild.id, channel.id], async (err, req) => {
                    if (err) throw err;

                    channel.send('Les logs de ce serveur ont bien été configurées, si elles ne s\'envoient pas, assurez vous que le bot a les perms d\'acceder aux logs du serveur.')
                })
            })

            await interaction.reply(`Le salon des logs du serveur à bien été crée.`)
        })
    },
};