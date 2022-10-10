module.exports = (client) => {
    client.user.setStatus('online')
    client.user.setPresence({
        game: {
            name: '!ch help | V22.9 | Made by Nem#2318',
            type: "Playing",
            url: ""
        }
    });
};
