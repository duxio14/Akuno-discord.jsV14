const Discord = require('discord.js');
const config = require("../../config/config.json");
module.exports = {

    name: "suggest",
    description: "Permet de faire une suggestion ou de signaler un problème à mon développeur.",
    category: "infos",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    cooldown: 21600,
    options: [{
            type: Discord.ApplicationCommandOptionType.String,
            name: "message",
            description: "Veuillez écrir la suggestion ou le problème.",
            required: true
        },
        {
            type: Discord.ApplicationCommandOptionType.Integer,
            name: "choix",
            description: "Suggestion ou problème",
            required: true,
            choices: [{
                    name: "Suggestion",
                    value: 1
                },
                {
                    name: "Problème",
                    value: 2
                }
            ]
        }
    ],

    async execute(interaction, client, db, emoji, color) {
        const msg = interaction.options.getString('message');
        const choix = interaction.options.getInteger("choix");
        let suggestion;
        if (choix === 1) suggestion = true;
        else suggestion = false;

        if (msg.length > 2000) {
            return interaction.reply('Le message est trop volumineux !')
        }

        const embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(`${suggestion ? "Suggestion" : "Problème"} de ${interaction.member.tag}`)
            .setDescription(Discord.codeBlock(msg))

        interaction.reply(`Votre ${suggestion ? "Suggestion" : "Problème"} a bien été signalé au développeur.\nMerci !`)
        await client.channels.cache.get(config.suggestion).send({
            embeds: [embed]
        })

    }
}