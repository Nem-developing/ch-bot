const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".
const bd = require("../jsons/bd.json");  // Création de l'objet nous permetant de stocker le nombre de messages envoyées.

module.exports.run = (client, message, args) => {
   
    message.channel.send(`⭐ Il y a eu **${bd.messages}** messages envoyés sur le serveur aujourd'hui ⭐`)

};


module.exports.help = {
    name: "info"
};
