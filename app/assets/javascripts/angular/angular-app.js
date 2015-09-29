var app = angular.module('app', ['ngRoute', 'templates']);
app.config(['$routeProvider', function ($routeProvider) {
'use strict';
  $routeProvider.when('/', {
    templateUrl: "todo-main.html",
    controller: 'MainCtrl'
  })
  .otherwise({
    redirectTo: "/"
  })
}]);