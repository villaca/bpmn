/**
 * Created by danie on 12/01/2017.
 */

angular
    .module('myApp.directives')
    .directive('modal', function(){
        return {
            template:
                '<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" ' +
                    'aria-labelledby="myLargeModalLabel" aria-hidden="true">' +
                        '<div class="modal-dialog modal-sm">' +
                            '<div class="modal-content" ng-transclude>' +
                                '<div class="modal-header">' +
                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                    '</button>' +
                                    '<h4 class="modal-title" id="myModalLabel">Modal title</h4>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                '</div>',
            restrict: 'E',
            transclude: true,
            replace:true,
            scope:{visible:'=', onSown:'&', onHide:'&'},
            link:function postLink(scope, element, attrs){

                $(element).modal({
                    show: false,
                    keyboard: attrs.keyboard,
                    backdrop: attrs.backdrop
                });

                scope.$watch(function(){return scope.visible;}, function(value){

                    if(value == true){
                        $(element).modal('show');
                    }else{
                        $(element).modal('hide');
                    }
                });

                $(element).on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.onSown({});
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    scope.$apply(function(){
                        scope.onHide({});
                    });
                });
            }
        };
    }
)
.directive('modalHeader', function(){
    return {
        template:'<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                    '<h4 class="modal-title">{{title}}</h4>' +
                 '</div>',
        replace:true,
        restrict: 'E',
        scope: {title:'@'}
    };
})
.directive('modalBody', function(){
    return {
        template:'<div class="modal-body" ng-transclude></div>',
        replace:true,
        restrict: 'E',
        transclude: true
    };
})
.directive('modalFooter', function(){
    return {
        template:'<div class="modal-footer" ng-transclude></div>',
        replace:true,
        restrict: 'E',
        transclude: true
    };
});