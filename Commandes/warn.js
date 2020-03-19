const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    var embedColor = Math.floor(Math.random() * 16777214) + 1



    var missingPermissionsEmbed = new Discord.RichEmbed()
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Permissions insuffisantes !')
        .setDescription('vous avez besoin de la permission `MANAGE_MESSAGES` pour utiliser cette commande !')
        .setTimestamp();




    var missingArgsEmbed = new Discord.RichEmbed()
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Arguments manquants !')
        .setDescription('Utilisation: !ch warn [@Utilisateur] [Raison]')
        .setTimestamp();



    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(missingPermissionsEmbed);



    let mentioned = message.mentions.users.first();



    if (!mentioned) return message.channel.send(missingArgsEmbed);


    let reason = args.slice(1).join(' ')


    if (!reason) return message.channe.send(missingArgsEmbed);



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


    mentioned.send(warningEmbed);
    message.channel.send(warnSuccessfulEmbed);
    client.channels.get("658348418816540723").send(publicwarn);


    message.delete();
};

module.exports.help = {
    name: 'warn'
};


// FROM ORIGINAL CODE : https://gist.github.com/ProYo2009/c36e65780b976c80bd2e75c8c1ad5ff2
// Jouez franc-jeux quand vous utilisez et/ou modifiez le code d'un autre.
// Même si le code est rendu public sous la lisence ISC.
// Cela relève de l'hygiène de developpement de spécifier les créateurs d'un code original
// 
//
//
// Tennez en bonne note pour tout codes récupéré sur mon GitHub 
//
// --> Spécifiez le nom / pseudo
// --> Lien vers son GitHub : https://github.com/nem-developing
//
// (info) Je dit ceci dans le cadre du developement et du partage du code du bot CH-FR
// cependant cela relève de la morale, ne faites pas ceci simplement pour moi mais pour
// tout les autres projets que vous réalisé en utilisant le code de quelqu'un d'autre .
// (info)
//
////////////////////////////////////////////////////////////////////////////////////////