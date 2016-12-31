'use strict';

angular.module('myApp.view1', ['ngRoute' , 'myApp.factories'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [ 'ReadableTask',function(ReadableTask) {

    var task = new ReadableTask('josafá', 'inferno', 'the paaaaain ...');

    console.log(task);
}])


/*.directive('jrFileChooser', ['jrFileReader', function (jrFileReader) {
    return{
        replace: true,
        template: '<input type="file"/>',
        link: function($scope, element, attrs){
                element.on('change', function () {

                    jrFileReader.readAsText($scope.file,$scope);
                    var x2js = new X2JS();
                    var json = x2js.xml_str2json( data );
                    console.log("PORRAAAAAAAAAA");
                    console.log(json);
                });
        }
    };
}]);*/

