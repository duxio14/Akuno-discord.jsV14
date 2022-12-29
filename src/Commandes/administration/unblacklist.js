const Discord = require('discord.js');

module.exports = {

    name: "unbl",
    description: "Permet d'unblacklist un utilisateur",
    category: "administration",
    ownerOnly: false,
    crownOnly: true,
    userPerms: ["Administrator", "SendMessages"],
    botPerms: ["SendMessages"],
    options: [
        {
            type: Discord.ApplicationCommandOptionType.User,
            name: "membre",
            description: "Veuillez envoyer l'id du membre",
            required: true
        }
    ],

    async execute(interaction, client, db, emoji, color) {

        const member = interaction.options.getUser("membre");
    
        db.query(`SELECT * FROM blacklist WHERE ID = ?`, `${interaction.guild.id} ${member.id}`, async (err, req) => {
            if (req.length < 1) {
                interaction.reply('Cette utilisateur n\'est pas blacklist');
            }else{
                db.query(`DELETE FROM blacklist WHERE ID = ?`, `${interaction.guild.id} ${member.id}`, async (err, warn) => {
                    interaction.reply(`Cet utilisateur a bien été unblacklist.`)
                })
            }

        })
    }
}