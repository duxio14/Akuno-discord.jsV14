
const Discord = require('discord.js')
const ms = require('ms')

module.exports = {

    name: "warnlist",
    description: "Permet d'avoir la liste des avertissements d'un utilisateur.",
    category: "modération",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages", "ManageMessages"],
    botPerms: ["SendMessages"],
    options: [{
        type: Discord.ApplicationCommandOptionType.User,
        name: "membre",
        description: "Veuillez selectionner le membre à qui vous voulez avoir les informations de ses avertissements.",
        required: true
    }
],

    async execute(interaction, client, db, emoji, color) {

        let totalwarn;
        const member = interaction.options.getMember("membre") || interaction.member;
        const usericon = member.user.avatarURL();

        db.query(`SELECT * FROM warns WHERE userID = ? AND guildID = ?`, [member.id, interaction.guild.id], async (err, warn) => {
            totalwarn = warn.length;

            if (totalwarn < 1) totalwarn = "0 avertissement, bien joué (づ｡◕‿‿◕｡)づ"
            if (totalwarn === 1) totalwarn = "1 avertissement."
            if (totalwarn > 1) totalwarn = totalwarn + " avertissements";


            let embedPrincipal = new Discord.EmbedBuilder()
                .setColor(color)
                .setTitle(`Avertissements de ${member.user.username}`)
                .setDescription(`Ce membre compte actuelement à son actif \`${totalwarn}\`\nPour **plus d'informations** appuyez sur le **bouton en bas**`)
                .setThumbnail(usericon)

            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
                .setCustomId("warn")
                .setLabel("Inormations")
                .setDisabled(warn.length >= 1 ? false : true)
                .setStyle("Primary"),
            )

            let msg = await interaction.reply({
                embeds: [embedPrincipal],
                components: [btn]
            })

            let filterM = i => i.user.id === interaction.user.id

            let collector = interaction.channel.createMessageComponentCollector({
                time: ms('30s'),
                max: 1,
                filter: filterM
            })

            collector.on('collect', async (button) => {

                if (button.customId === "warn") {


                    await button.deferUpdate()
                    let description = "";

                    let newEmbed = new Discord.EmbedBuilder()
                        .setColor('DARK_BLUE')
                        .setTitle(`Avertissements de ${member.user.username}`)
                        .setThumbnail(member.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTimestamp()
                       
                      



                    await button.editReply({
                        embeds: [newEmbed],
                        components: []
                    })
                    for (let i = 0; i < warn.length; i++) {
                        description += `**Avertissement n°${i+1}**\n\n> **Auteur** : ${client.users.cache.get(warn[i].authorID)}\n> **Raison** : ${warn[i].reason}\n> **Date** : <t:${Math.floor(parseInt(warn[i].date) / 1000)}:F>\nID de l'avertissement : \`${warn[i].warnID}\`\n\n`;
                    }


                    newEmbed.setDescription(description)
                    await interaction.editReply({
                        embeds: [newEmbed]
                    })
                }
            })


        })
    }
}