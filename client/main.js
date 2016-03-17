var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      access: {restricted: false}
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .when('/history', {
      templateUrl: 'partials/history.html',
      access: {restricted: false}
    })
    .when('/contact', {
      templateUrl: 'partials/contact.html',
      access: {restricted: false}
    })
    .when('/order', {
      templateUrl: 'partials/order.html',
      controller: 'orderController',
      access: {restricted: true}
    })
    // .when('/receipt', {
    //   templateUrl: 'partials/receipt.html',
    //   controller: 'receiptController',
    //   access: {restricted: false}
    // })
    .otherwise({
      redirectTo: '/'
    });
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus();
      if (next.access.restricted &&
          !AuthService.isLoggedIn()) {
        $location.path('/login');
        $route.reload();
      }
  });
});
