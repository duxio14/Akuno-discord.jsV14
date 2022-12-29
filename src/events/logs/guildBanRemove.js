const db = require("../../database/database")
const {
    AuditLogEvent
} = require('discord.js')
const Discord = require('discord.js')



module.exports = {
    name: 'guildBanRemove',
    /**
     * @param {Discord.Ban} ban 
     */
    async execute(ban, client) {

        if(!ban.guild.members.me.permissions.has("ViewAuditLog")){
            return;
        }

        const AuditsLogs = await ban.guild.fetchAuditLogs({
            type: AuditLogEvent.guild,
            limit: 1
        })
       
        const LatestChannelDeleted = AuditsLogs.entries.first();

        const embed = new Discord.EmbedBuilder()
            .setColor('DarkGrey')
            .setTitle('Membre débannis')
            .setDescription(`**Nom : **\`${ban.user.tag}\`\n**Identifiant : **\`${ban.user.id}\`\n**Par :** ${LatestChannelDeleted.executor}.`)

        db.query(`SELECT * FROM channellogs WHERE guildID = ?`, ban.guild.id, async (err, req) => {
            
            let logs;


            if (req.length > 0) logs = await ban.guild.channels.cache.get(req[0].channelID).send({
                embeds: [embed]
            })

           
        })
    
    }
}