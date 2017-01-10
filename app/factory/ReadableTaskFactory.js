/**
 * Created by danie on 22/12/2016.
 */



'use strict';
angular
    .module('myApp.factories')
    .factory('ReadableTask', function () {

        //var actor = [];
        //var taskDefinition;
        //var comment = [];



        ReadableTask.prototype.addActor = function (newActor){
            this.actor.push(newActor);
        }

        ReadableTask.prototype.addComment = function (newComment){
            this.comment.push(newComment);
        }

        ReadableTask.prototype.addDefinition = function (newTaskDefinition){
            this.taskDefinition = newTaskDefinition;
        }

        ReadableTask.prototype.getAllActor = function () {
            return this.actor;
        }
        ReadableTask.prototype.getActor = function (index) {
            return this.actor[index];
        }

        ReadableTask.prototype.getAllComment = function () {
            return this.comment;
        }
        ReadableTask.prototype.getComment = function (index) {
            return this.comment[index];
        }

        ReadableTask.prototype.getDefinition = function () {
            return this.taskDefinition;
        }


        function ReadableTask(newActor, newTaskDefinition, newComment) {
            this.actor = [];
            this.comment = [];

            this.actor.push(newActor);
            this.taskDefinition = newTaskDefinition;
            this.comment.push(newComment);
        }

        return ReadableTask;
});