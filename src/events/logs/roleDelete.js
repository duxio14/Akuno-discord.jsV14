const db = require("../../database/database")
const {
    AuditLogEvent
} = require('discord.js')
const Discord = require('discord.js')


module.exports = {
    name: 'roleDelete',
    /**
     * 
     * @param {Discord.Role} role
     */
    async execute(role, client) {

        if(!role.guild.members.me.permissions.has("ViewAuditLog")){
            return;
        }
        const AuditsLogs = await role.guild.fetchAuditLogs({
            type: AuditLogEvent.RoleDelete,
            limit: 1
        })

        const LatestroleCreated = AuditsLogs.entries.first();

        const embed = new Discord.EmbedBuilder()
            .setColor('DarkGrey')
            .setTitle('Role supprimé')
            .setDescription(`**Nom du role supprimé :** \`${role.name}\`\n**Autheur de la suppression :** ${LatestroleCreated.executor}\n**Date de la suppression :** <t:${Math.floor(LatestroleCreated.createdAt / 1000)}:F>
        `)

        db.query(`SELECT * FROM channellogs WHERE guildID = ?`, role.guild.id, async (err, req) => {
            let logs;


            if (req.length > 0) logs = await role.guild.channels.cache.get(req[0].channelID).send({
                embeds: [embed]
            })
        })
 
    }
}
