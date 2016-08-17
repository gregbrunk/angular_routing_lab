var app = angular.module('wineApp', ['ngRoute']);

console.log('Angular is working.');

////////////
// ROUTES //
////////////
app.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
      templateUrl: '/templates/wines-index.html',
      controller: 'WinesIndexCtrl'
    })
    .when('/wines/:id', { 
    templateUrl: 'templates/wines-show.html',
    controller: 'WinesShowCtrl'
  });
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});

/////////////////
// CONTROLLERS //
/////////////////
WinesIndexCtrl.$inject = ['$scope','$http'];
app.controller('WinesIndexCtrl', WinesIndexCtrl);
function WinesIndexCtrl($scope, $http){
  console.log("Wine Index");
  $http.get("http://daretoexplore.herokuapp.com/wines/")
        .then(function(response){ $scope.wines = response.data; });
}

WinesShowCtrl.$inject = ['$scope', '$http', '$routeParams'];
app.controller('WinesShowCtrl', WinesShowCtrl);
function WinesShowCtrl($scope, $http, $routeParams){
    $http.get("http://daretoexplore.herokuapp.com/wines/" + $routeParams.id)
        .then(function(response){ $scope.wine = response.data; });
}