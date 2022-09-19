const Discord = require('discord.js'); // Import de la bibliothèque "discord.js".
const moment = require('moment');

module.exports.run = (client, message, args) => {
    const membre = message.mentions.members.first() || message.member;
    if (!membre) { return message.channel.send('Veuillez mentionner un utilisateur !'); }
    message.channel.send(`Statistiques de l'utilisateur **${membre.user.username}** \n\n --> ID : **${membre.id}** \n --> Compte créé le **${moment.utc(membre.user.createdAt).format("LL")}** \n --> Présent sur Chrétiens-Fr depuis le **${moment.utc(membre.joinedAt).format('LL')}**`)
};

module.exports.help = {
    name: 'stats'
};
