var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , path = require('path');

server.listen(process.env.PORT || 3000);

console.log(process.env);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/socketTest.html');
});
app.get('/socket.js', function (req, res) {
  res.sendfile(path.join(__dirname + '/../app/components/socket.io-client/dist/socket.io.js'));
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('clientNews', function (data) {
    socket.broadcast.emit('news', { data: data });
  });
});