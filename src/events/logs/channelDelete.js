const db = require("../../database/database")
const {
    AuditLogEvent
} = require('discord.js')
const Discord = require('discord.js')
const interactionCreate = require("../Client/interactionCreate")


module.exports = {
    name: 'channelDelete',
    /**
     * 
     * @param {Discord.Channel} channel
     */
    async execute(channel, client) {

        if(!channel.guild.members.me.permissions.has("ViewAuditLog")){
            return;
        }

        db.query(`SELECT * FROM channellogs WHERE guildID = ?`, channel.guild.id, async (err, req) => {
            if (req.length > 0) {
                if (channel.id === req[0].channelID) {
                    db.query(`DELETE FROM channellogs WHERE guildID = ?`, channel.guild.id, async (err, req) => {
                        if (err) throw err;
                    })
                }
            }
        })
        const AuditsLogs = await channel.guild.fetchAuditLogs({
            type: AuditLogEvent.ChannelDelete,
            limit: 1
        })

        const LatestChannelDeleted = AuditsLogs.entries.first();

        const embed = new Discord.EmbedBuilder()
            .setColor('DarkGrey')
            .setTitle('Salon supprimé')
            .setDescription(`**Nom du salon supprimé :** \`${channel.name}\`\n**Autheur de la suppression :** ${LatestChannelDeleted.executor}\n**Date de la suppression :** <t:${Math.floor(LatestChannelDeleted.createdAt / 1000)}:F>
        `)

        db.query(`SELECT * FROM channellogs WHERE guildID = ?`, channel.guild.id, async (err, req) => {
            let logs;


            if (req.length > 0) logs = await channel.guild.channels.cache.get(req[0].channelID).send({
                embeds: [embed]
            })
        })
    }
}