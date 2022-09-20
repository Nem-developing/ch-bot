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
        .then(function () {
            message.author.dmChannel.awaitMessages(response => message.content, {
                max: 1,
                time: 300000000,
                errors: ['time'],
            })
        .then((collected) => {
            // Envoie du raport au staff.
            console.log(collected)
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
