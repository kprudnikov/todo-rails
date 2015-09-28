//= require angular
//= require angular-route
//= require angular-rails-templates
//= require_tree ./angular
//= require_tree ../templates/
//= require_tree .

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

app.controller('MainCtrl', function ($scope, $http, lists, tasks) {
'use strict';

  $scope.lists = lists.lists;
  $scope.updateList = lists.update;
  $scope.createList = lists.create;
  $scope.deleteList = lists.delete;

  $scope.createTask = tasks.createTask;
  $scope.destroyTask = tasks.destroyTask;
  $scope.updateTask = tasks.updateTask;

  lists.getAll();

  $scope.toggleEdit = function (resource) {
    resource.editing = resource.editing ? false : true;
  };

  $scope.handleTaskKeyBoardControls = tasks.handleTaskKeyBoardControls;

});

app.factory('lists', ['$http', '$timeout', function ($http, $timeout){
'use strict';

  var listsPath = "/api/v1/lists/";

  var lists = {
    lists: []
  }

  function getListPath (list) {
    return listsPath+list.id;
  }

  lists.getAll = function () {
    return $http.get(listsPath)
    .then(function(response){
      angular.copy(response.data, lists.lists)
    },
    function(response){
      alert(response.status);
    });
  }

  lists.update = function (list) {

    list.loading = true;

    $http.put(getListPath(list), {title: list.title})
    .error(function (data, status){
      alert("Not found or access denied");
      list.loading = false;
    })
    .success(function () {
      // $timeout(function(){
        list.loading = false;
      // }, 500);
    });

    return false;
  }

  lists.create = function () {
    $http.post(listsPath)
    .success(function (data) {
      data.editing = true;
      lists.lists.push(data);
    });
  }

  lists.delete = function (list) {
    list.loading = true;

    $http.delete(getListPath(list))
    .success(function(){
      list.loading = false;

      var listIndex = lists.lists.indexOf(list)
      lists.lists.splice(listIndex, 1);
    })
    .error(function(){
      list.loading = false;
      alert("Not found");
    });
  }

  return lists;

}]);

app.factory('tasks', ['$http', '$log', function ($http, $log){
'use strict';

  var listsPath = "/api/v1/lists/";
  var tasksPath = "/tasks/";

  var tasks = {
  };

  function getTaskPath (list, task) {
    var id = task ? task.id : ""
    return listsPath+list.id+tasksPath+id;
  };

  tasks.createTask = function (list) {
    list.tasks = list.tasks || [];
    $http.post(getTaskPath(list), {title: list.newTask})
    .success(function (data){
      list.tasks.push(data);
      list.newTask = "";
    })
    .error(function(data) {
      alert("List not found");
    });
  };

  tasks.destroyTask = function (list, task) {
    $http.delete(getTaskPath(list, task))
    .success(function (data) {
      var taskIndex = list.tasks.indexOf(task);
      list.tasks.splice(taskIndex, 1);
    })
    .error(function (data) {
      alert("Task not found");
    })
  };

  tasks.updateTask = function (list, task) {
    $http.put(getTaskPath(list, task), task)
    .success(function(data){
      task.editing = false;
    })
    .error(function(data) {
      alert("Task not found");
    });
  };

  tasks.handleTaskKeyBoardControls = function (list, task) {
    // enter          13
    // delete         46
    // up             38
    // down           40
    var key = event.keyCode;
    // console.log(event.keyCode);
    if(key === 13) {
      task.editing = true;
    } else if (key === 46) {
      tasks.destroyTask(list, task);
    } else if (key === 38) {
      $log.log('Moving up');
    } else if (key === 40) {
      $log.log('Moving down');
    }

  }

  return tasks;

}]);