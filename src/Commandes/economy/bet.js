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

    name: "bet",
    description: "Aurez vous de la chance ? C'est une sorte de pile ou face dans laquel je choisis pour vous.",
    category: "economie",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    options: [{
        type: Discord.ApplicationCommandOptionType.Number,
        name: "int",
        description: "Le nombre à choisir.",
        required: true
    }],

    async execute(interaction, client, db, emoji, color) {
        let win = false;
        const nb = interaction.options.getNumber("int");
        if(nb.length > 50){
            return interaction.reply("Message trop volumineux !")
        }
        const ping = Math.round(Math.random() + 1);
        console.log(ping);
        ping == 1 ? win = true : win = false;
        db.query(`SELECT * FROM money WHERE guildID = ? AND memberID = ?`, [interaction.guild.id, interaction.member.id], async (err, req) => {
            argent = req[0].money;
            if(nb > argent){
                return interaction.reply("Vous ne possédez pas assez d'argent !")
            }else{
                if(win){
                    functionAddMoney(interaction.member.id, interaction.guild.id, ((nb * 1.5) - nb))
                    return interaction.reply(`Bien joué, vous avez gagné !\nVous avez misé ${numStr(nb)} et vous avez gagné ${numStr((nb * 0.5))} <:xenos_money:1021001754558615623>`);
                }else{
                    functionRemoveMoney(interaction.member.id, interaction.guild.id, nb)
                    return interaction.reply(`Dommage, vous avez perdu !\nVous venez de perdre ${numStr(nb)} <:xenos_money:1021001754558615623>`);
                }
            }
        })
    },
};