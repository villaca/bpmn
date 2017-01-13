/**
 * Created by danie on 22/12/2016.
 */


'use strict';

angular
    .module('myApp.factories')
    .factory('ReadableProcess', function () {

        //var task = [];

        ReadableProcess.prototype.add = function (newTask) {
            let index = this.task.indexOf(newTask);

            if (index == -1) {
                this.task.push(newTask);
            }
        }

        ReadableProcess.prototype.get = function () {
            return this.task;
        }

        ReadableProcess.prototype.getTask = function (index) {
            return this.task[index];
        }

        ReadableProcess.prototype.deleteTask = function (readableTask) {
            let index = this.task.indexOf(readableTask);

            if (index > -1) {
                this.task.splice(index, 1);
            }
        }

        function ReadableProcess() {
            this.task = [];
        }

        return ReadableProcess;
});
