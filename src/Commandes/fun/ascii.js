const figlet = require('figlet');
const Discord = require('discord.js');

module.exports = {

    name: "ascii",
    description: "Permet de modifier un message en ascii.",
    category: "fun",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    options: [
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "message",
            description: "Veuillez écrir le message que je dois répéter.",
            required: true
        }
    ],

    async execute(interaction, client, db, emoji, color) {
        const msg = interaction.options.getString('message');
        const maxNumber = 50;
        if(msg.length > maxNumber){
            return interaction.reply('Le maximum de caractère est 50 !')
        }

        figlet.text(
            msg,
            {
                font: ""
            },
            async(err, date)=> {
                interaction.reply(`\`\`\`${date}\`\`\``)
            }
        )
    }
}