var express = require("express");
var Request = require('request');
var bodyParser = require('body-parser');
var _ = require('underscore');
var favicon = require('serve-favicon');
var counter = 0;

//Create an 'express' object
var app = express();

app.set("views", __dirname + '/views');
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));

// Enable json body parsing of application/json
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
// Start the server & save it to a var
var server = app.listen(port);
//Pass the server var as an arg to the 'io' init requirement
var io = require('socket.io')(server);
console.log('Express started on port ' + port);

/*-----
ROUTES
-----*/
//Main Page Route

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/a', function(req, res) {
  res.render('external.html');
});

app.get('/b', function(req, res) {
  res.render('game.html');
});

//Main Socket Connection
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('control', function(data) {
      console.log('receinved');
  	if(data > 0) {
        socket.broadcast.emit('sending data', data)
        console.log('workied');
    }else{
  	    socket.broadcast.emit('sending stop', 0);
    }
  });


});

