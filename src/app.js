var express = require('express');
var app = express();

var sessionHandler = require('./session/session-handler.js');
var responseHandler = require('./response/response-handler.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
    'pingTimeout': 4000
});
var session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});
var sharedSession = require("express-socket.io-session");
var config = require("./config/" + (process.env.NODE_ENV || "development") + ".js");
var messenger = require("./channel/messenger/messenger-api")
var telegram = require("./channel/telegram/telegram-api")
var skype = require("./channel/skype/skype-api")

app.use(session);
io.use(sharedSession(session));
server.listen(config.server.port);

// io.set('heartbeat interval', 8000);
// io.set('heartbeat timeout', 20000);

io.on('connection', function (client) {
    console.log('Client connected...!');
    try {
        client.on('messages', function (data) {
            console.log(data)
            sessionHandler.handleSession(client, data);
            var response = responseHandler.handleResponse(client);
            client.emit('broad', response);
        });
    } catch (err) {
        console.log(err.stack);
        delete client.handshake.session.userdata;
        client.handshake.session.save();
    }


    client.on('disconnect', function () {
        console.log("Client : " + client.id + " Disconnected!")
    });
});

messenger.start();
telegram.start();
//skype.start();

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});


// nodemon