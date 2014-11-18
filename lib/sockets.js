var createSocket = require('socket.io');
var io;

exports.init = function(server) {
  io = createSocket(server);
  
  io.on('connection', function(socket) {
    socket.on('msg', function(text) {
      io.emit('msg2', 'you sent: ' + text);
    });
  });
};