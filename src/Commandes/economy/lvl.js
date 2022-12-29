const ms = require('ms')
const Discord = require('discord.js')
const functionCooldown = require('../../function/cooldown')
const functionAddMoney = require('../../function/addmoney')
const functionC = require('../../function/createID')
const functionRemoveMoney = require('../../function/removemoney')

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

    name: "reputation",
    description: "Donnez des points de réputation aux membres du serveur.",
    category: "economie",
    ownerOnly: false,
    crownOnly: true,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    options: [{
        type: Discord.ApplicationCommandOptionType.User,
        name: "user",
        description: "Le membre.",
        required: true
    }],

    async execute(interaction, client, db, emoji, color) {
        const id = await functionC("level");
        const cooldownTime = ms("2h");

        const member = interaction.options.getMember('user');
        if (!member) return interaction.reply({
            content: "Ce membre n'est pas dans le serveur !",
            ephemeral: true
        })
        if (member.id === interaction.member.id) {
            return interaction.reply(`Vous ne pouvez pas vous donner de points de réputation !`)
        }
        db.query(`SELECT * FROM lvl WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, member.id], async (err, req) => {
            if (req.length < 1) {
                db.query(`INSERT INTO lvl (guildID, memberID, lvl, id, cooldown) VALUES (?, ?, ?, ?, ?)`, [interaction.guild.id, member.id, 1, id, Date.now()]);
                interaction.reply(`Vous avez bien donné **1 point de réputation** (<:9136startoken:1022576065778028604>) à \`${member.user.username}\``);
            } else {
                const cooldown = req[0].cooldown;
                if (Date.now() < parseInt(cooldownTime) + parseInt(cooldown)) {
                    functionCooldown(cooldown, cooldownTime, interaction);
                } else {
                    if (req[0].lvl === 100) {
                        return interaction.reply("Ce membre a déjà atteinds le niveau maximal (lvl 100)");
                    } else {
                        db.query(`UPDATE lvl SET lvl = ? WHERE guildID = ? AND memberID = ?`, [parseInt(req[0].lvl) + 1, interaction.guild.id, member.id]);
                        db.query(`UPDATE lvl SET cooldown = ? WHERE guildID = ? AND memberID = ?`, [Date.now(), interaction.guild.id, interaction.member.id]);
                        interaction.reply(`Vous avez bien donné **1 point de réputation** (<:9136startoken:1022576065778028604>) à \`${member.user.username}\``);
                    }
                }
            }
        })
    },
};