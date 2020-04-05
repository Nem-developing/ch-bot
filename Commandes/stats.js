const Discord = require('discord.js'); // Import de la bibliothèque "discord.js".
const moment = require('moment');


module.exports.run = (client, message, args) => {
    const membre = message.mentions.members.first() || message.member;
    if (!membre) { return message.channel.send('Veuillez mentionner un utilisateur !'); }

    message.channel.send({
        embed: {
            color: 3447003,
            title: `Statistiques de l'utilisateur **${membre.user.username}**`,
            thumbnail: {
                url: membre.user.displayAvatarURL
            },
            fields: [
                {
                    name: 'ID :',
                    value: membre.id 
                },
                {
                    name: 'Crée le :',
                    value: moment.utc(membre.user.createdAt).format("LL")
                },
                {
                    name: 'Jeu :',
                    value: membre.user.presence.game ? membre.user.presence.game.name : 'Aucun jeu'
                },
                {
                    name: 'Rejoin le :',
                    value: moment.utc(membre.joinedAt).format('LL')
                }
            ],
            footer: {
                text: `Informations de l'utilisateur ${membre.user.username}`
            }
        }
    });
};

module.exports.help = {
    name: 'stats'
};
