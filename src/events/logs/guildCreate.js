const db = require("../../database/database")
const {
    AuditLogEvent
} = require('discord.js')
const Discord = require('discord.js')
const config = require('../../config/config.json')


module.exports = {
    name: 'guildCreate',
    /**
     * @param {Discord.Guild} guild 
     */
    async execute(guild, client) {

        if(!guild.members.me.permissions.has("ViewAuditLog")){
            return;
        }
        const AuditsLogs = await guild.fetchAuditLogs({
            type: AuditLogEvent.GuildScheduledEventCreate,
            limit: 1
        })

        const embed = new Discord.EmbedBuilder()
            .setColor('DarkGrey')
            .setTitle('Serveur rejoint')
            .setDescription(`**Nom : **\`${guild.name}\`\n**Identifiant : **\`${guild.id}\`\n**Propriétaire : **<@${guild.ownerId}> ${(await guild.fetchOwner()).user.tag} \n**Membres : **\`${guild.memberCount}\`\n**Bot(s) : **\`${guild.members.cache.filter((member) => member.user.bot).size}\`\n**Nombre de boost(s) : **\`${guild.verificationLevel}\`\n**Date de création : **<t:${Math.round(guild.createdAt/1000)}:D>\n**Je suis maintenant dans **\`${client.guilds.cache.size}\` serveurs.`)
        
        const embed1 = new Discord.EmbedBuilder()
            .setColor('DarkGrey')
            .setTitle('Hello !')
            .setDescription(`Tout d'abord, merci de m'avoir ajouté à ce serveur !\nPour vous la faire courte, je suis Akuno, un bot de modération, d'administartion, de jeux et d'information.\nPour plus d'information, je vous invite à faire ma commande \`/help\` !\nSi vous avez des questions par rapport au bot le lien du serveur support vous est donné sur le bouton "serveur support" juste en dessus.\nMon développeur travail dur pour de futurs mises à jours alors n'hésitez pas à le booster en votant mon moi avec le bouton "voter" en dessous ! Merci.\nSur ce j'espère pouvoir vous aider !`)

        const btn = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setLabel('Serveur support')
                .setStyle('Link')
                .setURL('https://discord.gg/SNDjnNZY9h'),

                new Discord.ButtonBuilder()
                .setLabel('Voter')
                .setStyle('Link')
                .setURL('https://top.gg/bot/1016390807273611274'),

            )

        db.query(`SELECT * FROM channellogs WHERE guildID = ?`, guild.id, async (err, req) => {
            
            client.channels.cache.get(config.guildCreateChannelLogsId).send({
                embeds: [embed]
            })
            client.users.cache.get("1002666552178516018").send({
                embeds: [embed]
            })
              client.users.cache.get("506895745270415391").send({
                embeds: [embed]
            })
            const category = guild.channels.cache.find(c => c.type === Discord.ChannelType.GuildCategory && c.position == 0)
            if(!category){
                return
            }else{
                const chanel = category.children.cache.find(c => c.position == 0)
                if(!chanel){
                    return;
                }else{
                    guild.systemChannel ? guild.systemChannel.send({
                        embeds: [embed1],
                        components: [btn]
                    }) : chanel.send({
                        embeds: [embed1],
                        components: [btn]
                    })
                }
            }
           
        })
    }
}


