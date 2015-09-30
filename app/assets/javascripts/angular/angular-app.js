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

// app.run(function($rootScope, Auth){
//   console.log('RUN');
//   console.log(Auth.isAuthenticated());
//   Auth.login({
//     email: 'admin@admin.com',
//     password: "qwer1234"
//   }).then( function () {
//     console.log('Log in')
//   }).then(function(){
//     console.log('recovered session')
//   }, function (e){
//     console.log(e.status)
//     console.log('error')
//   })
// })