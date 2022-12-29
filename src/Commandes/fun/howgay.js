
const Discord = require('discord.js');

module.exports = {

    name: "howgay",
    description: "Tire au sort votre pourcentage de gaytitude",
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
            required: false
        }
    ],

    async execute(interaction, client, db, emoji, color) {

        const member = interaction.options.getMember('membre') || interaction.member;
        let pr = Math.round(Math.random() * 100);
        if(member.id === "506895745270415391") pr = 0;
        if(member.id === "802878148957044746") pr = 100;

        let embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle("Test de gaytitude")
            .setDescription(`${member} est **gay** à \`${pr}%\``)

        await interaction.reply({
            embeds: [embed]
        })
    }
}