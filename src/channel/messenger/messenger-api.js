var config = require("./../../config/" + (process.env.NODE_ENV || "development") + ".js");
const login = require("facebook-chat-api");
var ioClient = require('socket.io-client')

var sockets = {};
var messageIds = new Array();

module.exports = {
    start: function () {
        login({
            email: config.messenger.email,
            password: config.messenger.password
        }, (err, api) => {
            if (err) return console.error(err);
            api.setOptions({
                logLevel: "silent"
            });
            api.listen((err, message) => {
                if (err) {
                    return console.error("Unsupported Message!");
                }
                try {
                    var socket;
                    console.log(message.threadID + " : " + message.body)
                    socket = sockets[message.threadID];
                    if (socket == null || socket == undefined) {
                        socket = ioClient.connect(config.server.address + ':' + config.server.port);
                        sockets[message.threadID] = socket;
                    }
                    socket.emit('messages', {
                        "message": message.body
                    });
                    socket.on('broad', function (data) {
                        if (!messageIds.includes(message.messageID)) {
                            api.sendMessage(data, message.threadID);
                        }
                        messageIds.push(message.messageID);
                    });
                } catch (error) {
                    console.log(error);
                }
            });
        });
    }
}