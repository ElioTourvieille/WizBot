const { loadCommands } = require("../../Handlers/CommandHandler");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await loadCommands(client);

        client.user.setActivity("Bot d'évaluation");
        console.log(`Logged in as ${client.user.tag}`);
    }
};