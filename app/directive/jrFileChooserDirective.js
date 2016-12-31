/**
 * Created by danie on 25/12/2016.
 */


angular
    .module('myApp.directives')
    .directive('jrFileChooser', ['jrFileReader', function (jrFileReader){
        return{
            replace: true,
            template: '<input type="file"/>',
            link: function($scope, element, attrs){
                element.on('change', function () {


                    //TODO: Uncaught TypeError: Failed to execute 'readAsText' on 'FileReader': parameter 1 is not of type 'Blob'.
                    jrFileReader.readAsText($scope.file,$scope)
                        .then(function(result){
                            var data = result;
                        });
                    //jrFileReader
                    var x2js = new X2JS();
                    var json = x2js.xml_str2json( data );
                    console.log("PORRAAAAAAAAAA");
                    console.log(json);
                });
            }
        };
}]);