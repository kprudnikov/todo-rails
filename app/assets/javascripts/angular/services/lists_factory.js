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
      alert('Something went wrong', response.status);
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
      $timeout(function(){
        list.loading = false;
      }, 100);
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