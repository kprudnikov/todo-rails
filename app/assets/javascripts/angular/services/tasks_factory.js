app.factory('tasks', ['$http', '$timeout', '$log', function ($http, $timeout, $log){
'use strict';

  var listsPath = "/api/v1/lists/";
  var tasksPath = "/tasks/";

  var tasks = {
  };

  var debounce;

  function getTaskPath (list, task) {
    var id = task ? task.id : ""
    return listsPath+list.id+tasksPath+id;
  };

  function swapPriority (first, second) {
    var tempPriority = first.priority;
    first.priority = second.priority;
    second.priority = tempPriority;
  }

  function swapTasks (list, firstIndex, secondIndex) {
    var temp = list.tasks[firstIndex];

    list.tasks[firstIndex] = list.tasks[secondIndex];
    list.tasks[secondIndex] = temp;
  }

  function changePriorityBetween (list, movedTask, secondTask) {
    var movingIndex = list.tasks.indexOf(movedTask);
    var secondIndex = list.tasks.indexOf(secondTask);

    if (movingIndex > secondIndex) {
      while(movedTask.priority > secondTask.priority) {
        var currentIndex = list.tasks.indexOf(movedTask);
        var previousIndex = currentIndex-1;
        swapPriority(movedTask, list.tasks[previousIndex]);
        swapTasks(list, currentIndex, previousIndex);
      }
    } else {
      while(movedTask.priority < secondTask.priority) {
        var currentIndex = list.tasks.indexOf(movedTask);
        var nextIndex = currentIndex+1;
        swapPriority(movedTask, list.tasks[nextIndex]);
        swapTasks(list, currentIndex, nextIndex);
      }
    }
  };

  tasks.moveTaskOneStep = function (list, task, direction, callback) {
    callback = callback || function () {};
    direction = direction || 'up';
    if(direction === 'up') {
      var secondTask = list.tasks[list.tasks.indexOf(task)-1]
      if (secondTask) {
        changePriorityBetween(list, task, secondTask);
      }
    } else {
      var secondTask = list.tasks[list.tasks.indexOf(task)+1]
      if (secondTask) {
        changePriorityBetween(list, task, secondTask);
      }
    }
    callback(list);
  }

  tasks.createTask = function (list, callback, beforeUpdate) {
    callback = callback || function () {};
    beforeUpdate = beforeUpdate || function () {};

    beforeUpdate();

    list.tasks = list.tasks || [];
    if (list.newTask && list.newTask !== ""){
      $http.post(getTaskPath(list), {title: list.newTask})
      .success(function (data){
        $timeout(function (){
          list.tasks.push(data);
          list.newTask = "";
          console.log('createTask');
          callback(list);
        }, 500)
      })
      .error(function(data) {
        alert("List not found");
      });
    }
  };

  tasks.destroyTask = function (list, task, callback) {
    callback = callback || function () {};
    // task.loading = true;

    $http.delete(getTaskPath(list, task))
    .success(function (data) {
      var taskIndex = list.tasks.indexOf(task);
      list.tasks.splice(taskIndex, 1);
      callback(task);
    })
    .error(function (data) {
      alert("Task not found");
      callback(task);
    })
  };

  tasks.updateTask = function (list, task, callback) {
    callback = callback || function () {};
    // task.loading = true;

    $http.put(getTaskPath(list, task), task)
    .success(function(data){
      callback(task);
    })
    .error(function(data) {
      task.loading = false;
      alert("Task not found");
    });
  };

  tasks.updateAll = function (list, callback, beforeUpdate) {
    callback = callback || function () {};
    beforeUpdate = beforeUpdate || function () {};
    $timeout.cancel(debounce);

    debounce = $timeout(function () {
      beforeUpdate();
      // list.loading = true;
      var tasks = list.tasks.map(function (task){
        return {task: task};
      });

      $http.put(getTaskPath(list)+"all/update", tasks)
      .success(function(){
        callback(list);
      })
      .error(function () {
        alert("Failed to update tasks.");
        callback(list);
        // list.loading = false;
      })
    }, 800);
  }

  tasks.handleTaskKeyBoardControls = function (list, task, callback) {
    // enter          13
    // delete         46
    // up             38
    // down           40
    var key = event.keyCode;
    console.log(key)
    if(key === 13) {
      task.editing = true;
    } else if (key === 46) {
      tasks.destroyTask(list, task, callback);
    } else if (key === 38) {
      tasks.moveTaskOneStep(list, task, 'up');
      callback(list);
    } else if (key === 40) {
      tasks.moveTaskOneStep(list, task, 'down');
      callback(list);
    }
  };

  return tasks;

}]);