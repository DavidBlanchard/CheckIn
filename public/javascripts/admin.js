console.info('inside admin page.');

var socket = io();
var send = function(text) {
  socket.emit('msg', text);
};

socket.on('msg2', function(text) {
  console.warn(text);
});
