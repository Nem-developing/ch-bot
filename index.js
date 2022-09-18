    const Discord = require('discord.js');

    const { Client, GatewayIntentBits, Partials } = require('discord.js');

    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions],
        partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    });

    const token = require("./jsons/token.json");  
    const fs = require('node:fs');  
    const bd = require("./jsons/bd.json");  
    const reacts = require('./jsons/reactions.json'); 
    const configfile = require('./config.json');
    client.commands = new Discord.Collection();
    client.events = new Discord.Collection();
    client.aliases = new Discord.Collection();


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

    // LOGS
    client.on('messageCreate', message => {
        console.log(message.content);
    });



    // Message de bienvenue
    client.on('guildMemberAdd', member => {
        member.send("__**Bienvenue à toi sur le serveur Chrétiens-FR !**__ \n\nL'équipe du staff de **CH-FR** te souhaite de passer de très bons moments !\nTu peux et dès ton arrivée, lire & accepter le <#1009531135602200587> afin d'accéder au serveur. \n\nDès ton arrivée parmi nous tu pourras accéder au salon <#597917174975299593> qui va te permettre de sélectionner ta branche du christianisme mais également de te donner le rôle de Baptisé ou non. \n\n**Le staff de Chrétiens-FR** te souhaite de passer une très bonne aventure parmi les membres du serveur et d'y faire de très belles rencontres. \n\n\nL'équipe d'administration ♥.");
        client.channels.cache.get(configfile.salon_ch_logs).send(`**L'utilisateur ${member} à reçus un message de bienvenue !**`);
    });

    // Channels créés
    client.on("channelCreate", function (user) {
        client.channels.cache.get(configfile.salon_ch_logs).send(`**Un message privé à été envoyé à ${user} !**`);
    });

    // Channels supprimées
    client.on("channelDelete", function (channel) {
        client.channels.cache.get(configfile.salon_ch_logs).send(`**Le salon possédant l'identifiant : __${channel.id}__ à été suprimé !**`);
    });

    // Actions suite à une commande précise dans le tchat
    client.on("messageCreate", (message) => {
        if (message.content.startsWith("<@430395704268161025>")) { // Ici c'est l'identifiant du bot @CH-FR => Actions après son appel en mention.
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
        if (message.content.startsWith("WHO MADE CH-FR ?")) {
            message.channel.send("<@!179640392432615425> m'a fait :) !");
        }


        // On incrémente la valeur.
        bd.messages = bd.messages + 1;

        let messagesstats =
        {
            "messages": bd.messages
        };


        let donnees = JSON.stringify(messagesstats);
        fs.writeFileSync('./jsons/bd.json', donnees);
    });

    // Actions après un message supprimé vers le serveur.
    client.on('messageDelete', message => {
        if (!message.author) return; // On ignore les messages qui ne sont pas en cache.
        console.log(`le message : "**${message.cleanContent}**" a été suprimé du salon : ${message.channel.name} à ${new Date()} de : ${message.author}`);
        client.channels.cache.get(configfile.salon_ch_logs).send({
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

        });
    });




    // Boucle permetant d'envoyer un message à une heure précise.
    setInterval(function () {
        var date = new Date();
        var heure = date.getHours();
        var minutes = date.getMinutes();

        // A 23h59 il y a un message consernant le nombre de messages qui ont été envoyées sur le serveur.
        if (heure === 23 && minutes === 59) {
            console.log("test");
            client.channels.cache.get(configfile.salon_decompte).send(`⭐ Il y a eu **${bd.messages}** messages envoyés sur le serveur aujourd'hui ⭐`);

            let messagesstats =
            {
                "messages": 0
            };


            let donnees = JSON.stringify(messagesstats);
            fs.writeFileSync('./jsons/bd.json', donnees);
            bd.messages = 0;

        }


        // Si c'est le début de soiré.
        if (heure === 20 && minutes === 00) {

            let channel1 = client.channels.cache.get(configfile.ouverture_fermeture);
            let channel2 = client.channels.cache.get(configfile.salon_reglement);



            // On affiche la vue pour les nouveaux du salon "Ouverture-Fermeture".
            channel1.updateOverwrite(channel1.guild.roles.everyone, { VIEW_CHANNEL: true });

            // On retire la vue du règlement pour les nouveaux.
            channel2.updateOverwrite(channel2.guild.roles.everyone, { VIEW_CHANNEL: false });

            // On notifie le staff du changement
            client.channels.cache.get(configfile.salon_ch_logs).send("Le serveur est désormais **fermé** pour les __nouveaux__ !");


        }

        // Si c'est le jour
        if (heure === 07 && minutes === 00) {

            let channel1 = client.channels.cache.get(configfile.ouverture_fermeture);
            let channel2 = client.channels.cache.get(configfile.salon_reglement);

            // On retire la vue pour les nouveaux du salon "Ouverture-Fermeture".
            channel1.updateOverwrite(channel1.guild.roles.everyone, { VIEW_CHANNEL: false });

            // On affiche le règlement pour les nouveaux.
            channel2.updateOverwrite(channel2.guild.roles.everyone, { VIEW_CHANNEL: true });

            // On notifie le staff du changement
            client.channels.cache.get(configfile.salon_ch_logs).send("Le serveur est désormais **ouvert** pour les __nouveaux__ !");

        }


    }, 60000);


    client.on('messageReactionAdd', (reaction, user) => {
        console.log("Une Réaction a été ajoutée !")
        // Si on est pas dans un serveur ou que l'utilisateur fait réagire un bot
        if (!reaction.message.guild || user.bot) return;

        // Test sur le message (si le message fait partit des messages qui sont compris dans notre fichier json)
        const reactionRoleElem = reacts.reactionRole[reaction.message.id];
        if (!reactionRoleElem) return;

        // Si c'est un emoji custom on utilise la propriété id, sinon name.
        const prop = reaction.emoji.id ? 'id' : 'name';

        // Ici, c'est l'égalité entre l'émoji fait en réaction et ceux dans les fichiers jsons.
        const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop]);

        // Si l'égalité est bien exacte alors on peut bel et bien retirer le role corespondant.
        if (emoji) {


            const role = reaction.message.guild.roles.cache.find(r => r.id === emoji.roles); // On récupère le rôle avec son ID

            const { guild } = reaction.message // On stoque la guild

            const member = guild.members.cache.find(member => member.id === user.id); // On recherche le membre qui a fait la réaction via son ID

            member.roles.add(role);  // On ajoute le rôle au compte de l'utilisateur

            member.send(`**Le rôle __${emoji.nom}__ vous a été attribué !**`);

            client.channels.cache.get(configfile.salon_ch_logs).send(`**Le rôle ${emoji.nom} a été ajouté à ${user} !**`);

        }

        // Si l'émoji n'existe pas dans nos donneés, on retire la réaction.
        else reaction.users.remove(user);
    });

    client.on('messageReactionRemove', (reaction, user) => {
        // Si on est pas dans un serveur ou que l'utilisateur fait réagire un bot.
        if (!reaction.message.guild || user.bot) return;

        // Test sur le message (si le message fait partit des messages qui sont compris dans notre fichier json)
        const reactionRoleElem = reacts.reactionRole[reaction.message.id];
        if (!reactionRoleElem || !reactionRoleElem.removable) return;

        // Si c'est un emoji custom on utilise la propriété id, sinon name.
        const prop = reaction.emoji.id ? 'id' : 'name';

        // Ici, c'est l'égalité entre l'émoji fait en réaction et ceux dans les fichiers jsons.
        const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop]);

        // Si l'égalité est bien exacte alors on peut bel et bien retirer le role corespondant.
        if (emoji) {

            const role = reaction.message.guild.roles.cache.find(r => r.id === emoji.roles); // On récupère le rôle avec son ID

            const { guild } = reaction.message // On stoque la guild

            const member = guild.members.cache.find(member => member.id === user.id); // On recherche le membre qui a fait la réaction via son ID

            member.roles.remove(role);  // On retire le rôle de l'utilisateur

            member.send(`**Le rôle __${emoji.nom}__ vous a été __retiré__ !**`);

            client.channels.cache.get(configfile.salon_ch_logs).send(`**Le rôle ${emoji.nom} a été retiré à ${user} !**`);
        };
    });







    client.login(token.token);


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
