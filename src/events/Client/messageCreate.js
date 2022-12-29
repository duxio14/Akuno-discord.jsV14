const db = require("../../database/database");
const Discord = require('discord.js');

module.exports = {
    name: 'messageCreate',
    /**
     * 
     * @param {Discord.Interaction} interaction 
     */
    async execute(message, client) {


        if (message.author.bot) return;

        if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
            const embed = new Discord.EmbedBuilder()
                .setColor("DarkAqua")
                .setTitle('Je suis bien en ligne !')
                .setDescription(`Mon préfix, **eh bien je n'en ai pas** x)\nJe fonctionne avec les **slashCommandes** ( / )\nJe possède à mon actif des commande de **modération, d'administration, d'information et de fun** :)\n\nJe suis là pour vous **rendre la vie plus facile** ^^\nPour plus d'information je vous invite à utiliser ma comande : \`help\`.`)
            message.reply({
                embeds: [embed]
            })
        }



        db.query(`SELECT * FROM antilink WHERE guildID = ?`, message.guild.id, async (err, req) => {

            if(req.length > 0){

            if (message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return

            const antilinkB = [
                ".com",
                "https://",
                "http://",
                "discord.gg/"
            ]

            for (let i = 0; i < antilinkB.length; i++) {

                if (message.content.includes(antilinkB[i])) {
                    message.delete();
                }

            }
        }

        })

        const test = Math.round(Math.random() * 5)

        const reactB = [
            "salut",
            "Salut",
            "bonjour",
            "Bonjour",
            "bonsoir",
            "Bonsoir",
            "ca va ?",
            "ça va ?",
            "yo",
            "Yo"
        ]
        if (test === 1) {
            for (let i = 0; i < reactB.length; i++) {
                if (message.content.includes(reactB[i])) {
                    message.react("<:PepeHello:1017882013052711034>")
                }
            }
        }
    }
}