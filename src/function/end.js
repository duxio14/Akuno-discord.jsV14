const Discord = require("discord.js")

module.exports = async (embed) => {

   const Embed = new Discord.EmbedBuilder()
   .setColor("#ff0000")
   .setTitle("<:pepe_KMS:1020765252301901857> Commande annulée.")

   embed.edit({
    embeds: [Embed],
    components: []
   })
}

