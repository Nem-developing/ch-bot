const Discord = require('discord.js'); // Import de la bibliothéque "discord.js".

module.exports = {
    name: 'calme',
    description: "Envoyer un message à un adhérent",
    execute(client, message, args){

    if (!message.guild.member(message.author.id).hasPermission('MANAGE_ROLES')) { return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande !'); }
    
    let mentioned = message.mentions.members.first();
    
    if (!args[0]) {
        return message.channel.send("Veuillez spécifier un membre à mettre au calme !\n\n Utilisation : `!ch calme [@membre_à_mettre_au_calme]`");
    }
    if (args[1]) {
        return message.channel.send("Vous utilisez trop d'arguments !\n\n Utilisation : `!ch calme [@membre_à_mettre_au_calme]`");
    }
    if (!mentioned) {
        return message.channel.send("Vous devez __**mentioner**__ l'utilisateur à mettre au calme !\n\n Utilisation : `!ch calme [@membre_à_mettre_au_calme]`");
    }
    
    
    // On appele la fonction choix.
    choix();
    
    function choix(){
        // On donne les deux choix d'au calme.
        message.channel.send(`⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐\n\n__**Vous avez deux possiblités :**__\n\n     Répondez **1** pour mettre le membre <@&661607580585558027>\n     Répondez **2** pour mettre le membre <@&748898262098116669>\n     Répondez **stop** pour annuler\n\n⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐`)
            .then(function () {
            message.channel.awaitMessages(response => message.content, {
                max: 1,
                time: 10000,
                errors: ['time'],
            })
        .then((collected) => {
            
                // conversion de l'ojet en chaine de carractère/
                let auteur = `${collected.first().author}`;
                
                // Si l'utilisateur envoyait deux fois d'affilées la même commande, alors, il y avait une boucle infinie de message
                // Cette condition corrige cette erreur (et l'explique aux utilisateurs pour ne pas qui répète l'erreur)

                if ( auteur === '<@430395704268161025>'){   
                    // On supprime le méssage précédent.
                    message.channel.bulkDelete(3);
                    // On stop la boucle en indiquant l'erreur.
                    return message.channel.send("**:warning: :warning: :warning: :warning: ATENTION :warning: :warning: :warning: :warning: \n\n\nUn problème est survenue ! (N'oubliez pas de bien dire stop si vous ne poursuivez pas l'opération de mise au calme ! Cette erreur apparait car le bot se répond à lui-même, pour faire simple, il atendait une réponse de votre part, et en relanceant une autre fois la même commande, le bot serait en boucle perpetuelle, donc faites très atention la prochaine fois :heart: !**)**"); 
                }
            
                

           
                
                if (collected.first().content == 1) {
                    // Si il choisi la première possiblité ! 
                    
                    // On assimile des variables pour les rôles adérents & aucalmeun
                    const roleaderant = message.guild.roles.cache.find(role => role.id === "615260431975448579");
                    const roleaucalmeun = message.guild.roles.cache.find(role => role.id === "661607580585558027");
                    
                    // On Supprime le rôle adhérent
                    mentioned.roles.remove(roleaderant);
                    // On Ajoute le rôle Au calme 1
                    mentioned.roles.add(roleaucalmeun);
                    // On avertie du succès de l'opération.
                    message.channel.send(`Le membre **${mentioned}** à bien été transféré au calme **1** !`);

                    
                    
                } else if (collected.first().content == 2) {
                    // Si il choisi la deuxième possiblité !     

                    // On assimile des variables pour les rôles adérents & aucalmedeux
                    const roleaderant = message.guild.roles.cache.find(role => role.id === "615260431975448579");
                    const roleaucalmedeux = message.guild.roles.cache.find(role => role.id === "748898262098116669");

                    // On Supprime le rôle adhérent
                    mentioned.roles.remove(roleaderant);
                    // On Ajoute le rôle Au calme 2
                    mentioned.roles.add(roleaucalmedeux);
                    // On avertie du succès de l'opération.
                    message.channel.send(`Le membre **${mentioned}** à bien été transféré au calme **2** !`);
                    
                } else if (collected.first().content == "stop") {
                // Si l'opération est annulée !
                  return message.channel.send(`Oppération annulée ! Bonne journée :ok_hand: `);
                } else {
                // Sinon, on fait une boucle pour qu'il choisisse correctement.
                    message.channel.send(`**======================================================**\n\n${message.author}, vous ne devez répondre que **1** ou **2** !\n\n Répondez **stop** pour __annuler l'opération__ !\n\n**======================================================**`);
                    choix();
                }
            })
            .catch(function () {
                message.channel.send(`Vous avez mit trop de temps pour terminer la mise au calme, l'envoie est **annulé**...`);
            });
    })   
    }
}
};
