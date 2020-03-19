module.exports.run = (client, message, args) => { 
    if (!args.join(' ')) { return message.channel.send('Vous n\'avez spécifié aucun rôle !'); }
    if (!message.guild.member(message.author.id).hasPermission('MANAGE_ROLES')) { return message.channel.send('Vous n\'avez pas la permission de `gérer les rôles` !'); }
    if (!message.guild.member(client.user.id).hasPermission('MANAGE_ROLES')) { return message.channel.send('Vous n\'avez pas la permission de `gérer les rôles` !'); }
    
    let member = message.guild.member(message.author.id);
    let role = message.guild.roles.find((r) => r.name.toLowerCase() === args.join(' ').toLowerCase() || r.id === args.join(' '));

    if (!role) { return message.channel.send('Ce rôle n\'existe pas !'); }
    if (member.roles.has(role.id)) { return message.channel.send('Vous avez déjà ce rôle !'); }
    
        member.addRole(role.id)
            .then(() => message.channel.send('Vous avez désormais le rôle ' + role.toString()))
            .catch(console.error);
};

module.exports.help = {
    name: 'addrole'
};
