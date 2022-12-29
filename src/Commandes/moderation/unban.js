const Discord = require('discord.js');

module.exports = {

    name: "unban",
    description: "Permet d'unbannir un utilisateur.'",
    category: "modération",
    ownerOnly: false,
    fondateurOnly: false,
    userPerms: ["SendMessages", "BanMembers"],
    botPerms: ["SendMessages", "BanMembers"],
    options: [
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "membre",
            description: "Veuillez envoyer l'id, le tag ou le pseudo compet ou incomplet de l'utilisateur à unbannir.",
            required: true
        }
    ],

    async execute(interaction, client, db, emoji, color) {
        const user = interaction.options.getString('membre');
        const bans = await interaction.guild.bans.fetch();
        const user_ban = bans.find(u => u.user.tag.toLowerCase().includes(user) || u.user.id === user || u.user.username.toLowerCase().includes(user));

        if (!user_ban) return interaction.reply('Je n\'ai pas trouvé cette utilisateur !\nEssayez en envoyant un identifient ou un pseudo (une partie suffie).');
        interaction.guild.members.unban(user_ban.user).then(() => {
            interaction.reply(` \`\`${user_ban.user.username}\`\` **à été unbannis par** ${interaction.member}. <a:check:970291516906025001>`)
        })
    }
};