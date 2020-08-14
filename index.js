const Discord = require('discord.js'); // Import de la bibliothèque "discord.js".
const client = new Discord.Client()  // Création de la variable client.
const token = require("./jsons/token.json");  // Ici on cache le token dans le fichier token.json du répertoire courrant. (Cela me permet d'envoyer mon fichier Index.js vers GitHub sans me soucier.)
const badlist = require("./jsons/badlist.json")  // Ici on importe le fichier badlist.json pour une question d'hygiène de code.
client.commands = new Discord.Collection();  // Création de la variable commande.
const fs = require('fs');  // Import de la bibliothèque "FS".
const bd = require("./jsons/bd.json");  // Création de l'objet nous permetant de stocker le nombre de messages envoyées.

// Chargement des différentes commandes du fichier /Commandes

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

// Chargement des différents événements du fichier /Events

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }     
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});


// Message de bienvenue

client.on('guildMemberAdd', member => {
    member.send("__**Bienvenue à toi sur le serveur Chrétiens-FR !**__ \n\nL'équipe du staff de **CH-FR** te souhaite de passer de très bons moments !\nTu peux et dès ton arrivée, lire & accepter le <#564897331913162802> afin d'accéder au serveur. \n\nDès ton arrivée parmi nous tu pourras accéder au salon <#597917174975299593> qui va te permettre de sélectionner ta branche du christianisme mais également de te donner le rôle de Baptisé ou non. \n\n**Le staff de Chrétiens-FR** te souhaite de passer une très bonne aventure parmi les membres du serveur et d'y faire de très belles rencontres. \n\n\nL'équipe d'administration ♥.")
    client.channels.cache.get("682716557176340682").send(`**L'utilisateur ${member} à reçus un message de bienvenue !**`)
});

// Channels créés
client.on("channelCreate", function (user) {
    client.channels.cache.get("682716557176340682").send(`**Un message privé à été envoyé à ${user} !**`)
});

// Channels supprimées
client.on("channelDelete", function (channel) {
    client.channels.cache.get("682716557176340682").send(`**Le salon possédant l'identifiant : __${channel.id}__ à été suprimé !**`)
});

// Actions suite à une commande précise dans le tchat

client.on("message", (message) => {
    if (message.content.startsWith("<@!430395704268161025>")) { // Ici c'est l'identifiant du bot @CH-FR => Actions après son appel en mention.
        message.channel.send("Qui me veut ? Tu veux de l'aide ? Fait : `!ch help`.");
    }
    if (message.content.startsWith("Chrétien-Fr")) {
        message.channel.send("Qui me veut ? Tu veux de l'aide ? Fait : `!ch help`.");
    }
    if (message.content.startsWith("chrétien-Fr")) {
        message.channel.send("Qui me veut ? Tu veux de l'aide ? Fait : `!ch help`.");
    }
    if (message.content.startsWith("Ch-Fr")) {
        message.channel.send("Qui me veut ? Tu veux de l'aide ? Fait : `!ch help`.");
    }
    if (message.content.startsWith("ch-fr")) {
        message.channel.send("Qui me veut ? Tu veux de l'aide ? Fait : `!ch help`.");
    } 
    if (message.content.startsWith("WHO MADE CH-FR ?")){
      message.channel.send("<@!179640392432615425> m'a fait.");
    }
    if (message.content.startsWith("valea")){
     message.channel.bulkDelete(1);
     message.channel.send("+random").then(msg => msg.delete(1000));    }
    if (message.content.startsWith("ALEA")){
     message.channel.bulkDelete(1);
     message.channel.send("+random").then(msg => msg.delete(1000));    }	
  });
// Actions après un message supprimé vers le serveur.

client.on('messageDelete', message => {
    console.log(`le message : "**${message.cleanContent}**" a été suprimé du salon : ${message.channel.name} à ${new Date()} de : ${message.author}`);
    client.channels.cache.get("682716557176340682").send({
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

// Vérification de gros mots.

client.on("message", msg => {
    let wordArray = msg.content.split("  ");
    console.log(wordArray);

    let filterWords = (badlist.liste) // Ici j'ai placé la liste dans un fichier à part, cela permet de rendre le code plus propre et sans gros mots d'ailleurs.
    for (var i = 0; i < filterWords.length; i++) {
        if (wordArray.includes(filterWords[i])) {
            msg.delete();
            msg.channel.send(
                `Désolé ${
                msg.author.username
                }, Vous n'utilisez pas un language correct...`).then(msg => msg.delete(5000));
        }
    }
    
    // On incrémente la valeur.
    bd.messages = bd.messages + 1


    let messagesstats =
        {
        "messages": bd.messages
        }
    

    let donnees = JSON.stringify(messagesstats)
    fs.writeFileSync('./jsons/bd.json', donnees)
})

// Boucle permetant d'envoyer un message à une heure précise.
setInterval(function () {
    var date = new Date();
    var heure = date.getHours();
    var minutes = date.getMinutes();

    // A 23h59 il y a un message consernant le nombre de messages qui ont été envoyées sur le serveur.
    if (heure === 23 && minutes === 59) {
        client.channels.cache.get("742420195666165781").send(`⭐ Il y a eu **${bd.messages}** messages envoyés sur le serveur aujourd'hui ⭐`)

        let messagesstats =
        {
            "messages": 0
        }


        let donnees = JSON.stringify(messagesstats)
        fs.writeFileSync('./jsons/bd.json', donnees)
        bd.messages = 0

    }
	
    
    // Si c'est le début de soiré.
    if (heure === 20 && minutes === 00) {

        let channel1 = client.channels.cache.get('742803386793197637');
        let channel2 = client.channels.cache.get('564897331913162802');



        // On affiche la vue pour les nouveaux du salon "Ouverture-Fermeture".
        channel1.updateOverwrite(channel1.guild.roles.everyone, { VIEW_CHANNEL: true });

        // On retire la vue du règlement pour les nouveaux.
        channel2.updateOverwrite(channel2.guild.roles.everyone, { VIEW_CHANNEL: false });

        // On notifie le staff du changement
        client.channels.cache.get("695970749806149722").send("Le serveur est désormais **fermé** pour les __nouveaux__ !")


    }

    // Si c'est le jour
    if (heure === 07 && minutes === 00) {

        let channel1 = client.channels.cache.get('742803386793197637');
        let channel2 = client.channels.cache.get('564897331913162802');

        // On retire la vue pour les nouveaux du salon "Ouverture-Fermeture".
        channel1.updateOverwrite(channel1.guild.roles.everyone, { VIEW_CHANNEL: false });

        // On affiche le règlement pour les nouveaux.
        channel2.updateOverwrite(channel2.guild.roles.everyone, { VIEW_CHANNEL: true });

        // On notifie le staff du changement
        client.channels.cache.get("695970749806149722").send("Le serveur est désormais **ouvert** pour les __nouveaux__ !")

    }


}, 60000);


client.login(token.token);



//////////////////////////////////////////////////////////////////////////////////////////////////////
// 											            //
// Jouez franc-jeux quand vous utilisez et/ou modifiez le code d'un autre.                          //
// Même si le code est rendu public sous la lisence ISC.                                            //
// Cela relève de l'hygiène de développement de spécifier les créateurs d'un code original.         //
//                                                                                                  //
//                                                                                                  //
//                                                                                                  //
// Tennez en bonnes notes pour tout code récupéré sur mon GitHub                                    //
//                                                                                                  //
// --> Spécifiez le nom / pseudo                                                                    //
// --> Lien vers son GitHub : https://github.com/nem-developing                                     //
//                                                                                                  //
// (info) Je dis ceci dans le cadre du dévelopement et du partage du code du bot CH-FR              //
// cependant cela relève de la morale, ne faites pas ceci simplement pour moi mais pour             //
// tous les autres projets que vous réalisez en utilisant le code de quelqu'un d'autre.             //
//                                                                                                  //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                _______      _____________                 __           _______                       _______                    _________     _________     _________                  ____      //
//  |\      |    |            |      |      |               |   \        |           \            /    |           |              |         |   |         |        |      |\      |      /          //
//  | \     |    |            |      |      |               |     \      |            \          /     |           |              |         |   |         |        |      | \     |     /           //
//  |  \    |    |            |      |      |               |       \    |             \        /      |           |              |         |   |_________|        |      |  \    |     |           //
//  |   \   |    |=====       |      |      |     =====     |        |   |=====         \      /       |=====      |              |         |   |                  |      |   \   |     |     __    //
//  |    \  |    |            |      |      |               |       /    |               \    /        |           |              |         |   |                  |      |    \  |     |       |   //
//  |     \ |    |            |      |      |               |     /      |                \  /         |           |              |         |   |                  |      |     \ |      \      /   //
//  |      \|    |_______     |      |      |               |__ /        |_______          \/          |_______    |_________     |_________|   |              ____|____  |      \|       \____/    //
//                                                                                                                                                                                                  //
//                                                                                                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
