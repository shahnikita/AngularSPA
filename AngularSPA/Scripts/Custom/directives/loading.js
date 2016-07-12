'use strict';


define([ 'angular', 'angularRoute'], function (angular, angularRoute) {
    var moduleName = 'LoadingDirective';
    angular.module(moduleName, [])
    .directive('loading', ['$http', function ($http) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v) {
                    if (v) {
                        elm[0].style.display = "block";
                        
                    } else {
                        elm[0].style.display = "none";
                    }
                });
            }
        };
    }]);

    return moduleName;
});







//adminApp.directive('loading', ['$http', function ($http) {
//    return {
//        restrict: 'A',
//        link: function (scope, elm, attrs) {
//            scope.isLoading = function () {
//                return $http.pendingRequests.length > 0;
//            };

//            scope.$watch(scope.isLoading, function (v) {
//                if (v) {
//                    elm.show();
//                } else {
//                    elm.hide();
//                }
//            });
//        }
//    };

//}]);