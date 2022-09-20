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
    const msg_filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages({
        filter: msg_filter,
        max: 1
    });

    message.author.send(`Veuillez spécifier le message à rapporter au staff concernant le membre : ${args[0]} (Exemple : Ce membre m'a insulté).\n\n\n**__(Faites attentions, Le staff pourait vous banir si il décrète que vous mentez)__**`)
    const msg_filter = (m) => m.author.id === message.author.id;
    let collected = await message.dmChannel.awaitMessages(filter, { max: 1, time: 400000 });
    console.log(collected)

};


module.exports.help = {
    name: 'report'
};
