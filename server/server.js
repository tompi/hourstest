var express = require('express');
var path = require('path');
var app = module.exports = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);

server.listen(process.env.PORT || 3000);

app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('secrethourscookie_23sQPs4i8'));
app.use(express.cookieSession());
app.use(express.compress());
app.use(express.static(path.join(__dirname, '../client')));
app.use(app.router);

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.set('log level', 2);
// Disable websockets: (not supported by heroku hosting)
//io.set('transports', ['htmlfile', 'xhr-polling', 'jsonp-polling']);

var db = require('./db.js');

var angularBridge = new(require('angular-bridge'))(app, {
  urlPrefix: '/api/'
});

angularBridge.addResource('customers', db.Customer);
angularBridge.addResource('projects', db.Project);
angularBridge.addResource('hours', db.Hour);

// Setup socket.io events
io.sockets.on('connection', function(socket) {
  db.on('customerChanged', function(customer) {
    socket.emit('customerChanged', customer);
  });
  db.on('customerDeleted', function(customer) {
    socket.emit('customerDeleted', customer);
  });
});

var mers = require('mers');
app.use('/mersapi', mers({mongoose: db.mongoose}).rest());
