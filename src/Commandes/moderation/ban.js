const Discord = require('discord.js');

module.exports = {

    name: "ban",
    description: "Permet de bannir un utilisateur.",
    category: "modération",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages", "BanMembers"],
    botPerms: ["SendMessages", "BanMembers"],
    options: [{
            type: Discord.ApplicationCommandOptionType.User,
            name: "membre",
            description: "Veuillez selectionner le membre à bannir.",
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
        let reason = interaction.options.getString('raison');
        if (!reason) {
            reason = 'Aucune raison fournie !'
        } else if (reason.length > 250) {
            return interaction.reply('La raison est trop volumineuse !')
        }
        const bans = await interaction.guild.bans.fetch();
        if(bans.find(u => u.user.id === member.id)){
            return interaction.reply(`${member} est déjà bannis du serveur !`)
        }
        if (member.id === client.id) {
            return interaction.reply('Je ne peux pas me bannir...')
        }
        if(interaction.guild.members.cache.get(member.id)){

        if (member.roles.highest.position >= interaction.member.roles.highest.position && interaction.member.id !== interaction.guild.ownerId) {
            return interaction.reply('Vous ne pouvez pas bannir ce membre ! <:error:970287035090890752>');
        }
        if (interaction.guild.members.me.roles.highest.position <= member.roles.highest.position) {
            return interaction.reply('Je n\'ai pas l\'autorisation de bannir ce membre !');
        }
        if (member.id === interaction.user) return interaction.reply('Vous ne pouvez pas vous bannir !');
        
    }

        interaction.guild.bans.create(member.id)
            .catch(err => {
                console.error(err);
            });
        interaction.reply(`${member} **à été bannis par** ${interaction.member}. <a:check:970291516906025001>\n**RAISON :** \`\`${reason}\`\``)
    }
};