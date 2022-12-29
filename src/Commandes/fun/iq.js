const Discord = require('discord.js');
const superagent = require('superagent');


module.exports = {
    name: "iq",
    description: "Permet de connaitre le qi d'une personne",
    category: "fun",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    options: [
        {
            type: Discord.ApplicationCommandOptionType.User,
            name: "membre",
            description: "Veuillez selectionner le membre.",
            required: false
        }
    ],

    async execute(interaction, client, db, emoji, color) {

        const membre = interaction.options.getMember('membre') || interaction.member;

        let iq = Math.round(Math.random() * 226);

        let image
       
            if(iq >= 150 && iq < 226) image = "https://th.bing.com/th/id/OIP.bkhnRBqTvn5nzJaVJ6GOJgHaHa?pid=ImgDet&rs=1";
            else if(iq === 226) image = "https://th.bing.com/th/id/R.4003cc36ff1ed9b180f6e16389b5b253?rik=ACI6w40vWmAOIg&pid=ImgRaw&r=0";
            else if(iq >= 100 && iq < 150) image = "https://th.bing.com/th/id/R.bb5ede96d818a0c1838e1ba8016bbf6b?rik=JTX5hQGRynNatQ&pid=ImgRaw&r=0&sres=1&sresct=1";
            else if(iq >= 50 && iq < 100) image = "https://img-ovh-cloud.zszywka.pl/1/0104/8243-normal-is.jpg";
            else if(iq < 50 && iq > 0) image = "https://i.ytimg.com/vi/34XKG1HPe6c/maxresdefault.jpg";
            else if(iq === 0) image = "https://th.bing.com/th/id/R.270faaadab5985a949e417bc314e1bc1?rik=J9WLyNhZYadYGw&pid=ImgRaw&r=0";
        
        const embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle(`${membre.user.username} a \`${iq}\` de **qi**`)
            .setImage(image)
        interaction.reply({
            embeds: [embed]
        })
    }
}