const Discord = require('discord.js');
const superagent = require('superagent');


module.exports = {
    name: "kiss",
    description: "Permet d'embrasser un membre",
    category: "fun",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    options: [
        {
            type: Discord.ApplicationCommandOptionType.User,
            name: "membre",
            description: "Veuillez selectionner le membre.",
            required: true
        }
    ],

    async execute(interaction, client, db, emoji, color) {

        const membre = interaction.options.getMember('membre');
        if(!membre) return interaction.reply('Cet utilisateur n\'est pas dans le serveur !')

        if (membre.id === interaction.member.id) {
            return interaction.reply('Vous ne pouvez pas vous embrassé !')
        }

        const {
            body
        } = await superagent
            .get("https://nekos.life/api/kiss");

        const embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(`\`${interaction.user.username}\` a embrassé **${membre.user.username}** >:3`)
            .setImage(body.url)
        interaction.reply({
            embeds: [embed]
        })
    }
}