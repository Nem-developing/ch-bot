const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".

module.exports.run = (client, message, args) => {
    const membre = message.mentions.members.first() || message.member;

    const embed = {
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
                name: "`!ch stats <@membre>`",
                value: "Affiche les statistiques d'un membre du serveur."
            },
            {
                name: "`!ch report <@membre>`",
                value: "Vous permet de faire un rapport au staf suite au mauvais comportement d'autres usagers du serveur. Vous receverez un message privé. Vous n'aurez plus qu'a répondre à ce message avec la raison du report. (Prenez gardes à ne pas report sans raison valable. Si le staff se rend compte que vous raportez à tord, vous serez sanctionées !)"
            },
            {
                name: "`!ch def [mot]`",
                value: "Affiche la définition du mot spécifié."
            },

            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "© Chrétiens-FR"
            }
        }

        message.channel.send({ embeds: [embed] });
    }

module.exports.help = {
    name: 'help'
};
