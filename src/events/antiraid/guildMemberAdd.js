const db = require("../../database/database")
const {
    AuditLogEvent
} = require('discord.js')
const Discord = require('discord.js')
const ms = require('ms');

module.exports = {
    name: 'guildMemberAdd',
    /**
     * @param {Discord.Member} member
     */
    async execute(member, client) {

        if(!member.guild.members.me.permissions.has("ViewAuditLog")){
            return;
        }
        const AuditsLogs = await member.guild.fetchAuditLogs({
            type: AuditLogEvent.guild,
            limit: 1
        })
        db.query(`SELECT * FROM creatlimit WHERE guildID = ?`, member.guild.id, async (err, req) => {
            if(req.length >= 1){
            const date = Date.now();
            const created = member.user.createdTimestamp;
            const som = created + ms("30m");
            const diff = date - som

            if(diff < 0){
                member.kick();
            }
            }
        })
    }
}