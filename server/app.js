const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);

const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('chat message', (msg) => {
    console.log('Message: ', msg);
  });
});

app.use(express.static(path.join(__dirname, '../public')));

server.listen(5000, function() {
  console.log('Listening on port -> 5000');
});

