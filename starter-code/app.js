var app = angular.module('wineApp', ['ngRoute', 'ngResource']);

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
WinesIndexCtrl.$inject = ['$scope', 'Wines'];
app.controller('WinesIndexCtrl', WinesIndexCtrl);
function WinesIndexCtrl($scope, Wines){
  // Wines.query(function(wines){ $scope.wines = wines; });
  $scope.wines = Wines.query();
}

WinesShowCtrl.$inject = ['$scope','$routeParams', 'Wines'];
app.controller('WinesShowCtrl', WinesShowCtrl);
function WinesShowCtrl($scope, $routeParams, Wines){
  // Wines.get({id: $routeParams.id}, function(response){ $scope.wine = response.data; });
  $scope.wine = Wines.get({id: $routeParams.id});
}

Wines.$inject = ['$resource'];
app.factory("Wines", Wines);
function Wines ($resource){
  return $resource("http://daretoexplore.herokuapp.com/wines/:id");
}