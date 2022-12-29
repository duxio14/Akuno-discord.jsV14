
const Discord = require('discord.js')


module.exports = {

    name: "allbot",
    description: "Envoie la liste de tout les bots présent sur le serveur.",
    category: "administration",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    async execute(interaction, client, db, emoji, color) {

        var str_filtrer = interaction.guild.members.cache.filter(member => member.user.bot); // bots
        if (str_filtrer.size === 0 || undefined || false || null) return interaction.reply("Aucun bot présents");

        let p0 = 0;
        let p1 = 10;
        let page = 1;

        const embed = new Discord.EmbedBuilder()
            .setTitle('Liste des bots présents')
            .setDescription(str_filtrer
                .map(r => r)
                .filter(x => interaction.guild.members.cache.get(x.user.id))
                .map((m, i) => `${i+1}) ${m.user} (${m.user.id})`)
                .slice(p0, p1).join('\n')
            )
            .setColor(color)
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
                    .setCustomId('allbot1')
                    .setLabel("◀")
                    .setStyle("Primary")
                ).addComponents(new Discord.ButtonBuilder()
                    .setCustomId('allbot2')
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
                            .setTitle('Liste des bots présents')
                            .setDescription(str_filtrer
                                .map(r => r)
                                .filter(x => interaction.guild.members.cache.get(x.user.id))
                                .map((m, i) => `${i+1}) ${m.user} (${m.user.id})`)
                                .slice(p0, p1).join('\n')
                            )
                            .setColor(color)
                            .setFooter({
                                text: `Total: ${str_filtrer.size} • ${client.user.username}`,
                                iconURL: interaction.guild.iconURL(),
                            })

                    })

                }, 60000 * 5)
                client.on("interactionCreate", (interaction) => {
                    if (!interaction.isButton()) return

                    if (interaction.customId === "allbot1") {

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

                        embed.setDescription(str_filtrer
                                .map(r => r)
                                .filter(x => interaction.guild.members.cache.get(x.user.id))
                                .map((m, i) => `${i+1}) ${m.user} (${m.user.id})`)
                                .slice(p0, p1).join('\n')
                            )
                            .setColor(color)
                            .setFooter({
                                text: `Total: ${str_filtrer.size} • ${client.user.username}`,
                                iconURL: interaction.guild.iconURL(),
                            })
                        tdata.edit({
                            embeds: [embed]
                        });

                    }
                    if (interaction.customId === "allbot2") {

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

                        embed.setDescription(str_filtrer
                                .map(r => r)
                                .filter(x => interaction.guild.members.cache.get(x.user.id))
                                .map((m, i) => `${i+1}) ${m.user} (${m.user.id})`)
                                .slice(p0, p1).join('\n')
                            )
                            .setColor(color)
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
    }
}