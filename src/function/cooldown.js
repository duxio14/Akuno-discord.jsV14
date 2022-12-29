const ms = require("ms");

module.exports = async (cooldown, cooldownTime, interaction) => {
  
    const timeLeft = ((parseInt(cooldown) + cooldownTime) - Date.now()) / 1000

    let seconde = (Math.round(timeLeft));
    let minute = (Math.round(timeLeft / 60))
    let heure = (Math.round((timeLeft / 60) / 60))
 
    let timeToSend;

    if (seconde > 60) {
        if (minute > 60) {
            timeToSend = "environ " + heure + " heure(s)";
        } else {
            timeToSend = "environ " + minute + " minute(s)";
        }
    } else {
        timeToSend = seconde + " seconde(s)";
    }

    return interaction.reply({content: `N'allez pas **trop vite** dans l'**execution** des cette commande s'il vous plaît !\nIl vous reste \`${timeLeft <= 1 ? "moin d'une seconde !" : timeToSend}\``, epehemeral: true});
}