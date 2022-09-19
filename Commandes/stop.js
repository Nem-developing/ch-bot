const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".

module.exports.run = (client, message, args) => {
	if (!message.member.roles.cache.has('MANAGE_MESSAGES')) {
		return;
	}


    // Premièrement on doit récuperer l'id du channel actuel.
    let channel = message.channel;
    let roles = message.guild.roles; // collection
    const aderants = message.guild.roles.cache.find(r => r.name === 'Adhérent');



    // On retire la vue pour les nouveaux du salon "Ouverture-Fermeture".
    channel.permissionOverwrites.edit(aderants, { SEND_MESSAGES: false });


    message.channel.send(`======================================================`)
    message.channel.send(`**Un membre du staff vient de figer ce salon.**`)
    message.channel.send(`======================================================`)




};

module.exports.help = {
	name: 'stop'
};


