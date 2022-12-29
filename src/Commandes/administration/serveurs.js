
const Discord = require('discord.js');

module.exports = {

  name: "serveurs",
  description: "Permet d'avoir la liste des serveurs où le bot est présent.",
  category: "administration",
  ownerOnly: true,
  userPerms: ["SendMessages"],
  botPerms: ["SendMessages"],
  options: [
    {
        type: Discord.ApplicationCommandOptionType.String,
        name: "choix",
        description: "Commande disponible pour le créateur",
        required: true
    },
    {
      type: Discord.ApplicationCommandOptionType.String,
        name: "serveur",
        description: "Veuillez envoyer l\'id, le nom complet du serveur.",
        required: false
    }
],

  async execute(interaction, client, db, emoji, color) {

    const choi = interaction.options.getString('choix');
    let serveur = interaction.options.getString('serveur') || "none";
    const choix = choi.toUpperCase();
    let guild;

    if (serveur !== "none") {
      serveur = serveur.split(" ").join("").toUpperCase();
      const fetched = client.guilds.cache.find(u => u.name.toUpperCase().split(" ").join("").includes(serveur) || u.id === serveur)
      
      if (fetched) {
        guild = fetched
      } else {
        return interaction.reply('Je n\'ai trouvé aucun serveurs !');
      }
    }

    if (choix === "QUITTER" && serveur !== "none") {

      await guild.leave();
      await interaction.reply(`J'ai bien quitter ${guild.name} (${guild.memberCount})`)
    } else if (choix === "LIST" && serveur === "none") {
      var str_filtrer = client.guilds.cache;

      let p0 = 0;
      let p1 = 10;
      let page = 1;


      const embed = new Discord.EmbedBuilder()
        .setColor(color)
        .setTitle(`Liste des \`serveurs\` (**${client.guilds.cache.size}**)`)
        .setDescription(str_filtrer.map(r => r).map((m, i) => `**${i + 1})** \`${m.name}\` (${m.id}) **[${m.memberCount}]**`).slice(p0, p1).join("\n"))
        .setFooter({
          text: `Total: ${str_filtrer.size} • ${client.user.username}`,
          iconURL: interaction.guild.iconURL(),
        })

      interaction.reply({
        embeds: [embed],
        fetchReply: true
      }).then(async tdata => {

        if (10 < str_filtrer.size) {

          const bts = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
            .setCustomId('allserv1')
            .setLabel("◀")
            .setStyle("Primary")
          ).addComponents(new Discord.ButtonBuilder()
            .setCustomId('allserv2')
            .setLabel("▶")
            .setStyle("Primary")
          );
          tdata.edit({
            embed: embed,
            components: [bts]
          })
          setTimeout(() => {
            tdata.edit("", {
              components: [],
              embed: new Discord.EmbedBuilder()
                .setTitle('Liste des serveurs')
                .setDescription(str_filtrer.map(r => r).map((m, i) => `**${i + 1})** \`${m.name}\` (${m.id}) **[${m.memberCount}]**`).slice(p0, p1).join("\n"))
                .setFooter({
                  text: `Total: ${str_filtrer.size} • ${client.user.username}`,
                  iconURL: interaction.guild.iconURL(),
                })
            })

          }, 60000 * 5)
          client.on("interactionCreate", (interaction) => {
            if (!interaction.isButton()) return

            if (interaction.customId === "allserv1") {

              interaction.deferUpdate();

              p0 = p0 - 10;
              p1 = p1 - 10;
              page = page - 1;

              if (p0 < 0) {
                p0 = p0 + 10;
                p1 = p1 + 10;
                return;
              }
              if (p0 === undefined || p1 === undefined) {
                return;
              }

              embed.setDescription(str_filtrer.map(r => r).map((m, i) => `**${i + 1})** \`${m.name}\` (${m.id}) **[${m.memberCount}]**`).slice(p0, p1).join("\n"))
                .setFooter({
                  text: `Total: ${str_filtrer.size} • ${client.user.username}`,
                  iconURL: interaction.guild.iconURL(),
                })
              tdata.edit({
                embeds: [embed]
              });

            }
            if (interaction.customId === "allserv2") {

              interaction.deferUpdate();

              p0 = p0 + 10;
              p1 = p1 + 10;

              page++;

              if (p1 > str_filtrer.size - 1 - 1 + 10) {
                p0 = p0 - 10;
                p1 = p1 - 10;
                return;
              }
              if (p0 === undefined || p1 === undefined) {
                return
              }

              embed.setDescription(str_filtrer.map(r => r).map((m, i) => `**${i + 1})** \`${m.name}\` (${m.id}) **[${m.memberCount}]**`).slice(p0, p1).join("\n"))
                .setFooter({
                  text: `Total: ${str_filtrer.size} • ${client.user.username}`,
                  iconURL: interaction.guild.iconURL(),
                })
              tdata.edit({
                embeds: [embed]
              });

            }
          })
        }

      })

    } else if (choix === 'INVITE' && serveur !== "none") {
      const tChannel = guild.channels.cache.find(ch => ch.type === Discord.ChannelType.GuildText && ch.permissionsFor(client.user.id).has("CreateInstantInvite"));
      if (!tChannel) {
        return interaction.reply(`Aucun salon trouvé pour \`créer une invitation du serveur\``);
      }
      const invite1 = await tChannel.createInvite({
        temporary: false,
        maxAge: 0
      })
      interaction.reply(invite1.url);
    } else {
      return interaction.reply(`Vous devez spécifier un serveur !`);
    }
  }
}