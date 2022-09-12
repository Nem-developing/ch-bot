const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".

module.exports = {
    name: 'outcalme',
    description: "Envoyer un message à un adhérent",
    execute(client, message, args){
    if (!message.guild.member(message.author.id).hasPermission('MANAGE_ROLES')) { return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande !'); }
    
    let mentioned = message.mentions.members.first();
    
    if (!args[0]) {
        return message.channel.send("Veuillez spécifier un membre à remettre dans le serveur !\n\n Utilisation : `!ch outcalme [@membre_à_rendre_adhérent]`");
    }
    if (args[1]) {
        return message.channel.send("Vous utilisez trop d'arguments !\n\n Utilisation : `!ch outcalme [@membre_à_rendre_adhérent]`");
    }
    if (!mentioned) {
        return message.channel.send("Vous devez __**mentioner**__ l'utilisateur à mettre au calme !\n\n Utilisation : `!ch outcalme [@membre_à_rendre_adhérent]`");
    }
    
    // On assimile des variables pour les rôles adérents & aucalmeun é aucalmedeux
    const roleaderant = message.guild.roles.cache.find(role => role.id === "615260431975448579");
    const roleaucalmeun = message.guild.roles.cache.find(role => role.id === "661607580585558027");
    const roleaucalmedeux = message.guild.roles.cache.find(role => role.id === "748898262098116669");

    // On supprime les roles aucalmeun et aucalmedeux à l'utilisateur mentionné.
    mentioned.roles.remove(roleaucalmeun);
    mentioned.roles.remove(roleaucalmedeux);
    
    // On ajoute le role Adhérent à l'utilisateur mentionné.
    mentioned.roles.add(roleaderant);
    
    // On informe du succès de l'opération !
    message.channel.send(`Le membre **${mentioned}** à bien été réintégré sur le serveur !`);
    
    }
};


