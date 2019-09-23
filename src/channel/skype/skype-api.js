var SkypeAPI = require('skypeapi');
var config = require("./../../config/" + (process.env.NODE_ENV || "development") + ".js");

module.exports = {
    start: function () {
        var skype = new SkypeAPI({
            username: config.skype.username,
            password: config.skype.password
        });

        skype.on('Chat', function (e) {
            skype.sendMessage(e.channel, e.content);
        });
    }
}