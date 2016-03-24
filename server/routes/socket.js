module.exports = function(io) {
  var orders = [];
  io.on('connection', function(socket) {
    console.log('HOLLA');
    socket.on('new_order', function(new_order) {
      console.log(new_order)
      // orders.push(order);
      io.emit('add_order', new_order);
    })
  })
}
