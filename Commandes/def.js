const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".
var unirest = require("unirest");
const dico = require("../jsons/dictionnaire.json")  // Consulter https://rapidapi.com/dicolink/api/dicolink & mettre votre key dans le fichier dictionnaire.json
 
module.exports.run = (client, message, args) => {
    if (!args[0]) {
        return message.channel.send("Veuillez spécifier un mot à définir !\n\n Utilisation : `!ch def [mot_à_deffinir]`"); }


	var req = unirest("GET", `https://dicolink.p.rapidapi.com/mot/${args[0]}/definitions?limite=3`);

	req.headers({
		"x-rapidapi-host": "dicolink.p.rapidapi.com",
        "x-rapidapi-key": dico.key
	});

	req.end(function (res) {
		try {
			console.log(res.body)
			console.log("def 1")
			console.log(res.body[0].definition)
			console.log("def 2")
			console.log(res.body[1].definition)
			console.log("def 3")
			console.log(res.body[2].definition)

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: `Deffinition de ${args[0]}`,
                    description: `Voici les differentes déffinitions du mot ${args[0]} :`,
                    fields: [{
                        name: "Dictionnaire employé :",
                        value: `**${res.body[0].source}**`
                    },
                    {
                            name: "Nature :",
                            value: `__${res.body[0].nature}__`
                    },
                    {
                        name: "Signification 1 :",
                        value: `    ${res.body[0].definition}`
                    },
                    {
                        name: "Signification 2 :",
                        value: `    ${res.body[1].definition}`
                    },
                    {
                        name: "Signification 3 :",
                        value: `    ${res.body[2].definition}`
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: "© Chrétiens-FR"
                    }
                }
            });


		} catch (error) {
			console.error(res.error);
			message.channel.send(`Le mot est inconue du dico.`)
		}


	});
};

module.exports.help = {
    name: 'def'
};
