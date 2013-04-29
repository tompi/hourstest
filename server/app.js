var express = require('express');
var path = require('path');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var app = module.exports = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
  
  /*
  var events = require('events');
var eventEmitter = new events.EventEmitter();
var ringBell = function ringBell() {
  console.log('ring ring ring');
};
eventEmitter.on('doorOpen', ringBell);
eventEmitter.emit('doorOpen');
*/
  
server.listen(process.env.PORT || 3000);

//app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('secrethourscookie_hmm'));
app.use(express.cookieSession());
app.use(express.compress());
app.use(express.static(path.join(__dirname, '../app')));
app.use(app.router);

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.set('log level', 2);

var db = require('./db.js');

var angularBridge = new(require('angular-bridge'))(app, {
  urlPrefix: '/api/'
});

angularBridge.addResource('customers', db.Customer);
angularBridge.addResource('projects', db.Project);

io.sockets.on('connection', function(socket) {
  db.on('customerAdded', function(customer) {
    socket.emit('customerAdded', customer);
  });
});
