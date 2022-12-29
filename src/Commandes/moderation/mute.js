const Discord = require('discord.js');
const ms = require('ms')

module.exports = {

    name: "mute",
    description: "Permet de rendre muet un membre du serveur.",
    category: "modération",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages", "ModerateMembers"],
    botPerms: ["SendMessages", "ModerateMembers"],
    options: [{
        type: Discord.ApplicationCommandOptionType.User,
        name: "membre",
        description: "Veuillez selectionner le membre à rendre muet.",
        required: true
    },
    {
        type: Discord.ApplicationCommandOptionType.String,
        name: "temps",
        description: "Veuillez envoyer le temps. (s pour secondes, m pour minutes...)",
        required: false
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
        const time = interaction.options.getString('temps');
        const convertedTime = ms(time);
        if(isNaN(convertedTime)){
            return interaction.reply('Invalide format !')
        }
        if (convertedTime > 2419200000 || convertedTime < 1) {
			return interaction.reply('Le temps maximal de mute est de 28 jours ! (et evidemment superieur à 0)');
		}

        let reason = interaction.options.getString('raison');
        if (!reason) {
            reason = 'Aucune raison fournie.';
        }else if(reason.length > 250){
            return interaction.reply('La raison est trop volumineuse !')
        }

        if (member.roles.highest.position >= interaction.member.roles.highest.position && interaction.member.id !== interaction.guild.ownerId) {
            return interaction.reply('Vous ne pouvez pas avertir ce membre ! <:error:970287035090890752>');
        }
        if (interaction.guild.members.me.roles.highest.position <= member.roles.highest.position) {
            return interaction.reply('Je n\'ai pas l\'autorisation de rendre muet ce membre !');
        }

        member.timeout(convertedTime, reason).catch(console.error());

        interaction.reply(` \`\`${member.user.username}\`\` **a été rendu muet par** ${interaction.member} **pendant** \`\`${ms(time) / 60000}\`\`m soit \`\`${ms(time) / 60000 /60}\`\`h. <a:check:970291516906025001>\n**RAISON :** \`\`${reason}\`\``);
    }
}