/**
 * Created by danie on 22/12/2016.
 */



'use strict';
angular
    .module('myApp.factories')
    .factory('ReadableTask', function () {

        var actor = [];
        var taskDefinition;
        var comment = [];

        function ReadableTask(newActor, newTaskDefinition, newComment) {
            actor.push(newActor);
            taskDefinition = newTaskDefinition;
            comment = newComment;

        }

        return ReadableTask;
});