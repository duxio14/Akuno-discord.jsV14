const Discord = require('discord.js');

module.exports = {

    name: "unmute",
    description: "Permet de rendre la parole à un membre",
    category: "modération",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages", "ModerateMembers"],
    botPerms: ["SendMessages", "ModerateMembers"],
    options: [{
        type: Discord.ApplicationCommandOptionType.User,
        name: "member",
        description: "Veuillez selectionner le membre à unmute",
        required: true
    }],

    async execute(interaction, client, db, emoji, color) {

        const member = interaction.options.getMember('membre');
        if(!member) return interaction.reply('Cet utilisateur n\'est pas dans le serveur !')

        if (!member.isCommunicationDisabled()) {
            interaction.reply('Ce membre n\'est pas muet.')
        }

        if (member.roles.highest.position >= interaction.member.roles.highest.position && interaction.member.id !== interaction.guild.ownerId) {
            return interaction.reply('Vous ne pouvez pas avertir ce membre ! <:error:970287035090890752>')
        }
        if (interaction.guild.members.me.roles.highest.position <= member.roles.highest.position) {
            return interaction.reply('Je n\'ai pas l\'autorisation de rendre muet ce membre ! ')
        }

        member.timeout(null, 'reason').catch(console.error())

        interaction.reply(` \`\`${member.user.username}\`\` **a retrouvé la parole grâce à **${interaction.member}`)
    }
}