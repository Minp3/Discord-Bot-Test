//Aqui é o começo de tudo.

const fs = require("fs");
// fs significa FileSystem

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const logger = require("silly-logger");
// Em couchetes podemos colocar oque queremos apenas retirar do Discord.js
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});
//Aqui criamos um novo cliente com os intentes do mesmo que tiramos porem adicionando os Membros e os Servidores
client.commands = new Collection();

const { token } = require("./data/config.json");
//Essa constante está pedindo o token que está dentro do caminho fornecido.

logger.enableLogFiles(true);
logger.logFolderPath("./src/logs");

const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));
//Outra constante porem com EventFiles onde irá notificar/criar Eventos

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

const folders = fs.readdirSync("./src/commands");
for (const folder of folders) {
  const files = fs.readdirSync(`./src/commands/${folder}`);
  for (const file of files) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.data.name, command);
  }
}

client.login(token);
