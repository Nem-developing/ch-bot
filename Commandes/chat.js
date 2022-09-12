const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".
const request = require('request');

module.exports = {
    name: 'chat',
    description: "Envoyer un message à un adhérent",
    execute(client, message, args){
	if (!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) { return message.channel.send('Vous n\'avez pas les permissions !'); }
	request.get('http://thecatapi.com/api/images/get?format=src&type=png', {

	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			message.channel.send(response.request.uri.href);
		} else {
			console.log(error);
		}
	})
	}
};
