var port = process.env.PORT || 3000;
const express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    fs = require("fs"),
    http = require("http"),
    app = express(),
    server = http.createServer(app);
var io = require('socket.io')(server);
var emails = [];
var jsonParser = bodyParser.json();

app.use(express.static('./public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
    console.log("conneced");
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

app.post("/api/tasks", jsonParser, (req, res) => {
    io.emit('new_task', req.body);
    res.end();
});
app.post('/webhook', jsonParser, (req, res, next) => {
    console.log("Here");
    console.log(req.body);
    try {
        var { date } = req.body.result.parameters;
        var { speech } = req.body.result.fulfillment;
        io.emit('new_task', date);
        return res.json({
            displayText: speech,
            speech: speech,
            source: "onechat-webhook"
        })
    } catch (e) {
        console.log(e);
        return next();
    }

});

// start app
server.listen(port, () => {
    console.log("running on port " + port);
});