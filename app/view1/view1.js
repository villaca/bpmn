'use strict';

angular.module('myApp.view1', ['ngRoute' , 'myApp.factories', "ui.bootstrap"])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function ($scope, ReadableProcess, ReadableTask, Actor, Transition, $uibModal, $document) {
    $scope.showContent = function(content){
        //$scope.content = content;
        var x2js = new X2JS();
        var json = x2js.xml_str2json(content);
        console.log(json.Package/*.WorkflowProcess.Activities*/);

        if( Array.isArray(json.Package.Pools.Pool) ){
            var lanes = json.Package.Pools.Pool[1].Lanes;
        }
        else {
            var lanes = json.Package.Pools.Pool.Lanes;
        }
        if( Array.isArray(json.Package.WorkflowProcesses.WorkflowProcess) ){
            var workflow = json.Package.WorkflowProcesses.WorkflowProcess[1];
        }
        else {
            var workflow = json.Package.WorkflowProcesses.WorkflowProcess;
        }

        if( Array.isArray(workflow.Transitions.Transition) ){
            var transitions = workflow.Transitions.Transition;
        }

        console.log(workflow);
        console.log(lanes);

        var readableProcess = new ReadableProcess();

        for(let transition of transitions) {
            let trans  = new Transition(transition._From, transition._To);
            readableProcess.addTransition(trans);
        }

        if(workflow.hasOwnProperty('Activities')){

            for(let activity of workflow.Activities.Activity){
                if(activity.hasOwnProperty('Event') || (activity._Name == "")){
                    continue;
                }

                for(let lane of lanes.Lane){
                    let laneBeginX = parseInt(lane.NodeGraphicsInfos.NodeGraphicsInfo.Coordinates._XCoordinate, 10);
                    let laneEndX = laneBeginX + parseInt(lane.NodeGraphicsInfos.NodeGraphicsInfo._Width, 10);
                    let laneBeginY = parseInt(lane.NodeGraphicsInfos.NodeGraphicsInfo.Coordinates._YCoordinate, 10);
                    let laneEndY = laneBeginY + parseInt(lane.NodeGraphicsInfos.NodeGraphicsInfo._Height, 10);

                    let activityX = activity.NodeGraphicsInfos.NodeGraphicsInfo.Coordinates._XCoordinate;
                    let activityY = activity.NodeGraphicsInfos.NodeGraphicsInfo.Coordinates._YCoordinate;

                    if((activityX >= laneBeginX) && (activityX < laneEndX)){
                        if((activityY >= laneBeginY) && (activityY < laneEndY)){
                            let readableTask = new ReadableTask(lane._Name, activity._Name);
                            readableProcess.addTask(readableTask);
                        }
                    }
                }
            }

            console.log(readableProcess);
            $scope.readableProcess = readableProcess;
        }
        /*
        * TODO: IMPLEMENTAR COMPORTAMENTO PARA CASOS DE SUBPROCESSOS
        *
        else if(workflow.hasOwnProperty('ActivitySets')){

            for(let activity of workflow.Activities.Activity){
                let readableTask = new ReadableTask();
                readableProcess.addTask(readableTask);
            }

            //console.log(readableProcess.getTasks());
        }*/
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






