/* Order Controller */
myApp.controller('orderController', ['$scope', '$http', '$location', 'socket',
                  function ($scope, $http, $location, socket) {

  $scope.orderForm = {};

  $scope.creteOrder = function() {
    socket.emit('new_order', $scope.orderForm);
  };

  socket.on('add_order', function(order) {
    console.log("JUST ADDED1: ", order)
    var uuid = order.uuid;
    $location.path('/receipt/'+uuid);
  })
}]);
