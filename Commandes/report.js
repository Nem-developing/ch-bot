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
    
    message.channel.send(`Veuillez spécifier le message à rapporter au staff concernant le membre : ${args[0]} (Exemple : Ce membre m'a insulté).\n\n\n**__(Faites attentions, Le staff pourait vous banir si il décrète que vous mentez)__**`)
    wait(message,arg,client);
};


module.exports.help = {
    name: 'report'
};

const wait = async function(message,arg,client){
    const msg_filter = (m) => m.author.id === message.author.id;
    const collected = await message.channel.awaitMessages({ filter: msg_filter, max: 1, time: 15000 });


    if (collected){
        let txt = {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "VOUS AVEZ REÇU UN AVERTISSEMENT - Chrétiens-FR",
                url: "",
                description: "Un membre de l'équipe d'administration du serveur Chrétiens-Fr vous donne un avertissement. Ci-dessous vous trouverez la raison de votre avertissement !",
                fields: [{
                    name: "**Raison de l'avertissement :**",
                    value: `__*${collected.first().content}*__\n\n    `
                },
                {
                    name: "**Informations supplémentaires !**",
                    value: "Vous avez le droit à un maximum de trois avertissements, nous pouvons également décider de vous bannir directement sans prendre en compte votre seuil d'avertissement si nous considérons que vous avez trop enfreint le réglement."
                },
                {
                    name: "**Qu'est-ce qu'il se passe maintenant ?**",
                    value: "__Un avertissement vous a été délivré certes, mais cela ne change en rien vos droits sur le serveur, n'ayez donc pas peur de parler de nouveau tant que vous respecter toutes les règles inscrites dans le <#564897331913162802>.__ \n\n*Nous vous recomandons de bien prendre en compte cet avertissement en adaptant votre comportement !*\n\n**Toute l'équipe du staff vous remercie pour votre implication sur le serveur !**"
                },

                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Chrétiens-FR"
                }
            }

        mentioned.send({ embeds: [embed] });
        message.channel.send(`Le message : "**${collected.first().content}**" a bien été envoyé à ${arg} !`);
        client.channels.cache.get(configfile.salon_ch_logs).send(`**[REPORT]** : L'utilisateur ${arg} a reçus l'avertissement suivant : **${collected.first().content}**`)
    } else {
        message.channel.send(`Vous n'avez pas spécifié de message à envoyer ou vous n'avez pas bien mentionné l'utilisateur concerné, l'envoie est annulé...`);
    }






    return collected
}