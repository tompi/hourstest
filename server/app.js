var express = require('express');
var path = require('path');
var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
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

var db = require('./db.js');

var angularBridge = new(require('angular-bridge'))(app, {
  urlPrefix: '/api/'
});

angularBridge.addResource('customers', db.Customer);
angularBridge.addResource('projects', db.Project);