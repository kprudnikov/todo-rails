app.controller('MainCtrl', function ($scope, $http, lists, tasks) {
'use strict';

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
    console.log('toggle');
    resource.editing = resource.editing ? false : true;
  };

  lists.getAll();

});