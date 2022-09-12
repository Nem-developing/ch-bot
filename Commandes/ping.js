const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".

module.exports = {
    name: 'ping',
    description: "Envoyer un message à un adhérent",
    execute(client, message, args){
    let début = Date.now();
    message.channel.send('Ping')
        .then((m) => m.edit(`Pong : **${Date.now() - début}**ms`));
    }
};


