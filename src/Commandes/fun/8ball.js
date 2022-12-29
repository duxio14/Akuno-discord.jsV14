
const Discord = require("discord.js");

module.exports = {
    name: "8ball",
    description: "Posez une question et le bot y répondra",
    category: "fun",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    options: [
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "question",
            description: "Veuillez envoyer la question.",
            required: true
        }
    ],

    async execute(interaction, client, db, emoji, color) {

        const question = interaction.options.getString('question');
        if(question.length > 250){
            return interaction.reply('Le message est trop volumineux !')
        }
        const message = [
            "Comme je le vois, oui",
            "Demandez à nouveau plus tard, car le résultat est, comment dire, fortement désagréable...",
            "Mieux vaut ne pas vous le dire maintenant",
            "Ne peut pas prédire maintenant",
            "Alors là je non !",
            "Ne comptez pas dessus",
            "c'est certain",
            "décidément non",
            "Très probablement",
            "Ma réponse est non",
            "je ne pense pas, non",
            "c'est positif",
            "Perspectives pas si bonnes",
            "Répondre est brumeux, essayer à nouveau",
            "mes signes pointent vers oui",
            "Très douteux",
            "Sans aucun doute",
            "Oui",
            "Oui, certainement",
            "Oui"
        ]

        let result = Math.floor((Math.random() * message.length));

        let embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle("8ball")
            .setDescription(`**Question :** \`${question}\`\n**Réponse: **\`${message[result]}\``)

        await interaction.reply({
            embeds: [embed]
        })
    }
}