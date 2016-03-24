myApp.controller('receiptController',
  ['$scope', '$location', 'AuthService', '$routeParams', '$http', 'socket',
  function ($scope, $location, AuthService, $routeParams, $http, socket) {
    $scope.info = $routeParams.uuid;
    console.log("===CONNECTION ", socket);

    $http.get('/api/order/' + $scope.info)
    .success(function (data) {
      console.log("1", data)
      $scope.orderData = data;
    })
    .error(function (data) {
      console.log("2", data);
    });
}]);
