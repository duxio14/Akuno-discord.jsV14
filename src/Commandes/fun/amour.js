const Discord = require("discord.js");
const love = require('discord_love');
module.exports = {
  name: "amour",
  description: "Un membre du serveur vas être associé à un autre comme Roméo et Juliette.",
  category: "fun",
  ownerOnly: false,
  fondateurOnly: false,
  userPerms: ["SendMessages"],
  botPerms: ["SendMessages"],


  async execute(interaction, client, db, emoji, color) {
    const romeo = (await interaction.guild.members.cache.filter(m => m.id !== "506895745270415391")).random();
    const juliette = (await interaction.guild.members.cache.filter(m => m.id !== romeo.id && !m.user.bot && m.id !== "506895745270415391")).random();

    const embed = new Discord.EmbedBuilder()
    .setColor(color)
    .setTitle('C\'est le grand amour comme Roméo et Juliette.')
    .setDescription(`${romeo}  a trouvé sa nouvelle Juliette : ${juliette}`)
    .setImage(love.hug())

    interaction.reply({embeds: [embed]})
  },
};