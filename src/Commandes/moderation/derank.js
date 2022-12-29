const Discord = require('discord.js');

module.exports = {

    name: "derank",
    description: "Permet d'enlever tout les roles d'un membres",
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
    }
],

    async execute(interaction, client, db, emoji, color) {

        const member = interaction.options.getMember('membre');
        if(!member) return interaction.reply('Cet utilisateur n\'est pas dans le serveur !')

        if (member.roles.highest.position >= interaction.member.roles.highest.position && interaction.member.id !== interaction.guild.ownerId) {
            return interaction.reply('Vous ne pouvez pas avertir ce membre ! <:error:970287035090890752>')
        }
        if (interaction.guild.members.me.roles.highest.position <= member.roles.highest.position) {
            return interaction.reply('Je n\'ai pas l\'autorisation de derank ce membre ! ')
        }
        if (member.id === interaction.user) return interaction.reply('Vous ne pouvez pas derank ! ')
        const role = member.roles.cache.filter((r) => r.id !== interaction.guild.id)
        let msg;
        if(member.user.bot)return interaction.reply('Je ne peux pas derank un bot! ')


        if (role.size > 1) {
            msg = `\`${member.user.username}\` **a été derank par** ${interaction.member}\n**Roles enlevés :** ${role.map(role => role).join(' ')}`
        } else if (role.size === 1) {
            msg = `\`${member.user.username}\` **a été derank par** ${interaction.member}\n**Role enlevé :** ${role.map(role => role).join(' ')}`
        } else {
            return interaction.reply('Cet utilisateur n\'a aucun roles.')
        }

        try{
        member.roles.remove(role).then(async () => {

            interaction.reply(`${msg}`)
        })
    }catch{
        interaction.reply('erreur')
    }
    }
}