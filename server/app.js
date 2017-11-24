const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);

app.use(express.static(path.join(__dirname, '../public')));

app.listen(5000, function() {
  console.log('Listening on port -> 5000');
});

