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
    wait(message,args,client,mentioned);
};


module.exports.help = {
    name: 'report'
};

const wait = async function(message,arg,client,mentioned){
    const msg_filter = (m) => m.author.id === message.author.id;
    const collected = await message.channel.awaitMessages({ filter: msg_filter, max: 1, time: 15000 });


    if (collected){
        let txt = {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "UN MEMBRE DU SERVEUR A RAPORTÉ VORTE COMPORTEMENT - Chrétiens-FR",
                url: "",
                description: "Un membre du serveur Chrétiens-Fr vient d'informer le staff de votre comportement. Vous trouverez ci-dessous la raison donnée par celui-ci !",
                fields: [{
                    name: "**Raison de l'avertissement :**",
                    value: `__*${collected.first().content}*__\n\n    `
                },
                {
                    name: "**Une erreur ?**",
                    value: "Un membre du staff va s'occuper de traiter l'affaire dans les plus brefs délais. Celui-ci vérifieras l'authenticité des propos de ce rapport."
                },
                {
                    name: "**Qu'est-ce qu'il se passe maintenant ?**",
                    value: "__Nous vous invitons à respecter toutes les règles inscrites dans le Règlement du serveur.__ \n\n"
                },

                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Chrétiens-FR"
                }
            }
        try {
            mentioned.send({ embeds: [txt] }).catch(e=>{console.log(`Error:\n${e}`)});;
            message.channel.send(`Le message : "**${collected.first().content}**" a bien été envoyé à ${arg} !`);
            client.channels.cache.get(configfile.salon_ch_logs).send(`**[REPORT]** : L'utilisateur ${message.author} avertis le staff concernant ${arg} via le motif suivant : **${collected.first().content}**`)
        } catch (error) {
            message.channel.send(`Une erreur est survenue`);
        }
            } else {
        message.channel.send(`Vous n'avez pas spécifié de message à envoyer ou vous n'avez pas bien mentionné l'utilisateur concerné, l'envoie est annulé...`);
    }
    return collected
}