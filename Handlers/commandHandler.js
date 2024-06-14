const {loadFiles} = require("../Function/fileLoader");

async function loadCommands(client) {
    const ascii = require('ascii-table');
    const table = new ascii().setHeading('Command', 'Load status');

    await client.commands.clear();
    let commandsArray = [];

    const Files =  await loadFiles("Commands");

    Files.forEach((file) => {
        const command = require(file);
        client.commands.set(command.data.toJSON())
        table.addRow(command.data.name, '✅');
    })

    await client.application.commands.set(commandsArray);
    return console.log(table.toString(), "Commands loaded");
}



module.exports = { loadCommands }