const Discord = require('discord.js')


module.exports = {

    name: "dashboard",
    description: "Envoie le dashboard des commandes activées sur le serveur.",
    category: "administration",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["Administrator", "SendMessages"],
    botPerms: ["SendMessages"],

    async execute(interaction, client, db, emoji, color) {

        let logsActive;
        let antiLinkActive;
        let antiBotActive;
        let welcomeActive;
        let creatlimit;

        db.query(`SELECT * FROM channellogs WHERE guildID = ?`, [interaction.guild.id], async (err, logs) => {
            db.query(`SELECT * FROM antilink WHERE guildID = ?`, [interaction.guild.id], async (err, antilink) => {
                db.query(`SELECT * FROM antibot WHERE guildID = ?`, [interaction.guild.id], async (err, antibot) => {
                    db.query(`SELECT * FROM welcome WHERE guildID = ?`, [interaction.guild.id], async (err, welcome) => {
                        db.query(`SELECT * FROM creatlimit WHERE guildID = ?`, [interaction.guild.id], async (err, cl) => {
                            if (logs.length > 0) logsActive = emoji.active;
                            else logsActive = emoji.desactive;

                            if (antilink.length > 0) antiLinkActive = emoji.active;
                            else antiLinkActive = emoji.desactive;

                            if (antibot.length > 0) antiBotActive = emoji.active;
                            else antiBotActive = emoji.desactive;

                            if (welcome.length > 0) welcomeActive = emoji.active + `${interaction.guild.channels.cache.get(welcome[0].channelID)}`;
                            else welcomeActive = emoji.desactive;

                            if (cl.length > 0) creatlimit = emoji.active + `( 30m bientôt modifiable )`;
                            else creatlimit = emoji.desactive;

                            const DashboardEmbed = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setTitle(`Voici le dashboard d'${client.user.username}`)
                                .addFields([{
                                    name: "Général",
                                    value: `**Logs :** ${logsActive}\n**Antilink :** ${antiLinkActive}\n**Antibot :** ${antiBotActive}\n**Message de bienvenu :** ${welcomeActive}\n**Creation limite :** ${creatlimit}`
                                }])
                            interaction.reply({
                                embeds: [DashboardEmbed]
                            })
                        })
                    })
                })
            })
        })
    },
};