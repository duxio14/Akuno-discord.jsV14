const Discord = require('discord.js')

module.exports = {
    name: "hack",
    description: "Permet de simuler un hacking.",
    category: "fun",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    options: [
        {
            type: Discord.ApplicationCommandOptionType.User,
            name: "membre",
            description: "Veuillez selectionner le membre qui va se faire hacker.",
            required: true
        }
    ],

    async execute(interaction, client, db, emoji, color) {

        const ips = [
            '14.621.152.163.87.5',
            '96.492.139.149.12.8',
            '84.424.522.985.24.1',
            '82.245.242.874.83.13',
            '91.532.981.149.25.1',
            '24.123.091.134.24.4',
            '82.244.251.142.15.9',
            '21.981.847.109.12.3',
            '69.420.360.360.21.9',
            '87.242.081.018.24.6',
            '69.420.420.420.42.0',
            '92.487.293.748.92.3'
        ];

        const ccis = [
            '5430112115445621',
            '9283109176382620',
            '1384378743864386',
            '2473897583563753',
            '3978564875648756',
            '4878567578565787',
            '8573647365736573',
            '7756542654265426',
            '6789768976789878',
            '6942021360420699',
            '9874899483648346',
            '0876578976374634',
            '7374826537265742',
            '942i758265487562',
            '1432874628746328',
            '9876546789098765',
            '8765678908765467',
            '6784932483724232',
            '7867524725278527',
            '8765456789876545',
            '3647284257425423',
            '3209785839479982',
        ];

        const names = [
            'Josh',
            'Ronald',
            'Joe',
            'Liam',
            'Noah',
            'Oliver',
            'Henry',
            'James',
            'Alexander',
            'Hugh jass',
            'Mike croch',
            'Jeb',
            'Jawnothin',
            'Liam',
            'Mia',
            'Aria',
            'Daniel',
            'Sebastian',
            'Gabriel',
            'Jacob',
            'Elias',
            'Matthew',
            'Diamond',
            'cheise',
            'Peter',
        ];

        const email = 'tyraou@gmail.com';
        const ip = ips[Math.floor(Math.random() * ips.length)];
        const cci = ccis[Math.floor(Math.random() * ccis.length)];
        const name = names[Math.floor(Math.random() * names.length)];

        const user = interaction.options.getUser('membre');
        if(!user) return interaction.reply('Cet utilisateur n\'est pas dans le serveur !')

        let text = [
            `Je cherche le vrai nom de \`${user.username}`,
            `\`le vrai nom de ${user.username} est ${name}`,
            `je télécharge les SYNAPSE X`,
            `Je télécharge les donnés du compte Discord de \`${user.username}`,
            `\`L'email Discord de ${user.username} est : ${user.username}${email}`,
            `\`Le mot de passe Discord de ${user.username} est : ${user.username}${Math.round(Math.random() * 43455)}&%+`,
            `\`L'ip de ${user.username} est : ${ip}`,
            `Je télécharge les donnés bancaire de ${user.username}`,
            `\`les donnés CCI de ${user.username} sont : ${cci}`,
        ];

        interaction.channel.send(`**Hacking \`${user.username}\`**`).then((m1) => {
            m1.edit(`${m1.content}\n${text[0]}`).then((m2) => {
                setTimeout(() => {
                    m2.edit(`${m2.content}\n${text[1]}`).then((m3) => {
                        setTimeout(() => {
                            m3.edit(`${m3.content}\n${text[2]}`).then((m4) => {
                                setTimeout(() => {
                                    m4.edit(`${m4.content}\n${text[3]}`).then((m5) => {
                                        setTimeout(() => {
                                            m5.edit(`${m5.content}\n${text[4]}`).then((m6) => {
                                                setTimeout(() => {
                                                    m6.edit(`${m6.content}\n${text[5]}`).then((m7) => {
                                                        setTimeout(() => {
                                                            m7.edit(`${m7.content}\n${text[6]}`).then((m8) => {
                                                                setTimeout(() => {
                                                                    m8.edit(`${m8.content}\n${text[7]}`).then((m9) => {
                                                                        setTimeout(() => {
                                                                            m9.edit(`${m9.content}\n${text[8]}`).then((m10) => {
                                                                                setTimeout(() => {
                                                                                    m10.edit(`${m10.content}\n**Le hack est complété.**`);
                                                                                }, 2000);
                                                                            });
                                                                        }, 2000);
                                                                    });
                                                                }, 2000);
                                                            });
                                                        }, 2000);
                                                    });
                                                }, 2000);
                                            });
                                        }, 2000);
                                    });
                                }, 2000);
                            });
                        }, 2000);
                    });
                }, 2000);
            });
        })
    }
}