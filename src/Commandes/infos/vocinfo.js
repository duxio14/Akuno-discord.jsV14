const Discord = require('discord.js')


module.exports = {

    name: "vocinfo",
    description: "Affiche les informations des personnes en vocale.",
    category: "information",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],

    async execute(interaction, client, db, emoji, color) {

        const personneEnVoc = interaction.guild.members.cache.filter(m => m.voice.channel).size;
        let streamingCount = 0
        let mutedCount = 0
        let mutedMic = 0
        cameraCount = 0
        let allMuted = 0;
        const channels = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildVoice);
        channels.forEach(c => {
            console.log(c.members.size);
            c.members.forEach(m => {
                if (m.voice.streaming) streamingCount++;
                if (m.voice.selfMute || m.voice.serverMute && m.voice.selfDeaf || m.voice.serverDeaf) allMuted++ 
                if (m.voice.selfDeaf || m.voice.serverDeaf) mutedCount++;
                if (m.voice.selfMute || m.voice.serverMute) mutedMic++;
                if (m.voice.selfVideo) cameraCount++;
            })
        })
        const embed = new Discord.EmbedBuilder()
        .setColor(color)
        .setDescription(`**Personnes en vocale** : \`${personneEnVoc}\`\n**En stream :** \`${streamingCount}\`\n**Sourd :** \`${mutedCount}\`\n**Micro désactiver :** \`${mutedMic}\`\n**Muet + sourd :** \`${allMuted}\`\n**Caméra :** \`${cameraCount}\``)

        interaction.reply({embeds: [embed]})
    },
}; 