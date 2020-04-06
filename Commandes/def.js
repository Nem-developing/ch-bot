const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".
var unirest = require("unirest");
const dico = require("../jsons/dictionnaire.json")  // Consulter https://rapidapi.com/dicolink/api/dicolink & mettre votre key dans le fichier dictionnaire.json
 
module.exports.run = (client, message, args) => {
    if (!args[0]) {
        return message.channel.send("Veuillez spécifier un mot à définir !\n\n Utilisation : `!ch def [mot_à_deffinir]`"); }


	var req = unirest("GET", `https://dicolink.p.rapidapi.com/mot/${args[0]}/definitions?limite=4`);

	req.headers({
		"x-rapidapi-host": "dicolink.p.rapidapi.com",
        "x-rapidapi-key": dico.key
	});

    req.end(function (res) {
        try {
            console.log(res.body)                   // affichage de la réponsse complette de l'API
            var nature = "";                        // initialisation de la variable nature (type string)


            if (!res.body[0].nature) {              // Suite à un petit bug où le premier dictionnaire ne trouvait pas la nature, j'ai créé ce procédé pour éviter la présence d'un blanc dans la case "Nature".                                                   

                nature = "NONE"
            } else {
                nature = res.body[0].nature
            }
            if (!res.body[1].nature) {

                nature = "NONE"
            } else {
                nature = res.body[1].nature
            }
            if (!res.body[2].nature) {

                nature = "NONE"
            } else {
                nature = res.body[2].nature
            }
            if (!res.body[3].nature) {

                nature = "NONE"
            } else {
                nature = res.body[3].nature
            }
            if (nature === "NONE") {
                nature = "Nature indéfinie"
            }

            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: client.user.username
                    },
                    title: `Deffinition de __${args[0]}__ :`,
                    description: `Voici les differentes déffinitions du mot ${args[0]} :`,
                    fields: [{
                        name: "Source :",
                        value: `**${ res.body[0].source }**`,
                    },
                    {
                            name: "Nature :",
                            value: `__${ nature }__`,
                    },
                    {
                        name: `** Signification 1** :`,
                        value: `${ res.body[0].definition }`,
                    },
                    {
                        name: `** Signification 2** :`,
                        value: `${res.body[1].definition}`
                    },
                    {
                        name: `** Signification 3** :`,
                        value: `${res.body[2].definition}`
                    },
                    {
                            name: `** Signification 4** :`,
                            value: `${res.body[3].definition}`
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
			message.channel.send(`Le mot est inconue du dictionnaire dsl...`)
		}


	});
};

module.exports.help = {
    name: 'def'
};

module.exports.conf = {
aliases: ["definition","definitions"]
}
