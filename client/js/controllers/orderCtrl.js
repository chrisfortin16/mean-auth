/* development for order page, get user to fill out form and place an order they can see on their accout page*/
myApp.controller('orderController', ['$scope', '$http', '$location', 'socket',
                  function ($scope, $http, $location, socket) {

  // Auto fill the inputs because I am lazy and don't want to do it every time.
  $scope.orderForm = {};
  // auto fill form fields to make testing quicker
  // $scope.orderForm.fullname = "Bob Burgers";
  // $scope.orderForm.phone = 666;
  // $scope.orderForm.address = "111 blvd";
  // $scope.orderForm.zip = 32707;
  // $scope.orderForm.amount = "4 Gallons";
  // $scope.orderForm.message = "Blahhhh"

  $scope.creteOrder = function() {

    socket.emit('new_order', $scope.orderForm);

    // $http.post('/api/order', $scope.orderForm).then( function(response){
    //     console.log("DATA PRINTED", response.data);
    //     var uuid = response.data;
    //     $location.path('/receipt/'+uuid);
    // })
  };

  socket.on('add_order', function(order) {
    console.log("JUST ADDED: ", order)
    var uuid = order.uuid;
    $location.path('/receipt/'+uuid);
  })
}]);
