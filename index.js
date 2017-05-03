var express = require('express');
//var path = require('path');
var app = express();
var counter = 0;


app.set("views", __dirname + '/views');

app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.get('/a', function(req, res) {
  res.render('external.html');
});

app.get('/b', function(req, res) {
  res.render('game.html');
});

//app.use(express.static(path.join(__dirname, '')));

var server = app.listen(3002);
var io = require('socket.io')(server);
	console.log('listening on *:3001');

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('up', function(data) {

  	console.log('Current input received: up');

  });
  socket.on('right', function(data) {

    console.log('Current input received: right');

  });

  socket.on('down', function(data) {

    console.log('Current input received: down');

  });

  socket.on('left', function(data) {

    console.log('Current input received: left');

  });

});