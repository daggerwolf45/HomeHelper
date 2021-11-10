/*
    Misc Requirements
*/
const apiKeys = require("./keys.json");
const fs = require('fs');

/*
    Setup HomeAssistant
*/

/*
    Setup Discord
*/
const Discord = require('discord.js');

const bIntents = new Discord.Intents();
//bIntents.add(Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS)

const client = new Discord.Client({ intents: ["DIRECT_MESSAGES", "GUILDS", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGES", "GUILD_EMOJIS_AND_STICKERS"], partials: ["CHANNEL"] });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

for (const handler of fs.readdirSync('./handlers/').filter(file => file.endsWith('.js'))){
    require(`./handlers/${handler}`)(client, Discord);
}




//Connect to Dicord
client.login(apiKeys.discordToken);