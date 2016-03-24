/* development for order page, get user to fill out form and place an order they can see on their accout page*/
myApp.controller('historyController', ['$scope', '$http', '$location', 'socket',
                  function ($scope, $http, $location, socket) {

  socket.emit('request_orders');

  socket.on('found_orders', function(orders) {
    console.log("FOUND DEZ: ", orders);
    $scope.orders = orders;
    console.log("COLLECTION: ", $scope.orders);
  })

  socket.on('add_order', function(order) {
    console.log("COLLECTION: ", $scope.orders);
    console.log("JUST ADDED: ", order);
    $scope.orders.push(order);
  })

}]);
