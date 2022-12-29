const Discord = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    /** 
     * @param {Discord.Interaction} interaction 
     */
    async execute(interaction, client) {

        const commandSize = client.slashCommands.size;
        const commands = client.slashCommands;
        const modCommandes = commands.filter(cmd => cmd.category === "modération");
        const admCommandes = commands.filter(cmd => cmd.category === "administration");
        const infoCommandes = commands.filter(cmd => cmd.category === "information");
        const funCommandes = commands.filter(cmd => cmd.category === "fun");
        const EconomieCommandes = commands.filter(cmd => cmd.category === "economie");

        if (!interaction.isSelectMenu()) {
            return;
        }
        if (interaction.customId === "help") {
            if (interaction.values[0] === "helpM") {

                await interaction.deferUpdate();
                const embedM = new Discord.EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle(`Commandes de modération (${modCommandes.size})`)
                    .setDescription(`${modCommandes.map(cmd => "`" + cmd.name + "` - " + cmd.description).join("\n").toString()}`)

                await interaction.message.edit({
                    embeds: [embedM]
                });
            } else if (interaction.values[0] === "helpA") {

                await interaction.deferUpdate();
                const embedM = new Discord.EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle(`Commandes d'administration (${admCommandes.size})`)
                    .setDescription(`${admCommandes.map(cmd => "`" + cmd.name + "` - " + cmd.description).join("\n").toString()}`)

                await interaction.message.edit({
                    embeds: [embedM]
                });
            } else if (interaction.values[0] === "helpI") {

                await interaction.deferUpdate();
                const embedM = new Discord.EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle(`Commandes d'information (${infoCommandes.size})`)
                    .setDescription(`${infoCommandes.map(cmd => "`" + cmd.name + "` - " + cmd.description).join("\n").toString()}`)

                await interaction.message.edit({
                    embeds: [embedM]
                });
            } else if (interaction.values[0] === "helpJ") {

                await interaction.deferUpdate();
                const embedM = new Discord.EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle(`Commandes de jeux (${funCommandes.size})`)
                    .setDescription(`${funCommandes.map(cmd => "`" + cmd.name + "` - " + cmd.description).join("\n").toString()}`)

                await interaction.message.edit({
                    embeds: [embedM]
                });
            } else if (interaction.values[0] === "helpE") {

                await interaction.deferUpdate();
                const embedM = new Discord.EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle(`Commandes d'économie (${EconomieCommandes.size})`)
                    .setDescription(`${EconomieCommandes.map(cmd => "`" + cmd.name + "` - " + cmd.description).join("\n").toString()}`)

                await interaction.message.edit({
                    embeds: [embedM]
                });
            }
        }
    }
}
