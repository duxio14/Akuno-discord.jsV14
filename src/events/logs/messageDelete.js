const db = require("../../database/database")
const {
    AuditLogEvent
} = require('discord.js')
const Discord = require('discord.js')
const interactionCreate = require("../Client/interactionCreate")


module.exports = {
    name: 'messageDelete',
    /**
     * 
     * @param {Discord.Message} message
     */
    async execute(message, client) {

        if(!message.guild.members.me.permissions.has("ViewAuditLog")){
            return;
        }

        const AuditsLogs = await message.guild.fetchAuditLogs({
            type: AuditLogEvent.MessageDelete,
            limit: 1
        })

        const LatestmessageCreated = AuditsLogs.entries.first();

        const embed = new Discord.EmbedBuilder()
            .setColor('DarkGrey')
            .setTitle('Message supprimé')
            .setDescription(`**Autheur du message :** ${message.author}\n**Autheur de la suppressions :** ${LatestmessageCreated.executor}\n**Date de la suppression :** <t:${Math.floor(LatestmessageCreated.createdAt / 1000)}:F>\n**Contenu :** \`${message.content}\``)

        db.query(`SELECT * FROM channellogs WHERE guildID = ?`, message.guild.id, async (err, req) => {
            let logs;


            if (req.length > 0) logs = await message.guild.channels.cache.get(req[0].channelID).send({
                embeds: [embed]
            })
        })
    }
}