const Discord = require("discord.js");
const ms = require('ms');
const end = require('../../function/end')
module.exports = {
    name: "pm",
    description: "Jeux du plus ou moin.",
    category: "fun",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: [""],
    botPerms: [""],


    async execute(interaction, client, db, emoji, color) {


        const startembed = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle('Êtes vous courageux ?')
            .setDescription('Veuillez choisir le niveau de dificulté du plusOuMoin.')
        const btn = new Discord.ActionRowBuilder()
            .addComponents(new Discord.ButtonBuilder()
                .setCustomId("pm1")
                .setLabel("Facile")
                .setStyle(Discord.ButtonStyle.Success),
            )
            .addComponents(new Discord.ButtonBuilder()
                .setCustomId("pm2")
                .setLabel("Moyen")
                .setStyle(Discord.ButtonStyle.Secondary),
            )
            .addComponents(new Discord.ButtonBuilder()
                .setCustomId("pm3")
                .setLabel("Difficile")
                .setStyle(Discord.ButtonStyle.Danger),
            )
        interaction.reply({
            embeds: [startembed],
            components: [btn],
            fetchReply: true
        })
       
            client.on("interactionCreate", async (interaction) => {
                if (!interaction.isButton()) return;
                if (interaction.customId === "pm1") {
                    await interaction.deferUpdate();
                    const number = Math.floor(Math.random() * Math.floor(100))
                    console.log(number)
                    let essais = 10;
                    const embed = new Discord.EmbedBuilder()
                        .setColor(color)
                        .setTitle('Plus ou moin niveau : facile')
                        .setDescription("C'est partie, jouons au jeux du plusOuMoin avec un niveau de difficulté facile !\nJ'ai bien choisis un nombre compris entre 0 et 100 ! Vous avez 10 essais, à vous de le trouver.\nveuillez tenter votre premiere tentative.\nPour arréter la partie, envoyer \"annuler\"")
                    interaction.message.edit({
                        embeds: [embed],
                        components: []
                    })
                    let filterM = i => i.author.id === interaction.user.id;
                    let collector = interaction.channel.createMessageCollector({
                        time: ms('45s'),
                        max: 10,
                        filter: filterM
                    })
                    collector.on("collect", async collected => {
                        console.log(collected.content.toLowerCase())
                        if (collected.content.toLowerCase() === "annuler") {
                            return collector.stop(`Commande annulée !`);
                        } else {
                            let response = await collected.content.trim();
                            response = parseInt(response);
                            if (isNaN(response)) {
                                return interaction.channel.send("Ce n'est pas un nombre !")
                            }
                            if(response < 0 || response > 100){
                                return interaction.channel.send('Calmez vous ! Nous sommes en difficulté facile, j\'ai choisis un nombre compris entre 0 et 100.')
                            }
                            if (response == number) {
                                await collector.stop(`Bravo ! Le nombre était: **${number}**`);
                            }
                            if (response > number) {
                                interaction.channel.send(`Le nombre est plus petit ! Il vous reste ${essais == 1 ? essais - 1 + "essai" : essais - 1 + "essais"}`)
                                essais--
                            }
                            if (response < number) {
                                interaction.channel.send(`Le nombre est plus grand !  Il vous reste ${essais == 1 ? essais - 1 + "essai" : essais - 1 + "essais"}`)
                                essais--
                            }
                        }
                    })
                    collector.on("end", async (collected, reason) => {
                        if (reason && reason !== "time") {
                            return interaction.channel.send(reason === "limit" ? "Vous avez utilisé tous vos essais ! Le nombre été : " + number : reason);
                        } else {
                           end(interaction.message)
                        }
                    });
                } else if (interaction.customId === "pm2") {
                    await interaction.deferUpdate();
                    const number = Math.floor(Math.random() * Math.floor(250))
                    console.log(number)
                    let essais = 10;
                    const embed = new Discord.EmbedBuilder()
                        .setColor(color)
                        .setTitle('Plus ou moin niveau : moyen')
                        .setDescription("C'est partie, jouons au jeux du plusOuMoin avec un niveau de difficulté moyen !\nJ'ai bien choisis un nombre compris entre \`0 et 250\` ! Vous avez **10 essais**, à vous de le trouver.\nveuillez tenter votre premiere tentative.\nPour arréter la partie, envoyer \"annuler\"")
                    interaction.message.edit({
                        embeds: [embed],
                        components: []
                    })
                    let filterM = i => i.author.id === interaction.user.id;
                    let collector = interaction.channel.createMessageCollector({
                        time: ms('45s'),
                        max: 10,
                        filter: filterM
                    })
                    collector.on("collect", async collected => {
                        if (collected.content.toLowerCase() === "annuler") {
                            return collector.stop(`Commande annulée !`);
                        } else {
                            let response = await collected.content.trim();
                            response = parseInt(response);
                            if (isNaN(response)) {
                                return interaction.channel.send("Ce n'est pas un nombre !")
                            }
                            if(response < 0 || response > 250){
                                return interaction.channel.send('Calmez vous ! Nous sommes en difficulté moyenne, j\'ai choisis un nombre compris entre 0 et 250.')
                            }
                            if (response == number) {
                                await collector.stop(`Bravo ! Le nombre était: **${number}**`);
                            }
                            if (response > number) {
                                interaction.channel.send(`Le nombre est plus petit ! Il vous reste ${essais == 1 ? essais - 1 + "essai" : essais - 1 + "essais"}`)
                                essais--
                            }
                            if (response < number) {
                                interaction.channel.send(`Le nombre est plus grand !  Il vous reste ${essais == 1 ? essais - 1 + "essai" : essais - 1 + "essais"}`)
                                essais--
                            }
                        }
                    })
                    collector.on("end", async (collected, reason) => {
                        if (reason && reason !== "time") {
                            return interaction.channel.send(reason === "limit" ? "Vous avez utilisé tous vos essais ! Le nombre été : " + number : reason);
                        } else {
                            end(interaction.message)
                        }
                    });
                } else if (interaction.customId === "pm3") {
                    await interaction.deferUpdate();
                    const number = Math.floor(Math.random() * Math.floor(300))
                    console.log(number)
                    let essais = 7;
                    const embed = new Discord.EmbedBuilder()
                        .setColor(color)
                        .setTitle('Plus ou moin niveau : difficile')
                        .setDescription("C'est partie, jouons au jeux du plusOuMoin avec un niveau de difficulté difficile !\nJ'ai bien choisis un nombre compris entre \`0 et 300\` ! Vous avez **7 essais**, à vous de le trouver.\nveuillez tenter votre premiere tentative.\nPour arréter la partie, envoyer \"annuler\"")
                    interaction.message.edit({
                        embeds: [embed],
                        components: []
                    })
                    let filterM = i => i.author.id === interaction.user.id;
                    let collector = interaction.channel.createMessageCollector({
                        time: ms('45s'),
                        max: 7,
                        filter: filterM
                    })
                    collector.on("collect", async collected => {
                        if (collected.content.toLowerCase() === "annuler") {
                            return collector.stop(`Commande annulée !`);
                        } else {
                            let response = await collected.content.trim();
                            response = parseInt(response);
                            if (isNaN(response)) {
                                return interaction.channel.send("Ce n'est pas un nombre !")
                            }
                            if(response < 0 || response > 300){
                                return interaction.channel.send('Calmez vous ! Nous sommes en difficulté moyenne, j\'ai choisis un nombre compris entre 0 et 250.')
                            }
                            if (response === number) {
                                await collector.stop(`Bravo ! Le nombre était: **${number}**`);
                            }
                            if (response > number) {
                                interaction.channel.send(`Le nombre est plus petit ! Il vous reste ${essais == 1 ? essais - 1 + "essai" : essais - 1 + "essais"}`)
                                essais--
                            }
                            if (response < number) {
                                interaction.channel.send(`Le nombre est plus grand !  Il vous reste ${essais == 1 ? essais - 1 + "essai" : essais - 1 + "essais"}`)
                                essais--
                            }
                        }
                    })
                    collector.on("end", async (collected, reason) => {
                        if (reason && reason !== "time") {
                            return interaction.channel.send(reason === "limit" ? "Vous avez utilisé tous vos essais ! Le nombre été : " + number : reason);
                        } else {
                            end(interaction.message)
                        }
                    });
                }
            })
        
    },

};