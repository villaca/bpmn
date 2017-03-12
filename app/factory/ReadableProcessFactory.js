/**
 * Created by danie on 22/12/2016.
 */


'use strict';

angular
    .module('myApp.factories')
    .factory('ReadableProcess', function () {

        ReadableProcess.prototype.addTask = function (newTask) {
            let index = this.tasks.indexOf(newTask);

            if (index == -1) {
                this.tasks.push(newTask);

                for (let actor of newTask.getAllActor()) {
                    this.addActor(actor);
                }
            }
        };

        ReadableProcess.prototype.getTasks = function () {
            return this.tasks;
        };

        ReadableProcess.prototype.getTask = function (index) {
            return this.tasks[index];
        };

        ReadableProcess.prototype.getDisabledTasks = function () {
            return this.disabledTasks;
        };

        ReadableProcess.prototype.getDisabledTask = function (index) {
            return this.disabledTasks[index];
        };

        ReadableProcess.prototype.getActors = function () {
            return this.actors;
        };

        ReadableProcess.prototype.getActor = function (index) {
            return this.actors[index];
        };

        ReadableProcess.prototype.deleteTask = function (readableTask) {
            let index = this.tasks.indexOf(readableTask);

            if (index > -1) {
                this.disabledTasks.push(this.tasks[index]);
                this.tasks.splice(index, 1);
            }
        };

        ReadableProcess.prototype.addActor = function (newActor) {
            let index = this.actors.indexOf(newActor);

            if (index == -1) {
                this.actors.push(newActor);
            }
        };

        ReadableProcess.prototype.getTasksByActor = function (actor) {
            let tasks = [];

            for(let task of this.tasks){
                let taskActors = task.getAllActor();

                if ((actor == "none") && (taskActors.length == 0)) {
                    tasks.push(task);
                }
                else {
                    let actorIndex = taskActors.indexOf(actor);

                    if (actorIndex != -1) {
                        tasks.push(task);
                    }
                }
            }

            return tasks;
        };

        function ReadableProcess() {
            this.tasks = [];
            this.disabledTasks = [];
            this.actors = [];
        }

        return ReadableProcess;
});
