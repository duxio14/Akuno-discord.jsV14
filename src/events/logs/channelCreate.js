const db = require("../../database/database")
const {
    AuditLogEvent
} = require('discord.js')
const Discord = require('discord.js')


module.exports = {
    name: 'channelCreate',
    /**
     * 
     * @param {Discord.Channel} channel
     */
    async execute(channel, client) {

        
        if(!channel.guild.members.me.permissions.has("ViewAuditLog")){
            return;
        }
        const AuditsLogs = await channel.guild.fetchAuditLogs({
            type: AuditLogEvent.ChannelCreate,
            limit: 1
        })

        const LatestChannelCreated = AuditsLogs.entries.first();

        const embed = new Discord.EmbedBuilder()
            .setColor('DarkGrey')
            .setTitle('Salon créé')
            .setDescription(`**Nom du salon créé :** \`${channel.name}\`\n**Autheur de la création :** ${LatestChannelCreated.executor}\n**Date de la création :** <t:${Math.floor(LatestChannelCreated.createdAt / 1000)}:F>
        `)

        db.query(`SELECT * FROM channellogs WHERE guildID = ?`, channel.guild.id, async (err, req) => {
            let logs;


            if (req.length > 0) logs = await channel.guild.channels.cache.get(req[0].channelID).send({
                embeds: [embed]
            })
        })
    }
}