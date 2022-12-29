const Discord = require('discord.js');



module.exports = {
    name: "pfc",
    description: "Vous permet de jouer au pierre, feuille, ciseau.",
    category: "fun",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],

    async execute(interaction, client, db, emoji, color) {

        const joueur1 = interaction.member;
        let choix;
        let execaut = false;
        let victoire;
        let choixBotDef;
        let image;
        const choixBot = Math.round(Math.random() * 2);
        if (choixBot === 0) choixBotDef = "pierre";
        if (choixBot === 1) choixBotDef = "feuille";
        if (choixBot === 2) choixBotDef = "ciseau";

        const embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setTitle('La partie peut commencer')
            .setDescription(`C'est au tour de ${joueur1.user.username} de jouer !\nQue le meilleur gagne !`)

        const slt1 = new Discord.ActionRowBuilder().addComponents(new Discord.SelectMenuBuilder()
            .setCustomId('select1')
            .setPlaceholder('Rien de séléctionné')
            .addOptions({
                label: 'Pierre',
                description: 'Selectionne la pierre',
                value: 'PFCfirst_option',
            }, {
                label: 'Feuille',
                description: 'Selectionne la feuille',
                value: 'PFCsecond_option',
            }, {
                label: 'Ciseau',
                description: 'Selectionne le ciseau',
                value: 'PFCthird_option',
            }, ),
        )
        interaction.reply({
            embeds: [embed],
            components: [slt1]
        })
            client.on("interactionCreate", (sm) => {
                if (!sm.isSelectMenu()) return;
                if (sm.member.id !== joueur1.id) return;
                if (sm.customId === 'select1') {
                    if (sm.values[0] === "PFCfirst_option") {
                        choix === "pierre";
                        if (choixBotDef === "pierre") victoire = "fait execaut avec moi ! Nous sommes décidement connectés ^^"
                        if (choixBotDef === "feuille") victoire = "perdu !", image = "https://image.jimcdn.com/app/cms/image/transf/dimension=556x10000:format=jpg/path/s514f5da4e9213ba6/image/ib7b032955c89fc91/version/1509960368/progressive-muskelentspannung-progressive-muskelrelaxation.jpg";
                        if (choixBotDef === "ciseau") victoire = "gagné !", image = "https://th.bing.com/th/id/R.f74e535cd92f7f08a7af9177078dd0cb?rik=IW6%2fHZadO1TTDQ&riu=http%3a%2f%2fstatic.pulzo.com%2fimages%2f20180509194613%2fpiedra-papel-o-tijera-897x485.jpg%3fitok%3d1525959447&ehk=Vxy0%2bLqlU2ZiMeXgFcuJYZ3fxEJMSSD8gX%2bUIzNTjhU%3d&risl=&pid=ImgRaw&r=0";
                        const embedF = new Discord.EmbedBuilder()
                            .setColor(color)
                            .setTitle("Les résultats sont arrivés !")
                            .setDescription(`Vous avez jouer \`la pierre\` et j'ai joué : ${choixBotDef}\nVous avez donc ${victoire}`)
                            .setImage(image)

                        sm.message.edit({
                            embeds: [embedF],
                            components: []
                        })
                    }
                }

                if (sm.values[0] === "PFCsecond_option") {
                    choix === "feuille";
                    if (choixBotDef === "feuille") victoire = "fait execaut avec moi ! Nous sommes décidement connectés ^^"
                    if (choixBotDef === "ciseau") victoire = "perdu !", image = "https://www.handimania.com/uploads/rock-paper-scissors-728x381.jpg";
                    if (choixBotDef === "pierre") victoire = "gagné !", image = "https://th.bing.com/th/id/OIP.QqhxYMYEaK2oVPxelQACZgHaEa?pid=ImgDet&rs=1";
                    const embedF = new Discord.EmbedBuilder()
                        .setColor(color)
                        .setTitle("Les résultats sont arrivés !")
                        .setDescription(`Vous avez jouer \`la feuille\` et j'ai joué : ${choixBotDef}\nVous avez donc ${victoire}`)
                        .setImage(image)

                    sm.message.edit({
                        embeds: [embedF],
                        components: []
                    })
                }


                if (sm.values[0] === "PFCthird_option") {
                    choix === "ciseau";
                    if (choixBotDef === "ciseau") victoire = "fait execaut avec moi ! Nous sommes décidement connectés ^^"
                    if (choixBotDef === "pierre") victoire = "perdu !", image = "https://www.i88good.com/archive/image/edcontent3/1443461404_177.jpg";
                    if (choixBotDef === "feuille") victoire = "gagné !", image = "https://th.bing.com/th/id/OIP.Ti9_ibTOc-kSunLN-iskJQHaE8?pid=ImgDet&w=1024&h=683&rs=1";
                    const embedF = new Discord.EmbedBuilder()
                        .setColor(color)
                        .setTitle("Les résultats sont arrivés !")
                        .setDescription(`Vous avez jouer \`le ciseau\` et j'ai joué : ${choixBotDef}\nVous avez donc ${victoire}`)
                        .setImage(image)

                    sm.message.edit({
                        embeds: [embedF],
                        components: []
                    })
                }

            })
        
    }
}