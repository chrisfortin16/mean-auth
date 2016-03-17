myApp.controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);

myApp.controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);

/* development for order page, get user to fill out form and place an order they can see on their accout page*/
myApp.controller('orderController', ['$scope', '$http', function ($scope, $http) {

  $scope.orderForm = {};
  $scope.orderForm.fullname = "Bob Burgers";
  $scope.orderForm.phone = 666;
  $scope.orderForm.address = "111 blvd";
  $scope.orderForm.zip = 32707;
  $scope.orderForm.amount = "4 Gallons";
  $scope.orderForm.message = "Blahhhh"

  $scope.creteOrder = function() {
    //console.log("Form Data", $scope.orderForm);
    $http.post('/api/order', $scope.orderForm).then( function(response){
        console.log("DATA PRINTED", response);
    })
  };
}]);


myApp.controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);
