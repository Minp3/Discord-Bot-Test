const { ActivityType } = require("discord.js");
const logger = require("silly-logger");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    logger.success(`Ready! Logged in a ${client.user.tag}`);

    client.user.setActivity(`${client.guilds.cache.size} servers | /help`, {
      type: ActivityType.Watching,
    });
  },
};
