/**
 * Created by danie on 22/12/2016.
 */


'use strict';

angular
    .module('myApp.factories')
    .factory('ReadableProcess', function () {

        //var task = [];

        ReadableProcess.prototype.add = function (newTask) {
            this.task.push(newTask);
        }

        ReadableProcess.prototype.get = function () {
            return this.task;
        }

        ReadableProcess.prototype.getTask = function (index) {
            return this.task[index];
        }

        function ReadableProcess() {
            this.task = [];
        }

        return ReadableProcess;
});
