const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".

module.exports.run = (client, message, args) => {
    const membre = message.mentions.members.first() || message.member;

    message.channel.send({
        embed: {
            color: 3447003,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: "Aide commandes du bot Chrétiens-FR",
            url: "",
            description: "Voici toutes les commandes que vous pouvez utiliser :",
            fields: [{
                name: "`!ch help`",
                value: "Vous affiche l'aide du bot."
            },
            {
                name: "`!ch stats`",
                value: "Affiche les statistiques d'un membre du serveur."
            },
            {
                name: "`!ch report`",
                value: "Vous permet de faire un rapport au staf suite au mauvais comportement d'autres usagers du serveur."
            },
            {
                name: "`!ch def [mot]`",
                value: "Affiche la définition du mot spécifié."
            },
            {
                name: "`ALEA`",
                value: "Affiche un verset biblique aléatoirement (Via @BibleBot#1110 créé par Elliott Pardee)."
            },
            {
                name: "`valea`",
                value: "Affiche un verset biblique aléatoirement (Via @BibleBot#1110 créé par Elliott Pardee)."
            },

            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "© Chrétiens-FR"
            }
        }

        })
    }

module.exports.help = {
    name: 'help'
};
