module.exports = (client) => {
    console.log("test")
    client.user.setActivity(`on ${client.guilds.cache.size} servers`);

};
