const Discord = require('discord.js'); // Import de la librarie "Discord.js".
const prefix = '!ch';   // Ici on définie le préfix pour le chat. 

exports.run = async(client, message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
      
    let messageArray = message.content.split(" "),
       cmd = messageArray[0],
       args = messageArray.slice(1),
       commandfile = client.commands.get(cmd.slice(prefix.length)) || client.aliases.get(cmd.slice(prefix.length));
    
    if (!commandfile) return;    
    
    commandfile.run(client,message,args);             
  }