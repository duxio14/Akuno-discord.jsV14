const Discord = require('discord.js')

const ButtonPages = async function (interaction, message, embeds, duration, buttonStyle, rightEmoji, leftEmoji) {

    if (!['red', 'green', 'blurple', "gray", "Primary"].includes(buttonStyle)) throw new TypeError(`Button style incorect`);
    if (!rightEmoji) throw new TypeError(`Emoji pour le 1er boutous n'est pas fournis`);
    if (!leftEmoji) throw new TypeError(`Emoji pour le 2eme boutous n'est pas fournis`);


    const interactiveButtons = new Discord.ActionRowBuilder()
        .addComponents(new Discord.ButtonBuilder()
            .setLabel(leftEmoji)
            .setStyle(buttonStyle)
            .setCustomId('btn1'),
            new Discord.ButtonBuilder()
            .setLabel(rightEmoji)
            .setStyle(buttonStyle)
            .setCustomId('btn2'),
        )


    await interaction.channel.send({
        components: [interactiveButtons],
        embeds: [embeds[0]]
    }).then((m) => {
        interaction.message = m;
        interaction.embeds = embeds;
        interaction.currentPage = 0;
        interaction.interactor = message.author;
        interaction.components = interactiveButtons;
        setTimeout(() => {
            m.edit("", {
                components: [],
                embed: embeds[interaction.currentPage]
            })
        }, 60000 * 5)

    })


}



module.exports = {
    ButtonPages
}