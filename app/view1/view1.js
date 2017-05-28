'use strict';

angular.module('myApp.view1', ['ngRoute' , 'myApp.factories', "ui.bootstrap"])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function ($scope, $rootScope, ReadableProcess, ReadableTask, Actor, $uibModal, $document) {
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

        //console.log(workflow);

        var readableProcess = new ReadableProcess();

        if(workflow.hasOwnProperty('Activities')){

            for(let activity of workflow.Activities.Activity){
                let readableTask = new ReadableTask(activity.Performer, activity._Name);
                //let actor = new Actor(activity.Performer, readableTask);
                readableProcess.addTask(readableTask);
            }



            $scope.readableProcess = readableProcess;
            $rootScope.readableProcess = readableProcess;
        }
        else if(workflow.hasOwnProperty('ActivitySets')){

            for(let activity of workflow.Activities.Activity){
                let readableTask = new ReadableTask();
                readableProcess.addTask(readableTask);
            }

            //console.log(readableProcess.getTasks());
        }
    };


    $scope.removeTask = function(readableProcess, readableTask){
        readableProcess.deleteTask(readableTask);
    };

    $scope.removeActor = function(readableProcess, actor){
        readableProcess.deleteActor(actor);
    };

    $scope.draw = function (readableProcess) {
        var canvas = document.getElementById('processCanvas');
        if (canvas.getContext){
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
			canvas.setAttribute("height", "500");
			canvas.setAttribute("width", "700");
            readableProcess.draw(context);
        } else {

        }
    }
	
	$scope.download = function (readableProcess) {
		var canvas = document.getElementById('processCanvas');
		var link = document.getElementById('btnDownload');
		link.href = canvas.toDataURL();
		var nameFile = document.getElementById('uploadFile').files.item(0).name.replace('.xpdl','');
		link.download = nameFile+".png";
    }

    var $ctrl = this;
    $ctrl.animationsEnabled = true;


    $scope.openActorName = function (readableProcess, actor,parentSelector) {

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

        $scope.oldActorName = actor;

        var modalInstance = $uibModal.open({
            scope: $scope,
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title-definition',
            ariaDescribedBy: 'modal-body-definition',
            templateUrl: 'myModalActorName.html',
            controller: 'ProcessModalInstanceCtrl',
            controllerAs: '$ctrl',
            appendTo: parentElem,
            resolve: {
                readableProcess: function () {
                    return readableProcess;
                }
            }
        });
    };

    $scope.color = '#ffffff';

    $scope.$on('colorpicker-selected', function(event, colorObject){
        console.log(colorObject);
        console.log($scope.readableProcess);
        //console.log($rootScope.readableProcess);
        $scope.readableProcess.setActorColor(colorObject.actor, colorObject.value);
    });

    $scope.changeColor = function (actor, color) {
        $scope.readableProcess.setActorColor(actor, color);
    }

})

.controller('ModalCtrl', function ($scope, $uibModal, $document) {
    var $ctrl = this;
    $ctrl.animationsEnabled = true;


    $scope.open = function (readableTask,parentSelector) {

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;


        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'TaskModalInstanceCtrl',
            controllerAs: '$ctrl',
            appendTo: parentElem,
            resolve: {
                readableTask: function () {
                    return readableTask;
                }
            }
        });

        modalInstance.result.then(function (newActor) {
            $scope.newActor = newActor;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };



    $scope.openDefinition = function (readableTask,parentSelector) {

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;


        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title-definition',
            ariaDescribedBy: 'modal-body-definition',
            templateUrl: 'myModalContentDefinition.html',
            controller: 'TaskModalInstanceCtrl',
            controllerAs: '$ctrl',
            appendTo: parentElem,
            resolve: {
                readableTask: function () {
                    return readableTask;
                }
            }
        });
    };


    $scope.openComments = function (readableTask,parentSelector) {

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;


        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title-comment',
            ariaDescribedBy: 'modal-body-comment',
            templateUrl: 'myModalContentComments.html',
            controller: 'TaskModalInstanceCtrl',
            controllerAs: '$ctrl',
            appendTo: parentElem,
            resolve: {
                readableTask: function () {
                    return readableTask;
                }
            }
        });

        modalInstance.result.then(function (newComment) {
            $scope.newComment = newComment;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };


    $ctrl.toggleAnimation = function () {
        $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
    };
})

.controller('TaskModalInstanceCtrl', function ($scope, $uibModalInstance, readableTask) {
    var $ctrl = this;

    $scope.newActor = null;
    $scope.newDefinition = null;
    $scope.newComment = null;

    $ctrl.ok = function (thingToAdd) {

        if(thingToAdd == 'actor'){
            readableTask.addActor($scope.newActor);
        }
        if(thingToAdd == 'definition'){
            readableTask.addDefinition($scope.newDefinition);
        }
        if(thingToAdd == 'comment'){
            readableTask.addComment($scope.newComment);
        }


        $uibModalInstance.close();
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})

.controller('ProcessModalInstanceCtrl', function ($scope, $uibModalInstance, readableProcess) {
    var $ctrl = this;

    $scope.newActorName = null;

    $ctrl.ok = function (thingToAdd) {

        if(thingToAdd == 'actorName'){
            readableProcess.setActorName($scope.newActorName, $scope.oldActorName);
        }

        $uibModalInstance.close();
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});






