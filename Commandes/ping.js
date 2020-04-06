const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".

module.exports.run = (client, message, args) => {
    let début = Date.now();
    message.channel.send('Ping')
        .then((m) => m.edit(`Pong : **${Date.now() - début}**ms`));
};

module.exports.help = {
    name: 'ping'
};

module.exports.conf = {
    aliases: ["pong"]
};
