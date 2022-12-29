const Discord = require('discord.js');

module.exports = {

    name: "removerole",
    description: "Permet d'enlever un role à un membre.",
    category: "modération",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages", "ManageRoles"],
    botPerms: ["SendMessages", "ManageRoles"],
    options: [{
        type: Discord.ApplicationCommandOptionType.User,
        name: "membre",
        description: "Veuillez selectionner le membre.",
        required: true
    },
    {
        type: Discord.ApplicationCommandOptionType.Role,
        name: "role",
        description: "Veuillez selectionner le role.",
        required: true
    }
],

    async execute(interaction, client, db, emoji, color) {

        let member = interaction.options.getMember('membre');
        if(!member) return interaction.reply('Cet utilisateur n\'est pas dans le serveur !')
        let role = interaction.options.getRole('role');

        if (interaction.member.roles.highest.position <= role.position && interaction.member.id !== interaction.guild.ownerId) {
            return interaction.reply('Vous ne pouvez pas avertir ce membre ! <:error:970287035090890752>');
        }
        if (interaction.guild.members.me.roles.highest.position <= role.position) {
            return interaction.reply('Je n\'ai pas les roles recquis ! <:error:970287035090890752>');
        }

        if (!member.roles.cache.has(role.id)) {
            return interaction.reply(`Ce membre n'a pas le role : ${role}`);
        }
        member.roles.remove(role).then(async () => {
            interaction.reply(`Le role ${role} à bien été **enlevé** à ${member}`);
        })

    }
}