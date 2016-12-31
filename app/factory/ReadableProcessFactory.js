/**
 * Created by danie on 22/12/2016.
 */


'use strict';

angular
    .module('myApp.factories')
    .factory('ReadableProcess', function () {

        var task = [];

        function ReadableProcess(task) {
            this.task = task;
        }

        return ReadableProcess;
});
