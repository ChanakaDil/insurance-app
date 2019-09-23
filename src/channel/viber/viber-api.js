'use strict';
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const bot = new ViberBot({
    authToken: "47272c96f9e7d001-e50bcbdfc9da5403-9f72ba94aacee42e",
    name: "Wollstra",
    avatar: "http://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    response.send(message);
});