const db = require("../../database/database")
const {
    AuditLogEvent
} = require('discord.js')
const Discord = require('discord.js')


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

        db.query(`SELECT * FROM welcome WHERE guildID = ?`, [member.guild.id], async (err, req) => {

            if (req.length >= 1) {

                const embed = new Discord.EmbedBuilder()
                    .setColor("Blue")
                    .setTitle('Nouvel arrivant ! <:PepeHello:1017882013052711034>')
                    .setDescription(`Bienvenu sur **${member.guild.name}** ${member}\nMerci à toi d'avoir rejoint !\nGrâce à toi, nous sommes \`${member.guild.memberCount}\` <:pepe_cutepoggies:1018238775920431134>`)
                    .setThumbnail(member.guild.iconURL())

                const channel = req[0].channelID;
                await member.guild.channels.cache.get(channel).send({
                    embeds: [embed]
                })
            }
        })

        if(member.guild.id === "964974656207609897"){
            member.roles.add("964974656207609900")
        }
        if(member.guild.id === "1017437425900986440"){
            member.roles.add("1020715019039678524")
        }


        const LatestChannelDeleted = AuditsLogs.entries.first();

        db.query(`SELECT * FROM blacklist WHERE ID = ?`, `${member.guild.id} ${member.id}`, async (err, req) => {
            if (req.length >= 1) {
                member.ban({
                    days: 0,
                    reason: 'blacklisted'
                })
            }
        })
        db.query(`SELECT * FROM antibot WHERE guildID`, [member.guild.id], async (err, req) => {
            if (req.length >= 1) {
                if (member.user.bot) {
                    member.kick({
                        days: 0,
                        reason: "antibot"
                    })
                }
            }
        })
    }
}