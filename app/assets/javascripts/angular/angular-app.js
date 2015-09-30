var app = angular.module('app', ['ngRoute', 'templates', 'Devise']);
app.config(['$routeProvider', function ($routeProvider) {
'use strict';
  $routeProvider.when('/home', {
    templateUrl: "todo-main.html",
    controller: 'MainCtrl'
  })
  .when('/login', {
    templateUrl: 'login.html',
    controller: 'AuthCtrl'
  })
  .when('/register', {
    templateUrl: 'register.html',
    controller: 'AuthCtrl'
  })
  .otherwise({
    redirectTo: "/login"
  })
}]);