#!/usr/bin/env node

var debug = require('debug')('passport-mongo');
var app = require('./app');

var http = require('http').createServer(app);
var io = require('socket.io')(http);


// Sockets
require('./routes/socket')(io)

app.set('port', process.env.PORT || 3000);


var server = http.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
