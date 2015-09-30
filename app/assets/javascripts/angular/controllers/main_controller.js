app.controller('MainCtrl', function ($scope, $http, lists, tasks, Auth, $location, $timeout) {
'use strict';

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

    $scope.processLoadComplete = function (el) {
      el.editing = false;
      el.loading = true;
      console.log('loading true')
      return function (el) {
        // emulate slow connection to display spinner
        // $timeout(function(){
          console.log('loading false')
          el.loading = false;
        // }, 500)
      }
    }

    $scope.processNewTaskCreation = function(list){
      if(list.newTask) {
        console.log('processing start')
        return $scope.processLoadComplete(list);
      }
    }

    $scope.handleUpdateAllTasks = function (list) {
    // a piece of iife-seaf-omg-wtf madness
      $scope.updateAllTasks(list,
        (function () {
        list.editing = false;
          return function () {
              $timeout(function(){
                list.loading = false;
              }, 500);
            }
          })(),
        function(){
          list.loading = true;
        });
    }

    lists.getAll();
  }, function () {
    $location.path('/login');
  });

});