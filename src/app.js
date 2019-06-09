const express = require("express");
const bodyParser = require('body-parser');
const config = require("config");

const cors = require('cors');
const app = express();

// app.use(express.static('public'));
// app.use('/api', 
//         bodyParser.json(),
//         cors(), 
//         require('./router'));

// app.listen(config.server.port, () => {
//     console.log(`app started at port ${config.server.port}`);
// });

var WebSocketServer = new require('ws');

// подключенные клиенты
var clients = {};

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
  port: config.server.port
});
webSocketServer.on('connection', function(ws) {

  var id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on('message', function(message) {
    console.log('получено сообщение ' + message);

    for (var key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

});