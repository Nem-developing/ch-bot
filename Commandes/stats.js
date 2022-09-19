const Discord = require('discord.js'); // Import de la bibliothèque "discord.js".
const moment = require('moment');
const { EmbedBuilder } = require('discord.js');

module.exports.run = (client, message, args) => {
    const membre = message.mentions.members.first() || message.member;
    if (!membre) { return message.channel.send('Veuillez mentionner un utilisateur !'); }
    message.channel.send(membre.user.presence)



    const exampleEmbed = new EmbedBuilder()
        .setColor(3447003)
        .setTitle(`Statistiques de l'utilisateur **${membre.user.username}**`)
        .addFields(
            { name: 'ID :', value: membre.id },
            { name: 'Crée le :', value: moment.utc(membre.user.createdAt).format("LL") },
            { name: 'Rejoin le :', value: membre.id },
        )
        .setTimestamp()
        .setFooter({ text: `Informations de l'utilisateur ${membre.user.username}`});

    message.channel.send({ embeds: [exampleEmbed] });
};

module.exports.help = {
    name: 'stats'
};
