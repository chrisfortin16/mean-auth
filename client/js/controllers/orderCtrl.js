/* development for order page, get user to fill out form and place an order they can see on their accout page*/
myApp.controller('orderController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  // Auto fill the inputs because I am lazy and don't want to do it every time.
  $scope.orderForm = {};
  $scope.orderForm.fullname = "Bob Burgers";
  $scope.orderForm.phone = 666;
  $scope.orderForm.address = "111 blvd";
  $scope.orderForm.zip = 32707;
  $scope.orderForm.amount = "4 Gallons";
  $scope.orderForm.message = "Blahhhh"

  $scope.creteOrder = function() {
    $http.post('/api/order', $scope.orderForm).then( function(response){
        console.log("DATA PRINTED", response.data);
        var uuid = response.data;
        $location.path('/receipt/'+uuid);
    })
  };
}]);
