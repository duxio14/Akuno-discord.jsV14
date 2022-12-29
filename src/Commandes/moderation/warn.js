const Discord = require('discord.js');
const config = require('../../config/config.json')
const functionCreateId = require('../../function/createID')

module.exports = {

    name: "warn",
    description: "Permet d'avertir un utilisateur.",
    category: "modération",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages", "ManageMessages"],
    botPerms: ["SendMessages"],
    options: [{
        type: Discord.ApplicationCommandOptionType.User,
        name: "membre",
        description: "Veuillez selectionner le membre à avertir.",
        required: true
    },
    {
        type: Discord.ApplicationCommandOptionType.String,
        name: "raison",
        description: "Veuillez envoyer la raison de cet avertissement.",
        required: false
    }
],

    async execute(interaction, client, db, emoji, color) {

        let totalWarns;

        let reason = interaction.options.getString('raison');
        if (!reason) reason = 'Aucune raison fournie'
        else if(reason.length > 250) return interaction.reply('La raison est trop volumineuse !')
        
        const member = interaction.options.getMember("membre");
        if(!member) return interaction.reply('Cet utilisateur n\'est pas dans le serveur !')

        const warneur = interaction.member;

        const ID = await functionCreateId('WARN')

        if(member.id === config.client.id){
            return interaction.reply('Je ne vais pas m\'avertir ^^')
        }
        if (warneur.id === member.id) return interaction.reply('Vous ne pouvez pas vous avertir !')
        if (member.roles.highest.position >= interaction.member.roles.highest.position && interaction.member.id !== interaction.guild.ownerId) {
            return interaction.reply('Vous ne pouvez pas avertir ce membre ! <:error:970287035090890752>')
        }

        db.query(`INSERT INTO warns (userID, authorID, guildID, reason, warnID, date) VALUES (?, ?, ?, ?, ?, ?)`, [member.id, interaction.member.id, interaction.guild.id, reason, ID, Date.now()], async (err, req) => {
            if (err) throw err;
        })
        db.query(`SELECT * FROM warns WHERE userID = ? AND guildID = ?`, [member.id, interaction.guild.id], async (err, req) => {
            totalWarns = req.length;

            interaction.reply(` \`\`${member.user.username}\`\` **a été **averti** par ** ${interaction.member}\n**RAISON :** \`\`${reason}\`\`\nNombre d'avertissement' total : \`${totalWarns}\``)

            try {
                member.send(`Vous avez été **averti** par **${interaction.member.user.username} dans le serveur : \`${interaction.guild.name}\`\n**RAISON : \`\`${reason}\`\`\nNombre de **d'avertissement** total : \`${totalWarns}\``).catch((err) => console.log(err))
            } catch (err) {
                console.log(err);
            }
        })
    }
}