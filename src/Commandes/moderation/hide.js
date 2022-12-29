const Discord = require('discord.js');


module.exports = {

    name: "hide",
    description: "Permet de cacher un salon.",
    category: "modération",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages", "ManageRoles"],
    botPerms: ["SendMessages", "ManageRoles"],
    options: [{
        type: Discord.ApplicationCommandOptionType.Channel,
        name: "destination",
        description: "Veuillez selectionner le salon.",
        required: false
    }
],

    async execute(interaction, client, db, emoji, color) {

        const channel = interaction.options.getChannel('destination') || interaction.channel;


        if (channel.permissionOverwrites.cache.get(interaction.guild.roles.everyone.id) ?.deny.toArray(false).includes("ViewChannel")) return interaction.reply("Ce salon est déjà caché !");

        await channel.permissionOverwrites.edit(interaction.guild.roles.everyone.id, {
            ViewChannel: false
        }).then(async () => {
            interaction.reply(`Le salon \`@${channel.name}\` à bien été caché.`);
        })

    },
};