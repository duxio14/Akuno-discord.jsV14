
const Discord = require("discord.js");

module.exports = {
  name: "chance",
  description: "Un membre du serveur vas être associé à une phrase tirée au sort.",
  category: "fun",
  ownerOnly: false,
  fondateurOnly: false,
  userPerms: ["SendMessages"],
  botPerms: ["SendMessages"],

  async execute(interaction, client, db, emoji, color) {

    const member = (await interaction.guild.members.fetch()).random();

    const message = [
      "est vraiment stupide !",
      "est trop bête !",
      "va vite regretté d'avoir fait cette commande car, je ne l'aime pas.",
      "est aussi louche que l'inspecteur gadget.",
      "est le plus gros charo que je connaisse.",
      "est mon pire ennemi ):",
      "est le plus détesté du serveur.",
      "est moche.",
      "n'a même pas l'âge d'utilisé Discord.",
      "est très intelligent.",
      "est très beau.",
      "est mon préféré :)",
      "est mon chouchou.",
      "à l'air très drôle.",
      "n'est pas hétéro",
      "est con",
      "est trans",
    ]

    let result = Math.floor((Math.random() * message.length));

    let embed = new Discord.EmbedBuilder()
      .setColor(color)
      .setTitle("Chance ?")
      .setDescription(`${member} \`${message[result]}\``)

    await interaction.reply({
      embeds: [embed]
    })
  },
};