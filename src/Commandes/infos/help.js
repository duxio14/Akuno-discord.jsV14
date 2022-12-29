const Discord = require('discord.js')



module.exports = {

    name: "help",
    description: "Envoie toute les commandes et informations du bot",
    category: "information",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    options: [{
        type: Discord.ApplicationCommandOptionType.Integer,
        name: "choix",
        description: "Vous permet de choisir la disposition du message d'help.",
        required: true,
        choices: [{
                name: "Menu",
                value: 1
            },
            {
                name: "Une page",
                value: 2
            }
        ]
    }],

    async execute(interaction, client, db, emoji, color) {

        const choix = interaction.options.getInteger('choix');
        const commandSize = client.slashCommands.size
        const commands = client.slashCommands;
        const modCommandes = commands.filter(cmd => cmd.category === "modération");
        const admCommandes = commands.filter(cmd => cmd.category === "administration");
        const infoCommandes = commands.filter(cmd => cmd.category === "information");
        const funCommandes = commands.filter(cmd => cmd.category === "fun");
        const EconomieCommandes = commands.filter(cmd => cmd.category === "economie");



        if (choix === 1) {
            const embed = new Discord.EmbedBuilder()
                .setColor(color)
                .setTitle('Menu déroulant')
                .setDescription(`Ceci est mon menu déroulant pour la commande help.\nVous pouvez choisir dans quelle catégorie de commande vous voullez aller !\nÀ vous de m'emmener où vous voulez x)`)
            const slt = new Discord.ActionRowBuilder().addComponents(new Discord.SelectMenuBuilder()
                .setCustomId('help')
                .setPlaceholder('Rien de séléctionné')
                .addOptions({
                    label: 'Modération',
                    description: 'Selectionne la catégorie de modération.',
                    value: 'helpM',
                }, {
                    label: 'Administration',
                    description: 'Selectionne la catégorie administrative.',
                    value: 'helpA',
                }, {
                    label: 'Information',
                    description: 'Selectionne la catégorie d\'informations.',
                    value: 'helpI',
                }, {
                    label: 'Jeux',
                    description: 'Selectionne la catégorie de jeux.',
                    value: 'helpJ',
                }, {
                    label: 'Economie',
                    description: 'Selectionne la catégorie d\'économie.',
                    value: 'helpE',
                }),
            )
            interaction.reply({
                embeds: [embed],
                components: [slt]
            })
        } else {
            const embedPP = new Discord.EmbedBuilder()
                .setColor(color)
                .setDescription(`Je fonctionne **uniquement** avec les **slashCommandes** ( / )\nJe possède : \`${commandSize}\` commandes`)

                .addFields([{
                        name: "modération",
                        value: modCommandes.map(cmd => "`" + cmd.name + "`").join(", ").toString(),
                        inline: false
                    },
                    {
                        name: "information",
                        value: infoCommandes.map(cmd => "`" + cmd.name + "`").join(', ').toString(),
                        inline: false
                    },
                    {
                        name: "fun",
                        value: funCommandes.map(cmd => "`" + cmd.name + "`").join(', ').toString(),
                        inline: false
                    },
                    {
                        name: "administration",
                        value: admCommandes.map(cmd => "`" + cmd.name + "`").join(', ').toString(),
                        inline: false
                    },
                    {
                        name: "économie",
                        value: EconomieCommandes.map(cmd => "`" + cmd.name + "`").join(', ').toString(),
                        inline: false
                    }
                ])
            const row = new Discord.ActionRowBuilder()
                .addComponents(

                    new Discord.ButtonBuilder()
                    .setLabel('Serveur support')
                    .setStyle('Link')
                    .setURL('https://discord.gg/SNDjnNZY9h'),

                )

            interaction.reply({
                embeds: [embedPP],
                components: [row]
            })
        }
    }
}