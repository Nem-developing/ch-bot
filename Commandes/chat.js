const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".
const request = require('request');
const configfile = require('../config.json');


module.exports.run = (client, message, args) => {
    if (!message.member.roles.cache.has(configfile.role_staff)) {
        message.channel.send("Vous n'avez pas les perms nécessaires pour exécuter cette commande !")
        return;
	}	request.get('http://thecatapi.com/api/images/get?format=src&type=png', {

	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			message.channel.send(response.request.uri.href);
		} else {
			console.log(error);
		}
	})

};

module.exports.help = {
    name: 'chat'
};


