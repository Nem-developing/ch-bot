const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".
const configfile = require('../config.json');

module.exports.run = (client, message, args) => {
    if (!message.member.roles.cache.has(configfile.role_staff)) {
        message.channel.send("Vous n'avez pas les perms nécessaires pour exécuter cette commande !")
        return;
	}
    if (!args[0]) {
        return message.channel.send("Veuillez spécifier un Adérent à averir  !\n\n Utilisation : `!ch alerte [membre_à_avertir]`");
    }
    

    let mentioned = message.mentions.users.first();	
    let erreur = 0;


    message.channel.send(`Veuillez spécifier le message d'avertissement concernant le membre : ${args[0]}`)

    wait(message,mentioned);


    
};


module.exports.help = {
    name: 'alerte'
};

const wait = async function(message,mentioned){
    const msg_filter = (m) => m.author.id === message.author.id;
    const collected = await message.channel.awaitMessages({ filter: msg_filter, max: 1, time: 15000 });

    if (collected){
        mentioned.send({
            embed: {
             "type": "rich",
             "title": `Quelqu'un a rapporté votre comportement - Chrétiens-FR`,
             "description": `Un membre du serveur Chrétiens-FR a souhaité rapporté votre comportement à l'équipe d'administration. Ci-dessous vous trouverez la raison de ce rapport !\n\n**Raison du raport :**\n${collected}\n\n**Informations supplémentaires :**\nLa commande de rapport peut-être exécuté par nimporte qui sur le serveur. N'ayez donc pas d'inquiétudes si vous n'avez rien fait.\n\n**Qu'est-ce qu'il se passe maintenant ?**\nSi ce rapport est bien fondé, vous receverez un avertissement ou un ban selon le motif de celui-ci. Cependant, si nous ne trouvons pas de fondement dans ce rapport vous n'aurez aucun soucis. Nous vous encourageons à respecter toutes les règles inscrites dans le règlement.\n\n**Toute l'équipe du staff vous remercie pour votre implication sur le serveur !**\n\n\n\n\n`,
             "color": 0x00FFFF
           }
        })
        message.channel.send(`Le message : "_${collected}_" a bien été envoyé à ${args[0]} !`);
    } else {
        message.channel.send(`Vous n'avez pas spécifié de message à envoyer ou vous n'avez pas bien mentionné l'utilisateur concerné, l'envoie est annulé...`);
    }

    return 
}