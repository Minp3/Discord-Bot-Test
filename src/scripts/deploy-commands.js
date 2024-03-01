const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, token } = require("../data/config.json");
const logger = require("silly-logger");

const commands = [];

const folders = fs.readdirSync("./src/commands");

for (const folder of folders) {
  const files = fs.readdirSync(`./src/commands/${folder}`);
  for (const file of files) {
    const command = require(`../commands/${folder}/${file}`);
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    logger.info(`
      Started refreshing ${commands.length} application (/) commands.
    `);

    const data = await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    logger.success(`
      Successfully reloaded ${data.length} application (/) commands.
    `);
  } catch (error) {
    logger.error(error);
  }
})();
