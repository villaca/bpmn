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

                this.addActor(newTask.getActor());
                let indexActor = this.actors.indexOf(newTask.getActor());
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

        ReadableProcess.prototype.deleteActor = function (actor) {
            let tasksToBeDeleted = this.getTasksByActor(actor);
            let index = this.actors.indexOf(actor);

            for(let task of tasksToBeDeleted){
                this.deleteTask(task);
            }

            this.disabledActors.push(this.actors[index]);
            this.actors.splice(index, 1);

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
                let taskActors = task.getActor();

                if ((actor == "none") && (taskActors == "")) {
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

        ReadableProcess.prototype.setActorName = function (newActorName) {
            let index = this.actors.indexOf(newActorName);

            if (index == -1) {
                this.actors.push(newActor);
            }
        };

        ReadableProcess.prototype.setActorColor = function (actor, color) {
            let index = this.actors.indexOf(actor);

            console.log("chegou:");
            console.log(actor);
            console.log(color);

            if (index != -1) {
                for(let task of this.getTasksByActor(this.actors[index])){
                    task.setColor(color);
                }
            }
        };


        ReadableProcess.prototype.draw = function (context) {


            function roundRect(ctx, x, y, width, height, radius, fill, stroke, taskColor) {
                if (typeof stroke == 'undefined') {
                    stroke = true;
                }
                if (typeof radius === 'undefined') {
                    radius = 5;
                }
                if (typeof radius === 'number') {
                    radius = {tl: radius, tr: radius, br: radius, bl: radius};
                } else {
                    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
                    for (var side in defaultRadius) {
                        radius[side] = radius[side] || defaultRadius[side];
                    }
                }
                ctx.beginPath();
                ctx.moveTo(x + radius.tl, y);
                ctx.lineTo(x + width - radius.tr, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
                ctx.lineTo(x + width, y + height - radius.br);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
                ctx.lineTo(x + radius.bl, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
                ctx.lineTo(x, y + radius.tl);
                ctx.quadraticCurveTo(x, y, x + radius.tl, y);
                ctx.closePath();

                if (fill) {
                    ctx.fillStyle = taskColor;
                    ctx.fill();
                }

                if (stroke) {
                    ctx.stroke();
                }
            }

            function arrow(ctx, x, y){

                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x + 10, y);
                ctx.lineTo(x + 10, y + 10);
                ctx.lineTo(x + 25, y - 8);
                ctx.lineTo(x + 10, y - 26);
                ctx.lineTo(x + 10, y - 16);
                ctx.lineTo(x, y - 16);
                ctx.lineTo(x, y);
                ctx.closePath();

                ctx.stroke();
            }

            var coordinateX = 25;
            var coordinateY = 50;
            var actorWidth = 100;
            var actorHeight = 20;
            var taskWidth = 100;
            var taskHeight = 100;
            var commentWidth = 100;
            var commentHeight = 50;
            var maxTextWidth = 75;
            var textHeight = 10;

            var spaceBetweenBoxes = 20;

            var taskIndex = 0;


            if(this.tasks.length > 5){
                $(".drawing").css("overflow","scroll");
                var widthCanvas = 1000;
                for(var i=6;i < this.tasks.length;i++){
                    widthCanvas += 120;
                }
                $("#processCanvas").attr("width",widthCanvas);
            }

            for(let task of this.tasks){
                //console.log("oi");
                //console.log(task.getColor);
                taskIndex++;
                let actor = task.getActor(0);
                if((actor == null) || (actor == "")){
                    actor = "No actors!";
                }
                let comment = task.getComment(0);
                context.fillStyle = "#FFFFFF";

                context.beginPath();
                context.arc(coordinateX + actorWidth/2, coordinateY - 25, 10, 0, 2 * Math.PI);
                context.stroke();
                context.fill();
                context.fillStyle = "#111111";
                this.wrapText(context, taskIndex+"", coordinateX + actorWidth/2 - 3, coordinateY - 22, maxTextWidth, textHeight);
                context.closePath();


                context.fillStyle = "#FFFFFF";
                roundRect(context, coordinateX, coordinateY, actorWidth, actorHeight, 12, true, true, task.getColor());
                context.fillStyle = "#111111";
                context.fillText(actor, coordinateX + 20, coordinateY + 13);
                coordinateY += actorHeight + spaceBetweenBoxes;


                context.fillStyle = "#FFFFFF";
                roundRect(context, coordinateX, coordinateY, taskWidth, taskHeight, 15, true, true, task.getColor());
                context.fillStyle = "#111111";
                this.wrapText(context, task.getDefinition(), coordinateX + 10, coordinateY + 40, maxTextWidth, textHeight);

                if(taskIndex != this.tasks.length){
                    arrow(context, coordinateX + 10 + taskWidth, coordinateY + taskHeight/2 + 5);
                }


                if((comment != null) && (comment != "")){
                    coordinateY += taskHeight + spaceBetweenBoxes;
                    context.beginPath();
                    context.moveTo(coordinateX + actorWidth/2, coordinateY - spaceBetweenBoxes);
                    context.lineTo(coordinateX + actorWidth/2, coordinateY);
                    context.stroke();
                    context.closePath();

                    context.strokeRect(coordinateX, coordinateY, commentWidth, commentHeight);
                    //context.fillText(comment, coordinateX + 10, coordinateY + 15);
                    this.wrapText(context, comment, coordinateX + 10, coordinateY + 15, maxTextWidth, textHeight);

                }

                coordinateY = 50;
                coordinateX += 150
            }

        }

        ReadableProcess.prototype.wrapText = function (context, text, x, y, maxWidth, lineHeight) {
            var words = text.split(' ');
            var line = '';

            for(let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = context.measureText(testLine);
                let testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }
            context.fillText(line, x, y);
        }

        function ReadableProcess() {
            this.tasks = [];
            this.disabledTasks = [];
            this.actors = [];
            this.disabledActors = [];
        }

        return ReadableProcess;
});
