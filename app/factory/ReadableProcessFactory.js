/**
 * Created by danie on 22/12/2016.
 */


'use strict';

angular
    .module('myApp.factories')
    .factory('ReadableProcess', function () {

        var task = [];

        ReadableProcess.prototype.add = function (newTask) {
            task.push(newTask);
        }

        ReadableProcess.prototype.get = function () {
            return task;
        }


        function ReadableProcess() {

        }

        return ReadableProcess;
});
