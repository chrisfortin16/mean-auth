myApp.controller('receiptController',
  ['$scope', '$location', 'AuthService', '$routeParams', '$http',
  function ($scope, $location, AuthService, $routeParams, $http) {
    $scope.info = $routeParams.uuid;
    //console.log("Route UUID ", $routeParams.uuid);

    $http.get('/api/order/' + $scope.info)
    .success(function (data) {
      console.log("1", data)
      $scope.orderData = data;
    })
    .error(function (data) {
      console.log("2", data);
    });
}]);
