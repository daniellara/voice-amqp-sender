var amqp = require('amqplib');
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);

const io = require('socket.io').listen(server);
const q = 'queue';

amqp.connect('amqp://localhost')
  .then((conn) => conn.createChannel())
  .then((ch) =>  ch.assertQueue(q)
    .then((ok) => {
      io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
          console.log('Message: ', msg);
          ch.sendToQueue(q, new Buffer(msg));
        });
      });
    }))
  .catch((err) => {
    console.log(err);
  });

app.use(express.static(path.join(__dirname, '../public')));

server.listen(5000, function() {
  console.log('Listening on port -> 5000');
});

