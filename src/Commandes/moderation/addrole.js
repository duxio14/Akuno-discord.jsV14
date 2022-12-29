const Discord = require('discord.js');

module.exports = {

name: "addrole",
description: "Permet d'ajouter un role à un membre.",
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

        const member = interaction.options.getMember('membre');
        if(!member) return interaction.reply('Cet utilisateur n\'est pas dans le serveur !')
        const role = interaction.options.getRole('role');

        if (interaction.member.roles.highest.position <= role.position && interaction.member.id !== interaction.guild.ownerId) {
            return interaction.reply('Vous ne pouvez pas ajouter un role plus qui est plus élevé que les votres !')
        }
        if (interaction.guild.members.me.roles.highest.position <= role.position) {
            return interaction.reply('Je n\'ai pas les roles recquis !')
        }

        if (member.roles.cache.has(role.id)) {
            return interaction.reply(`Ce membre a déjà le role : ${role}`)
        }
        member.roles.add(role).then(async roles => {
            const roleName = roles;
            interaction.reply(`**Le role** ${role} **a bien été ajouté à** **${roleName}**.`)
        })

    }
}