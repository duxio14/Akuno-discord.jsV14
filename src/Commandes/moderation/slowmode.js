const Discord = require('discord.js');
const ms = require('ms');

module.exports = {

    name: "slowmode",
    description: "Permet de changer le temps d'envoyer entre les messages d'un salon.",
    category: "modération",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages", "ManageChannels"],
    botPerms: ["SendMessages", "ManageChannels"],
    options: [
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "temps",
            description: "Veuillez envoyer le temps. (s pour secondes, m pour minutes...)",
            required: true
        },
        {
        type: Discord.ApplicationCommandOptionType.Channel,
        name: "destination",
        description: "Veuillez selectionner le salon.",
        required: false
    }
],
        

    async execute(interaction, client, db, emoji, color) {

        const channel = interaction.options.getChannel('destination') || interaction.channel;
        const time = interaction.options.getString('temps');
        const convertedtime = ms(time);

        if(isNaN(convertedtime)){
            return interaction.reply('Ce n\'est pas un nombre !')
        }
        if(convertedtime < ms("1s") || convertedtime  > ms("6h")) {
            return interaction.reply('Le slowmode doit etre compris entre 1 seconde et 6 heures !')
        }
        
        channel.setRateLimitPerUser(convertedtime / 1000, 'slowmode').then(() => {
            interaction.reply(`J'ai bien mis le slowmode du channel : ${channel.name} à ${ms(convertedtime)}`)
        })
    },
};