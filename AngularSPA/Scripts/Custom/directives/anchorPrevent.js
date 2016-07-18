'use strict';


define(['angular', 'angularRoute'], function (angular, angularRoute) {
    var moduleName = 'AnchorPreventDirective';
    angular.module(moduleName, [])
    .directive('a', function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function (e) {
                        e.preventDefault();
                    });
                }
            }
        };
    });

    return moduleName;
});