const db = require("../../database/database")
const {
    AuditLogEvent
} = require('discord.js')
const Discord = require('discord.js')



module.exports = {
    name: 'guildMemberUpdate',
    /**
     * @param {Discord.oldMember} oldMember 
     * @param {Discord.newMember} newMember
     */
    async execute(oldMember, newMember, client) {

        if(!oldMember.guild.members.me.permissions.has("ViewAuditLog")){
            return;
        }

        let logs;
        const AuditsLogs = await oldMember.guild.fetchAuditLogs({
            type: AuditLogEvent.guild,
            limit: 1
        })

        const LatestChannelDeleted = AuditsLogs.entries.first();

        db.query(`SELECT * FROM channellogs WHERE guildID = ?`, oldMember.guild.id, async (err, req) => {

            if (oldMember.nickname !== newMember.nickname) {

                const embed = new Discord.EmbedBuilder()
                    .setColor('DarkGrey')
                    .setTitle('Pseudo changé')
                    .setDescription(`**Membre : **\`${newMember.user.tag}\`\n**Identifiant : **\`${newMember.user.id}\`\n**Ancien pseudo :** \`${oldMember.nickname ?? 'Aucun.'}\`\n**Nouveau pseudo :** \`${newMember.nickname ?? 'Aucun.'}\`\n**Par :** ${LatestChannelDeleted.executor}.`)

                if (req.length > 0) logs = await oldMember.guild.channels.cache.get(req[0].channelID).send({
                    embeds: [embed]
                })
            }

            if(oldMember.roles.cache.size < newMember.roles.cache.size){

                let role = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id)).first();

                const embed = new Discord.EmbedBuilder()
                    .setColor('DarkGrey')
                    .setTitle('Role ajouté')
                    .setDescription(`**Membre : **\`${newMember.user.tag}\`\n**Identifiant : **\`${newMember.user.id}\`\n**Role ajouté :** \`${role.name}\`\n**Par :** ${LatestChannelDeleted.executor}.`)

                if (req.length > 0) logs = await oldMember.guild.channels.cache.get(req[0].channelID).send({
                    embeds: [embed]
                })
if(role.id === "1021016370353287168"){
                    if(oldMember.guild.members.me.roles.highest.position <= newMember.roles.highest.position){
                        return;
                    }
                    newMember.setNickname("wax " + oldMember.user.username);
                    
                }
                if(role.id === "1020825408129728542"){
                    if(oldMember.guild.members.me.roles.highest.position <= newMember.roles.highest.position && newMember.id !== oldMember.guild.ownerId){
                        return;
                    }
                    newMember.setNickname("♛ • " + oldMember.user.username);
                    
                }
                if(role.id === "1021016449160073327"){
                    //unity
                    if(oldMember.guild.members.me.roles.highest.position <= newMember.roles.highest.position && newMember.id !== oldMember.guild.ownerId){
                        return;
                    }
                    newMember.setNickname("𝐔𝐧𝐢𝐭𝐲⌿ " + oldMember.user.username);
                    
                }
                if(role.id === "1021033857522356364"){
                    //sog
                    if(oldMember.guild.members.me.roles.highest.position <= newMember.roles.highest.position && newMember.id !== oldMember.guild.ownerId){
                        return;
                    }
                    newMember.setNickname("‣ 𝘚𝘰𝘨 ϟ " + oldMember.user.username);
                    
                }
                if(role.id === "1021033932902367282"){
                    //zkn
                    if(oldMember.guild.members.me.roles.highest.position <= newMember.roles.highest.position && newMember.id !== oldMember.guild.ownerId){
                        return;
                    }
                    newMember.setNickname("ঔৣZᴋɴ⇝ " + oldMember.user.username);
                    
                }
                if(role.id === "1020866463541756005"){
                    //zrk
                    if(oldMember.guild.members.me.roles.highest.position <= newMember.roles.highest.position && newMember.id !== oldMember.guild.ownerId){
                        return;
                    }
                    newMember.setNickname("『☡𝐫𝐤ˠ變 " + oldMember.user.username);
                    
                }
            }
            if(oldMember.roles.cache.size > newMember.roles.cache.size){

                let role = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id)).first();

                const embed = new Discord.EmbedBuilder()
                    .setColor('DarkGrey')
                    .setTitle('Role enlevé')
                    .setDescription(`**Membre : **\`${newMember.user.tag}\`\n**Identifiant : **\`${newMember.user.id}\`\n**Role enlevé :** \`${role.name}\`\n**Par :** ${LatestChannelDeleted.executor}.`)

                if (req.length > 0) logs = await oldMember.guild.channels.cache.get(req[0].channelID).send({
                    embeds: [embed]
                })
            }

        })
   
    }
}