app.controller('AuthCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location){
  console.log("AuthCtrl")

  Auth.currentUser().then(function(){
    $location.path('/home');
  });

  function success () {
    $location.path('/home');
  }

  function loginFail () {
    alert('I have no memory of these credentials. Please check login and password');
  }

  function registerFail () {
    alert('Something went wrong.');
  }

  $scope.login = function() {
    Auth.login($scope.user).then(success, loginFail);
  };

  $scope.register = function() {
    Auth.register($scope.user).then(success, registerFail);
  };
}]);