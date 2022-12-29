const Discord = require('discord.js');

module.exports = {

  name: "banlist",
    description: "Envoie la liste des bannissements du serveur.",
    category: "modération",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages", "BanMembers"],
    botPerms: ["SendMessages", "BanMembers"],

  async execute(interaction, client, db, emoji, color) {

    interaction.guild.bans.fetch()
      .then(bans => {
        const obj = bans.map(c => ({
          user: `\`\`\`${c.user.username}#${c.user.discriminator}\`\`\`<a:BWH_fleche_violet:970284199170965574> **${c.user.id}**`
        }));
        const bList = Array.from(obj);
        if (bList.length < 1) return interaction.reply(`Il n'y a aucun utilisateur bannis sur **${interaction.guild.name}**.`);

        const banlistembed = new Discord.EmbedBuilder()
          .setColor(color)
          .setTitle(`Liste des \`membres bannis\` (**${bList.length.toString()}**) de *${interaction.guild.name}* <:blurplemembers:970284198441140234>`)
          .setDescription(`${bList.map(bl => `\n${bl.user}`).join("")}`)

          .setTimestamp()

        interaction.reply({
          embeds: [banlistembed]
        })
      })
  }
}