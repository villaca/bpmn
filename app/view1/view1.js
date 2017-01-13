'use strict';

angular.module('myApp.view1', ['ngRoute' , 'myApp.factories'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function ($scope, ReadableProcess, ReadableTask) {
    $scope.showContent = function(content){
        //$scope.content = content;

        var x2js = new X2JS();
        var json = x2js.xml_str2json(content);

        console.log(json.Package.WorkflowProcesses/*.WorkflowProcess.Activities*/);

        if( Array.isArray(json.Package.WorkflowProcesses.WorkflowProcess) ){
            var workflow = json.Package.WorkflowProcesses.WorkflowProcess[1];
        }
        else {
            var workflow = json.Package.WorkflowProcesses.WorkflowProcess;
        }

        console.log(workflow);

        var readableProcess = new ReadableProcess();

        if(workflow.hasOwnProperty('Activities')){

            for(let activity of workflow.Activities.Activity){
                let readableTask = new ReadableTask(activity.Performer, activity._Name);
                readableProcess.add(readableTask);
            }
            console.log(readableProcess.get());
            $scope.readableProcess = readableProcess;
        }
        else if(workflow.hasOwnProperty('ActivitySets')){
            alert('master of all');

            for(let activity of workflow.Activities.Activity){
                let readableTask = new ReadableTask();
                readableProcess.add(readableTask);
            }

            console.log(readableProcess.get());

        }
    };

    $scope.showModalActor = false;
    $scope.showModalComment = false;


    $scope.hide = function(m, showModalActor){
        if(m === 1){
            $scope.showModalActor = false;
            showModalActor = false;
        }
        else{
            $scope.showModalComment= false;
        }
    }

    $scope.putActor = function(readableTask){
        readableTask.addActor("José");
    };

    $scope.putComment = function(readableTask){
        readableTask.addComment("José");
    };

    $scope.removeTask = function(readableProcess, readableTask){
        readableProcess.deleteTask(readableTask);
    };


    $scope.modalActorShown = function(){
        console.log('model one shown');
    }

    $scope.modalActorHide = function(){
        console.log('model one hidden');
    }
});
