const configfile = require('./config.json');
module.exports = (client) => {
    client.user.setActivity(`!ch help | Version ${configfile.version} | Made by Nem#2318`);
};
