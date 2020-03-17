const Discord = require('discord.js');
const client = new Discord.Client();
const token = require("./token.json");
const badlist = require("./badlist.json")
const superagent = require('superagent');
client.commands = new Discord.Collection();
const fs = require('fs');

fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }     
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});


client.on("message", (message) => {
    if (message.content.startsWith("<@!430395704268161025>")) {
        message.channel.send("Qui me veut ? Tu veut de l'aide ? Fait : `!ch fr`.");
    }
    if (message.content.startsWith("Chrétien-Fr")) {
      message.channel.send("Pourquoi parles-tu du meilleur bot de l'univers ? (je suis objectif, promis !)");
    }
    if (message.content.startsWith("chrétien-Fr")) {
        message.channel.send("Pourquoi parles-tu du meilleur bot de l'univers ? (je suis objectif, promis !)");
    }
    if (message.content.startsWith("Ch-Fr")) {
      message.channel.send("Pourquoi parles-tu du meilleur bot de l'univers ? (je suis objectif, promis !)");
    }
    if (message.content.startsWith("ch-fr")) {
      message.channel.send("Pourquoi parles-tu du meilleur bot de l'univers ? (je suis objectif, promis !)");
    } 
    if (message.content.startsWith("WHO MADE CH-FR ?")){
     message.channel.send("@Nem#2318 made me.");
    }
    if (message.content.startsWith("valea")){
     message.channel.bulkDelete(1);
     message.channel.send("+random").then(msg => msg.delete(1000));    }
    if (message.content.startsWith("ALEA")){
     message.channel.bulkDelete(1);
     message.channel.send("+random").then(msg => msg.delete(1000));    }

    
	
	
	
  });

client.on('messageDelete', message => {
    console.log(`le message : "**${message.cleanContent}**" a été suprimé du salon : ${message.channel.name} à ${new Date()} de : ${message.author}`);
    client.channels.get("682716557176340682").send({
        embed: {
            color: 3447003,
            author: {
                name: client.user.username,
                icon_url: message.author.avatarURL
            },
            title: "Message suprimé !",
            url: "",
            fields: [{
                name: "`Auteur du message :`",
                value: `${message.author.username}`
            },
            {
                name: "`Message :`",
                value: `**${message.cleanContent}**`
            },
            {
                name: "`Heure`",
                value: new Date()
            },
            {
                    name: "`CHANEL:`",
                    value: `#${message.channel.name}`
            }],
            timestamp: new Date(),
            footer: {
                icon_url: message.author.avatarURL,
                text: "© Chrétiens-FR - DELETED MESSAGE !"
            }
        }

    })
})



 client.on("message", msg => {
	let wordArray = msg.content.split("  ");
	console.log(wordArray);

     let filterWords = (badlist.liste) // Ici j'ai placé la liste dans un fichier appart, cela permet de rendre le code plus propre et sans grot mots d'ailleurs.
	for (var i = 0; i < filterWords.length; i++)
	{
		if (wordArray.includes(filterWords[i]))
		{
      msg.delete();    
      msg.channel.send(
        `Désolé ${
          msg.author.username
        }, Vous n'utilisez pas un language correct...`).then(msg => msg.delete(5000));
      msg.channel.startTyping();
      msg.channel.send(`!ch warn ${msg.author} Propos Obscènes`)
    } 
	}
})

client.login(token.token);
