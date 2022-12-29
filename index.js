const fs = require('fs');
const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials
} = require('discord.js');
const config = require('./src/config/config.json');
const clientId = config.client.id;
const token = config.client.token;
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const db = require("./src/database/database");
const commandHandler = require('./src/handlers/commands');
const eventHandler = require('./src/handlers/events');


const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.User,
        Partials.Reaction,
        Partials.Message,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
    ],
});

client.slashCommands = new Collection();
client.cooldown = new Collection();

commandHandler(client);
eventHandler(client);

db.connect(function (err) {
    if (err) throw err;
    console.log("La base de donnée est bien connectée.");
})
client.login(token)