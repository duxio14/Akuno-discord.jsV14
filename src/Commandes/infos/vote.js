const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: 'vote',
    description: 'Permet de voter !',
    ownerOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    category: 'util',
    cooldown: 43000,

    async execute(interaction, client, db, emoji, color) {

                const embedJoin = new EmbedBuilder()
                .setTitle(`=> CLIQUEZ ICI <=`)
                .setThumbnail("https://zupimages.net/up/22/28/5v4c.jpeg")
                .setImage("https://zupimages.net/up/22/28/u59e.png")
                .setColor(color)
                .setURL("https://top.gg/bot/1016390807273611274/vote")
                
                const button = new ActionRowBuilder().addComponents([
                    new ButtonBuilder()
                        .setURL("https://discord.gg/SpyHGMZs")
                        .setStyle(ButtonStyle.Link)
                        .setLabel("SERVEUR OFFICIEL")
                ])
    
            interaction.reply({ embeds: [embedJoin], components: [button] })
            }
}