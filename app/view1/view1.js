'use strict';

angular.module('myApp.view1', ['ngRoute' , 'myApp.factories'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function ($scope) {
    $scope.showContent = function(content){
        $scope.content = content;

        var x2js = new X2JS();
        var json = x2js.xml_str2json(content);

        console.log(json);
    };
});
