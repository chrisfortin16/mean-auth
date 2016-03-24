myApp.controller('loginController',
  ['$scope', '$location', 'AuthService', 'socket',
  function ($scope, $location, AuthService, socket) {
    console.log("socket", socket);

    socket.emit('new_order', 'Hello!')
    socket.on('add_order', function(order) {
      console.log(order)
    })
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
