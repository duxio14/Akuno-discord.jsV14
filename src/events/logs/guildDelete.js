const db = require("../../database/database")
const {
    AuditLogEvent
} = require('discord.js')
const Discord = require('discord.js')
const config = require('../../config/config.json')


module.exports = {
    name: 'guildDelete',
    /**
     * @param {Discord.Guild} guild 
     */
    async execute(guild, client) {

        if(!guild.members.me.permissions.has("ViewAuditLog")){
            return;
        }

        const embed = new Discord.EmbedBuilder()
            .setColor('DarkGrey')
            .setTitle('Serveur quitté')
            .setDescription(`**Nom : **\`${guild.name}\`\n**Identifiant : **\`${guild.id}\`\n**Propriétaire : **<@${guild.ownerId}> ${(await guild.fetchOwner()).user.tag} \n**Membres : **\`${guild.memberCount}\`\n**Bot(s) : **\`${guild.members.cache.filter((member) => member.user.bot).size}\`\n**Nombre de boost(s) : **\`${guild.verificationLevel}\`\n**Date de création : **<t:${Math.round(guild.createdAt/1000)}:D>\n**Je suis maintenant dans **\`${client.guilds.cache.size}\` serveurs.`)

        db.query(`SELECT * FROM channellogs WHERE guildID = ?`, guild.id, async (err, req) => {
            
            client.channels.cache.get(config.guildCreateChannelLogsId).send({
                embeds: [embed]
            })

           
        })
   
    }
}

