module.exports = (client) => {
    client.user.setPresence({
        game: {
            name: "!ch help | V1.5.2 | Made by Nem#2318" // Texte affich� dans la liste des membres du serveur et sur le profile du bot.
        }
    });
};
