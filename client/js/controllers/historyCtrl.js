/* History Controller*/
myApp.controller('historyController', ['$scope', '$http', '$location', 'socket',
                  function ($scope, $http, $location, socket) {

  socket.emit('request_orders');

  socket.on('found_orders', function(orders) {
    console.log("FOUND ORDER: ", orders);
    $scope.orders = orders;
    console.log("COLLECTION1: ", $scope.orders);
  })

  socket.on('add_order', function(order) {
    console.log("COLLECTION2: ", $scope.orders);
    console.log("JUST ADDED: ", order);
    $scope.orders.push(order);
  })

}]);
