const Discord = require("discord.js"); // Import de la bibliothéque "discord.js".

module.exports.run = (client, message, args) => {
    // On met une couleur aléatoire dans la variable.
    var embedColor = Math.floor(Math.random() * 16777214) + 1


    // création d'un embed pour si l'utilisateur n'as pas assez de droits.
    var missingPermissionsEmbed = new Discord.RichEmbed()
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Permissions insuffisantes !')
        .setDescription('vous avez besoin de la permission `MANAGE_MESSAGES` pour utiliser cette commande !')
        .setTimestamp();



    // création d'un embed pour si l'utilisateur n'as mit assez d'arguments.
    var missingArgsEmbed = new Discord.RichEmbed()
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Arguments manquants !')
        .setDescription('Utilisation: !ch warn [@Utilisateur] [Raison]')
        .setTimestamp();


    // Si l'utilisateur n'as pas la permition "MANAGE_MESSAGES" on lui envoie le embed "missingPermissionsEmbed". (dans la condition le ! veut dire "inverse")
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(missingPermissionsEmbed);

    // On définie qui est l'utilisateur visé.
    let mentioned = message.mentions.users.first();


    // si il n'y a pas de menssion alors on envoie l'embed "missingArgsEmbed"
    if (!mentioned) return message.channel.send(missingArgsEmbed);

    // On définie que la raison est l'argument "1" est la raison du warn 
    // Info : "En informatique tout commence par 0" ici l'argument 1 c'est dans les faits le second argument.
    let reason = args.slice(1).join(' ')

    // Si il n'y a pas de raison alors on envoie l'embed "missingArgsEmbed"
    if (!reason) return message.channe.send(missingArgsEmbed);

    // diférents embed

    var warningEmbed = new Discord.RichEmbed()
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Avertissement pour dans ${message.guild.name}`)
        .addField('Averti par', message.author.tag)
        .addField('Raison', reason)
        .setTimestamp();


    var publicwarn = new Discord.RichEmbed()
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Un utilisateur a recus un avertissement, ne faites pas pareil !`)
        .addField('Averti par', message.author.tag)
        .addField('Raison', reason)
        .setTimestamp();

    var warnSuccessfulEmbed = new Discord.RichEmbed()
        .setColor(embedColor)
        .setTitle('Succès de l\'oppération !');


    mentioned.send(warningEmbed);  // On envoie en MP l'embed à l'utilisateur averti.
    message.channel.send(warnSuccessfulEmbed); // On confirme dans le tchat courant que le warn à été pris en compte.
    client.channels.cache.get("658348418816540723").send(publicwarn);     // envoie dans le channel d'id 658348418816540723 l'embed "publicwarn"


    message.delete(); // suprime le message qui appel le bot.
};

module.exports.help = {
    name: 'warn'
};

//////////////////////////////////////////////////////////////////////////////////////////////////////
// FROM ORIGINAL CODE : https://gist.github.com/ProYo2009/c36e65780b976c80bd2e75c8c1ad5ff2          //
// Jouez franc-jeux quand vous utilisez et/ou modifiez le code d'un autre.                          //
// Même si le code est rendu public sous la lisence ISC.                                            //
// Cela relève de l'hygiène de developpement de spécifier les créateurs d'un code original          //
//                                                                                                  //
//                                                                                                  //
//                                                                                                  //
// Tennez en bonne note pour tout codes récupéré sur mon GitHub                                     //
//                                                                                                  //
// --> Spécifiez le nom / pseudo                                                                    //
// --> Lien vers son GitHub : https://github.com/nem-developing                                     //
//                                                                                                  //
// (info) Je dit ceci dans le cadre du developement et du partage du code du bot CH-FR              //
// cependant cela relève de la morale, ne faites pas ceci simplement pour moi mais pour             //
// tout les autres projets que vous réalisé en utilisant le code de quelqu'un d'autre .             //
//                                                                                                  //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
