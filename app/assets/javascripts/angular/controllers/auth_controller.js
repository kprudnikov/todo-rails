app.controller('AuthCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location){
  console.log("AuthCtrl")

  Auth.currentUser().then(function(){
    $location.path('/home');
  });

  $scope.login = function() {
    Auth.login($scope.user).then(function(){
      $location.path('/home');
    });
  };

  $scope.register = function() {
    Auth.register($scope.user).then(function(){
      $location.path('/home');
    });
  };
}]);