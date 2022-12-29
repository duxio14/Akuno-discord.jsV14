const Discord = require('discord.js');
const {
    ChannelType
} = require('discord.js');

module.exports = {

    name: "roleinfo",
    description: "Envoie les informations d'un salon.",
    category: "information",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    options: [{
        type: Discord.ApplicationCommandOptionType.Role,
        name: "role",
        description: "Veuillez selectionner le role",
        required: true
    }],

    async execute(interaction, client, db, emoji, color) {
        const role = interaction.options.getRole("role");
        let convertedRole;


        if (role.permissions.has("Administrator")) {
            convertedRole = "`" + "Administrateur" + "`"
        } else {
            convertedRole = role.permissions.toArray().map(p => "`" + p + "`").join(" ")
        }

        const embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(`Informations du role : \`${role.name}\``)
            .addFields([
                {
                    name: "Informations générales", value: `**Nom :** \`${role.name}\`\n**Identifiant :** \`${role.id}\`\n**Membres possédent le rôle :** \`${role.members.size}\`\n**Couleur :** \`${role.hexColor === "#000000" ? "Classique" : role.hexColor}\`\n**Afficher séparement :** \`${role.hoist ? "Oui" : "Non"}\`\n**Mentionnable :** \`${role.mentionable ? "Oui" : "Non"}\`\n**Permissions :** ${convertedRole}\n**Le role a été crée le** <t:${Date.parse(role.createdAt) / 1000}:f>`
                }
            ])

        interaction.reply({
            embeds: [embed]
        })
    }
}