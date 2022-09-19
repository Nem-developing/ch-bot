const Discord = require('discord.js'); // Import de la bibliothèque "discord.js".
const moment = require('moment');

module.exports.run = (client, message, args) => {
    const membre = message.mentions.members.first() || message.member;
    if (!membre) { return message.channel.send('Veuillez mentionner un utilisateur !'); }

    message.channel.send(`Statistiques de l'utilisateur **${membre.user.username}**`)
    message.channel.send(`--> ID : ${membre.id}`)
    message.channel.send(`--> Compte créé depuis le ${moment.utc(membre.user.createdAt).format("LL")}`)
    message.channel.send(`--> Membre du serveurs depuis le ${moment.utc(membre.joinedAt).format('LL')}`)


};

module.exports.help = {
    name: 'stats'
};
