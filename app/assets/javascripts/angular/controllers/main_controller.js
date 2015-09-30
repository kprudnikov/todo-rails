app.controller('MainCtrl', function ($scope, $http, lists, tasks, Auth, $location) {
'use strict';
  console.log("MainCtrl")

  console.info("$scope.user");
  console.info($scope.user);

  $scope.$on('devise:logout', function (e, user){
    console.log("Clear out scope");
    $scope.lists = [];
  });

  Auth.currentUser().then(function(){
    $scope.lists = lists.lists;
    $scope.updateList = lists.update;
    $scope.createList = lists.create;
    $scope.deleteList = lists.delete;

    $scope.createTask = tasks.createTask;
    $scope.destroyTask = tasks.destroyTask;
    $scope.updateTask = tasks.updateTask;
    $scope.handleTaskKeyBoardControls = tasks.handleTaskKeyBoardControls;
    $scope.moveTaskOneStep = tasks.moveTaskOneStep;
    $scope.updateAllTasks = tasks.updateAll;

    $scope.toggleEdit = function (resource) {
      resource.editing = resource.editing ? false : true;
    };
    console.log('get all')
    lists.getAll();
  }, function () {
    $location.path('/login');
  });

});