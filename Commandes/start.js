const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".
const configfile = require('../config.json');

module.exports.run = (client, message, args) => {
    if (!message.member.roles.cache.has(configfile.role_staff)) {
        message.channel.send("Vous n'avez pas les perms nécessaires pour exécuter cette commande !")
        return;
	}



    // Premièrement on doit récuperer l'id du channel actuel.
    let channel = message.channel;
    let roles = message.guild.roles; // collection
    const aderants = message.guild.roles.cache.find(r => r.name === 'Adhérent');


    // On retire la vue pour les nouveaux du salon "Ouverture-Fermeture".
    channel.permissionOverwrites.edit(aderants, { SendMessages: true });


    message.channel.send(`__**Tchat ré-ouvert !**__`)



};

module.exports.help = {
    name: 'start'
};


