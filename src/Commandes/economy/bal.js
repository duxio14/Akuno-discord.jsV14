const ms = require('ms')
const Discord = require('discord.js')
const functionCooldown = require('../../function/cooldown')
const functionAddMoney = require('../../function/addmoney')

function numStr(a, b) {
    a = '' + a;
    b = b || ' ';
    var c = '',
        d = 0;
    while (a.match(/^0[0-9]/)) {
        a = a.substr(1);
    }
    for (var i = a.length - 1; i >= 0; i--) {
        c = (d != 0 && d % 3 == 0) ? a[i] + b + c : a[i] + c;
        d++;
    }
    return c;
}

module.exports = {

    name: "bal",
    description: "Vous pouvez savoir votre argent ou celle de quelqu'un d'autre.",
    category: "economie",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    options: [{
        type: Discord.ApplicationCommandOptionType.User,
        name: "membre",
        description: "Le membre",
        required: false
    }],

    async execute(interaction, client, db, color) {
        const member = interaction.options.getMember('membre') || interaction.member;
        if (!member) return interaction.reply({
            content: "Ce membre n'est pas dans le serveur !",
            ephemeral: true
        })
        let argent;
        let argent1;

        let lvl;
        db.query(`SELECT * FROM money WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, member.id], async (err, req) => {
            db.query(`SELECT * FROM money WHERE guildID = ?`, [interaction.guild.id], async (err, req1) => {
                db.query(`SELECT * FROM banque WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, member.id], async (err, banque) => {
                    db.query(`SELECT * FROM lvl WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, member.id], async (err, lvl) => {
                        if(lvl.length < 1){
                            lvl = 0;
                        }else{
                            lvl = lvl[0].lvl;
                        }
                        if (req.length < 1) {
                            argent = 0;

                        } else {
                            argent = req[0].money;
                        }
                        if (banque.length < 1) {
                            argent1 = 0;
                        } else {
                            argent1 = banque[0].money;
                        }
                        let total = []
                        console.log(req1.length)
                        for (let i = 0; i < req1.length; i++) {
                            const thune = {
                                name: req1[i].memberID,
                                value: req1[i].money
                            }
                            total.push(thune)
                        }
                        total.sort(function (a, b) {
                            return b.value - a.value;
                        });

                        const index = total.findIndex(obj => obj.name == member.id)

                        const embed = new Discord.EmbedBuilder()
                            .setColor(color)
                            .setTitle(`Argent de ${member.user.username}`)
                            .setDescription(`**Argent :** ${numStr(argent) + " <:xenos_money:1021001754558615623>"}\n**Banque :** ${numStr(argent1)} <:xenos_money:1021001754558615623>\n**Position :** \`#${index + 1}\`\n**Réputation :** \`${lvl}\` <:9136startoken:1022576065778028604>`)
                        interaction.reply({
                            embeds: [embed]
                        })

                    })
                })
            })
        })
    }
};