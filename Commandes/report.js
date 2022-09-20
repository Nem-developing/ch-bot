const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".
const configfile = require('../config.json');

module.exports.run = (client, message, args) => {
     
    let mentioned = message.mentions.users.first();
    if (!args[0]) {
        return message.channel.send("Veuillez spécifier un membre à report au staff  !\n\n Utilisation : `!ch report [@membre_à_report]`");
    }
    if (args[1]) {
        return message.channel.send("Vous utilisez trop d'arguments !\n\n Utilisation : `!ch report [@membre_à_report]`");
    }
    if (!mentioned) {
        return message.channel.send("Vous devez __**mentioner**__ l'utilisateur à report !\n\n Utilisation : `!ch report [@membre_à_report]`");
    }
    
    
    // Information publique
    message.channel.send(`Nous vous invitons à consulter vos messages privés pour continuer la procédure...`)

   
    // Envoie du message au rapporteur
    message.author.send(`Veuillez spécifier le message à rapporter au staff concernant le membre : ${args[0]} (Exemple : Ce membre m'a insulté).\n\n\n**__(Faites attentions, Le staff pourait vous banir si il décrète que vous mentez)__**`)
    const msg_filter = (m) => m.author.id === message.author.id;
    message.author.dmChannel.awaitMessages({ filter: msg_filter, max: 1 })
    .then((collected) => {
        console.log(collected)
    });




    message.author.send(`Veuillez spécifier le message à rapporter au staff concernant le membre : ${args[0]} (Exemple : Ce membre m'a insulté).\n\n\n**__(Faites attentions, Le staff pourait vous banir si il décrète que vous mentez)__**`)
        .then(function () {
            message.author.dmChannel.awaitMessages(response => message.content, {
                max: 1,
                time: 300000000,
                errors: ['time'],
            })
        .then(collected => {
            // Envoie du raport au staff.
            // Message à l'utilisateur raporté.
            var embed2 = {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Quelqu'un a rapporté votre comportement - Chrétiens-FR",
                url: "",
                description: "Un membre du serveur Chrétiens-FR a souhaité rapporté votre comportement à l'équipe d'administration. Ci-dessous vous trouverez la raison de ce rapport !",
                fields: [{
                    name: "**Raison du raport :**",
                    value: `__*${collected.first().content}*__\n\n    `
                },
                {
                    name: "**Informations supplémentaires !**",
                    value: "La commande de rapport peut-être exécuté par nimporte qui sur le serveur. N'ayez donc pas d'inquiétudes si vous n'avez rien fait."
                },
                {
                    name: "**Qu'est-ce qu'il se passe maintenant ?**",
                    value: "__Si ce rapport est bien fondé, vous receverez un avertissement ou un ban selon le motif de celui-ci. Cependant, si nous ne trouvons pas de fondement dans ce rapport vous n'aurez aucun soucis. Nous vous encourageons à respecter toutes les règles inscrites dans le <#564897331913162802>.__ \n\n**Toute l'équipe du staff vous remercie pour votre implication sur le serveur !**"
                },

                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Chrétiens-FR"
                }
            }
            client.channels.cache.get(configfile.salon_ch_logs).send(`Le membre ${message.author} vous rapporte les faits suivant consernant l'utilisateur ${args[0]} :\n\n**${collected.first().content}**`);
            message.author.send({ embeds: [embed2] });
            client.channels.cache.get(configfile.salon_ch_logs).send({ embeds: [embed2] });
            message.author.send(`Le rapport à bien été envoyé au staff ! (Merci pour votre aide !)`);
        })
            .catch(function () {
                message.channel.send(`Vous n'avez pas spécifié de message à envoyer ou vous n'avez pas bien mentionné l'utilisateur concerné, l'envoie est annulé...`);
            });
    })
};


module.exports.help = {
    name: 'report'
};
