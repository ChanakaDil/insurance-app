var config = require("./../../config/" + (process.env.NODE_ENV || "development") + ".js");
const TelegramBot = require('node-telegram-bot-api');
var ioClient = require('socket.io-client')

var sockets = {};
var messageIds = new Array();

module.exports = {
    start: function () {
        const token = config.telegram.token;
        console.log(token);
        const bot = new TelegramBot(token, {
            polling: true
        });

        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            var socket;
            console.log(chatId + " : " + msg.text)
            socket = sockets[chatId];
            if (socket == null || socket == undefined) {
                socket = ioClient.connect(config.server.address + ':' + config.server.port);
                sockets[chatId] = socket;
            }
            socket.emit('messages', {
                "message": msg.text
            });
            socket.on('broad', function (data) {
                if (!messageIds.includes(msg.message_id)) {
                    bot.sendMessage(chatId, data);
                }
                messageIds.push(msg.message_id);
            });
        });
    }
}