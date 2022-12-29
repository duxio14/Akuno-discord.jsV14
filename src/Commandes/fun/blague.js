const config = require('../../config/config.json')
const Discord = require("discord.js");
const BlaguesAPI = require('blagues-api');
module.exports = {
    name: "blague",
    description: "génère une blague.",
    category: "fun",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],

    async execute(interaction, client, db, emoji, color) {
        const blagues = new BlaguesAPI('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODM3OTcxNTM3ODM4OTk3NTQ0IiwibGltaXQiOjEwMCwia2V5IjoicUVsem5RR1hUT0JHc2pMdmhydTNyRzZrU3JhVWVzaDRXcDdkY0t4V2N5RWphR3NJSFAiLCJjcmVhdGVkX2F0IjoiMjAyMi0wOS0xNFQxNzowODowNCswMDowMCIsImlhdCI6MTY2MzE3NTI4NH0.zH579XxrydNAs05Wmkaz3oNXZY7Vo8pqdfD7hdrjc0Y');
        const blg = await blagues.random();
        
        const embed = new Discord.EmbedBuilder()
        .setColor(color)
        .setTitle(blg.type)
        .setDescription(`**Blague :** ${blg.joke}\n**Réponse :** ||${blg.answer}||`)

        interaction.reply({
            embeds: [embed]
        })
       
    }
}