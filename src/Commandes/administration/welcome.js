const Discord = require('discord.js')
const ms = require('ms');
const end = require('../../function/end')
module.exports = {

    name: "welcome",
    description: "Active ou désactive le message de bienvenu",
    category: "administration",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["Administrator", "SendMessages"],
    botPerms: ["SendMessages", "ViewAuditLog"],
    options: [{
        type: Discord.ApplicationCommandOptionType.Integer,
        name: "choix",
        description: "Activer/désactiver le message de bienvenu",
        required: true,
        choices: [{
                name: "Activer",
                value: 1
            },
            {
                name: "Désactiver",
                value: 2
            },
            {
                name: "Modifier",
                value: 3
            }
        ]
    }],


    async execute(interaction, client, db, emoji, color) {

        const rep = interaction.options.getInteger('choix');

        db.query(`SELECT * FROM welcome WHERE guildID = ?`, [interaction.guild.id], async (err, req) => {

            if (rep === 1) {
                if (req.length > 0) {
                    return interaction.reply('Le message de bienvenu est déjà activé sur ce serveur.')
                } else {
                    let filterM = i => i.author.id === interaction.user.id;

                    let collector = interaction.channel.createMessageCollector({
                        time: ms('30s'),
                        max: 1,
                        filter: filterM
                    })
                    const embed = new Discord.EmbedBuilder()
                    .setColor(color)
                    .setTitle("Welcome")
                    .setDescription(`**Salon :** \`Aucun salon définis\`\nVeuillez **envoyer l'identifient** du salon où seront envoyer les **messages de bienvenu**.`)

                    interaction.reply({ embeds: [embed], fetchReply: true}).then(async msg => {

                        collector.on('collect', async c => {
                            let reponse = c.content;
                            if (!interaction.guild.channels.cache.get(reponse)) {
                                return interaction.message.send("Ceci n'est pas un salon valide !")
                            } else {
                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setTitle('Welcome')
                                .setDescription(`**Salon :** \`${reponse}\``)
                                db.query(`INSERT INTO welcome (guildID, channelID) VALUES (?, ?)`, [interaction.guild.id, reponse], async (err, req) => {
                                    if (err) throw err;
                                    msg.edit({embeds: [embed2]}).then(() => {
                                        c.delete();
                                    })
                                })
                            }
                        })
                        collector.on("end", async (collected, reason) => {
                            if (reason && reason === "time") {   
                                return
                            }
                        });
                    })
                }
            } else if (rep === 2) {
                if (req.length < 1) {
                    return interaction.reply('Le message de bienvenu n\'est pas activé sur ce serveur.')
                } else {
                    db.query(`DELETE FROM welcome WHERE guildID = ?`, [interaction.guild.id], async (err, warn) => {
                        if (err) throw err;
                        interaction.reply(`J'ai bien désactivé le message de bienvenu sur ce serveur.`)
                    })
                }
            }
             else if (rep === 3) {
                if (req.length < 1) {
                    return interaction.reply('Le message de bienvenu n\'est pas activé sur ce serveur, pour l\'activer, cliquer sur activer.')
                } else {
                    let filterM = i => i.author.id === interaction.user.id;

                    let collector = interaction.channel.createMessageCollector({
                        time: ms('30s'),
                        max: 1,
                        filter: filterM
                    })
                    const channel = await interaction.guild.channels.cache.get(req[0].channelID);
                    const embed = new Discord.EmbedBuilder()
                    .setColor(color)
                    .setTitle("Welcome")
                    .setDescription(`**Salon :** ${channel}\nVeuillez **envoyer l'identifient** du salon où seront envoyer les **messages de bienvenu**.`)

                    interaction.reply({ embeds: [embed], fetchReply: true}).then(async msg => {

                        collector.on('collect', async c => {
                            let reponse = c.content;
                            if (!interaction.guild.channels.cache.get(reponse)) {
                                return interaction.message.send("Ceci n'est pas un salon valide !")
                            } else {
                                const channel = interaction.guild.channels.cache.get(reponse);
                                const embed2 = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setTitle('Welcome')
                                .setDescription(`**Salon :** ${channel}`)
                                db.query(`UPDATE welcome SET channelID = ? WHERE guildID = ?`,[reponse, interaction.guild.id],  async (err, req) => {
                                    if (err) throw err;
                                    msg.edit({embeds: [embed2]}).then(() => {
                                        c.delete();
                                    })
                                })
                            }
                        })
                        collector.on("end", async (collected, reason) => {
                            if (reason && reason === "time") {   
                                return
                            }
                        });
                    })
                }
            }
        })
    },
};