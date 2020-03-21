module.exports = (client) => {
    client.user.setPresence({
        game: {
            name: "!ch help | V3.20.33 | Made by Nem#2318" // Texte affiché dans la liste des membres du serveur et sur le profile du bot.
        }
    });
};
