app.controller('NavCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location){
  console.log("NavCtrl")

  Auth.currentUser().then(function (user){
    $scope.user = user;
  });

  $scope.signedIn = Auth.isAuthenticated;
  $scope.logout = Auth.logout;

  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:new-session', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
    $location.path('/login')
  });

}]);