app.factory('lists', ['$http', '$timeout', function ($http, $timeout){
'use strict';

  var listsPath = "/api/v1/lists/";

  var lists = {
    lists: []
  }

  function getListPath (list) {
    return listsPath+list.id;
  }

  lists.getAll = function (callback) {
    callback = callback || function () {};

    return $http.get(listsPath)
    .then(function(response){
      callback(response);
      angular.copy(response.data, lists.lists);
    },
    function(response){
      alert('Something went wrong', response.status);
    });
  }

  lists.update = function (list, callback) {
    callback = callback || function () {};

    // list.loading = true;
    // console.log(list)

    $http.put(getListPath(list), {title: list.title})
    .error(function (data, status){
      alert("Not found or access denied");
      callback(list);
    })
    .success(function () {
      callback(list);
    });

    return false;
  }

  lists.create = function (callback) {
    callback = callback || function () {};

    $http.post(listsPath)
    .success(function (data) {
      lists.lists.push(data);
      callback(data);
    });
  }

  lists.delete = function (list, callback) {
    callback = callback || function () {};

    // list.loading = true;

    $http.delete(getListPath(list))
    .success(function(data){

      var listIndex = lists.lists.indexOf(list)
      lists.lists.splice(listIndex, 1);
      callback(list);
    })
    .error(function(){

      alert("Not found");
      callback(list);
    });
  }

  return lists;

}]);