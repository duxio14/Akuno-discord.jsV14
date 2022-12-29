
const Discord = require('discord.js');

module.exports = {

    name: "say",
    description: "Permet de faire dire un message au bot.",
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
        if(msg.length > 250){
            return interaction.reply('Le message est trop volumineux !')
        }

        await interaction.reply(msg);
    }
}