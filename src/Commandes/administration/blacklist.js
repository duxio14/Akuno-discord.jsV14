const Discord = require('discord.js');

module.exports = {

    name: "bl",
    description: "Permet de blacklist un utilisateur",
    category: "administration",
    ownerOnly: false,
    crownOnly: false,
    userPerms: ["Administrator", "SendMessages"],
    botPerms: ["BanMembers", "SendMessages"],
    options: [
        {
            type: Discord.ApplicationCommandOptionType.User,
            name: "membre",
            description: "Veuillez envoyer le membre",
            required: true
        }
    ],

    async execute(interaction, client, db, emoji, color) {

        let member = interaction.options.getUser("membre");
        if(!member){
            return interaction.reply('Identifiant invalide')
        }

        db.query(`SELECT * FROM blacklist WHERE ID = ?`, `${interaction.guild.id} ${member.id}`, async (err, req) => {

            if (req.length < 1) {
                db.query(`INSERT INTO blacklist (ID, guildID, memberID) VALUES (?, ?, ?)`, [`${interaction.guild.id} ${member.id}`, interaction.guild.id, member.id], async (err, req) => {
                    if(err) throw err;
                    interaction.guild.bans.create(member.id).then(() => {
                        interaction.reply(`${member} a bien été blacklist du serveur.`)
                    })
                })
            }else{
                interaction.reply('Cette utilisateur est déjà blacklist du serveur.')
            }

        })
    }
}