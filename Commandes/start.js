const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".

module.exports.run = (client, message, args) => {
    if (!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) {
        return;
    }


    // Premièrement on doit récuperer l'id du channel actuel.
    let channel = message.channel;
    let roles = message.guild.roles; // collection
    const aderants = message.guild.roles.cache.find(r => r.name === 'Adhérent');


    // On retire la vue pour les nouveaux du salon "Ouverture-Fermeture".
    channel.permissionOverwrites.edit(aderants, { SEND_MESSAGES: true });


    message.channel.send(`__**Tchat ré-ouvert !**__`)



};

module.exports.help = {
    name: 'start'
};


