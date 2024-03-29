const Discord = require('discord.js'); 
const prefix = '!ch';   

module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm')  return; 
    if (!message.content.startsWith(prefix)) return; 

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let commande = args.shift();
    let cmd = client.commands.get(commande);

    if (!cmd) { return; }
        cmd.run(client, message, args);
};