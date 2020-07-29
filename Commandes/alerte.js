const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".

module.exports.run = (client, message, args) => {
    if (!args[0]) {
        return message.channel.send("Veuillez spécifier un Adérent à averir  !\n\n Utilisation : `!ch alerte [membre_à_avertir]`");
    }

    if (!message.guild.member(message.author.id).hasPermission('MANAGE_ROLES')) { return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande !'); }



    let mentioned = message.mentions.users.first();	
    let erreur = 0;

    message.channel.send(`Veuillez spécifier le message d'avertissement concernant le membre : ${args[0]}`)
         .then(function(){
           message.channel.awaitMessages(response => message.content, {
             max: 1,
             time: 300000000,
             errors: ['time'],
           })
               .then((collected) => {
                   mentioned.send({
                       embed: {
                           color: 3447003,
                           author: {
                               name: client.user.username,
                               icon_url: client.user.avatarURL
                           },
                           title: "VOUS AVEZ REÇUS UN AVERTISSEMENT - Chrétiens-FR",
                           url: "",
                           description: "Un membre de l'équipe d'administration du serveur Chrétiens-Fr vous donne un avertissement. Ci-dessous vous trouverez la raison de votre avertissement !",
                           fields: [{
                               name: "**Raison de l'avetissement :**",
                               value: `__*${collected.first().content}*__\n\n    `
                           },
                           {
                               name: "**Informations supplémentaires !**",
                               value: "Vous avez le droit à un maximum de trois avertissement, nous pouvons également décider de vous banir directement sans prendre en compte votre seuil d'avertissement si nous considérons que vous avez trop enfreint le réglement."
                           },
                           {
                               name: "**Qu'est-ce qu'il se passe maintenant ?**",
                               value: "__Un avertissement vous a été délivré certes, mais cela ne change en rien vos droits sur le serveur, n'ayez donc pas peur de parler de nouveau tant que vous respecter toutes les règles inscrites dans le <#564897331913162802>.__ \n\n*Nous vous recomandons de bien prendre en compte cet avertissement en adaptant votre comportement !*\n\n**Toute l'équipe du staff vous remercie pour votre implication sur le serveur !**"
                           },

                           ],
                           timestamp: new Date(),
                           footer: {
                               icon_url: client.user.avatarURL,
                               text: "© Chrétiens-FR"
                           }
                       }

                   })
               })
             .catch(function(){
                 message.channel.send(`Vous n'avez pas spécifié de message à envoyer ou vous n'avez pas bien mentionné l'utilisateur concerné, l'envoie est annulé`);
                 erreur = 1
             });
         })
    if (erreur === 0) {
        message.client.send('L\'avertissement à bien été envoyé !')
    }
};


module.exports.help = {
    name: 'alerte'
};
