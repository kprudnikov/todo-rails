app.controller('NavCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location){
  console.log("NavCtrl")

  // Auth.currentUser().then(function (user){
  //   console.log("assigned")
  //   console.log(user.email)
  //   $scope.user = user;
  // });

  $scope.signedIn = Auth.isAuthenticated;
  $scope.logout = Auth.logout;

  $scope.$on('devise:new-registration', function (e, user){
    // $scope.signedIn = true;
    $scope.user = user;
  });

  $scope.$on('devise:new-session', function (e, user){
    console.log("new session")
    // $scope.signedIn = true;
    $scope.user = user;
  });

  $scope.$on('devise:login', function (e, user){
    // $scope.signedIn = true;
    $scope.user = user;
  });

  $scope.$on('devise:logout', function (e, user){
    // $scope.signedIn = false;
    $scope.user = {};
    console.log("LOGOUT");
    $location.path('/login')
  });

}]);