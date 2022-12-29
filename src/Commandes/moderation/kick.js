const Discord = require('discord.js');

module.exports = {

    name: "kick",
	description: "Permet d'expulser un membre du serveur.",
    category: "modération",
	ownerOnly: false,
	fondateurOnly: false,
	userPerms: ["SendMessages", "KickMembers"],
	botPerms: ["SendMessages", "KickMembers"],
    options: [{
        type: Discord.ApplicationCommandOptionType.User,
        name: "membre",
        description: "Veuillez selectionner le membre à expulser.",
        required: true
    },
    {
        type: Discord.ApplicationCommandOptionType.String,
        name: "raison",
        description: "Veuillez envoyer la raison.",
        required: false
    }
],


    async execute(interaction, client, db, emoji, color) {
        const member = interaction.options.getMember('membre');
        if(!member) return interaction.reply('Cet utilisateur n\'est pas dans le serveur !')
        let reason = interaction.options.getString('raison');
        if (!reason) {
            reason = 'Aucune raison fournie !'
        }else if(reason.length > 250){
                return interaction.reply('La raison est trop volumineuse !')
        }
        

        if (member.roles.highest.position >= interaction.member.roles.highest.position && interaction.member.id !== interaction.guild.ownerId) {
            return interaction.reply('Vous ne pouvez pas expluser ce membre ! <:error:970287035090890752>')
        }
        if (interaction.guild.members.me.roles.highest.position <= member.roles.highest.position) {
            return interaction.reply('Je n\'ai pas l\'autorisation d\'expulser ce membre !')
        }
        if (member.id === interaction.member.id) return interaction.reply('Vous ne pouvez pas vous expulser !')
        if(member.id === client.id){return interaction.reply('Je ne peux pas m\'expulser...')}

        member.kick({
                days: 0,
                reason: reason
            })
            .catch(err => {
                console.error(err)
            });
        interaction.reply(` \`\`${member.user.username}\`\` **à été expulser par** ${interaction.member}. <a:check:970291516906025001>\n**RAISON :** \`\`${reason}\`\``)
    }
};