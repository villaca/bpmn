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
            let index = this.actor.indexOf(newActor);

            if(index == -1){
                this.actor.push(newActor);
            }
            else{
                alert("This actor already exists!")
            }

            if(typeof this.actor[0] == 'undefined'){
                this.actor.splice(0, 1);
            }
        }

        ReadableTask.prototype.addComment = function (newComment){
            let index = this.actor.indexOf(newComment);

            if(index == -1){
                this.comment.push(newComment);
            }
            else{
                alert("This comment already exists!")
            }
            if(typeof this.comment[0] == 'undefined'){
                this.comment.splice(0, 1);
            }
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

        ReadableTask.prototype.getNumberOfActors = function () {
            return this.actor.length;
        }
        ReadableTask.prototype.getNumberOfComments = function () {
            return this.comment.length;
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