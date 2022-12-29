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

    name: "removemoney",
    description: "Commande administrative pour enlevé de l'argent",
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
    }, {
        type: Discord.ApplicationCommandOptionType.Number,
        name: "int",
        description: "Le nombre à choisir.",
        required: true
    }],

    async execute(interaction, client, db, emoji, color) {

        const member = interaction.options.getMember('user');
        if (!member) return interaction.reply({
            content: "Ce membre n'est pas dans le serveur !",
            ephemeral: true
        })
        const nb = interaction.options.getNumber("int");
        if (nb.length > 50) {
            return interaction.reply("Message trop volumineux !")
        }
        db.query(`SELECT * FROM money WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, interaction.member.id], async (err, req) => {
            if(nb > req[0].money){
                return interaction.reply(`Vous ne pouvez pas retirer plus d'argent à ${member} qu'il n'en a !`)
            }
            functionRemoveMoney(member.id, interaction.guild.id, nb)
            return interaction.reply(`Vous avez bien retiré ${numStr(nb)} <:xenos_money:1021001754558615623> à ${member}`);
        })
    },
};