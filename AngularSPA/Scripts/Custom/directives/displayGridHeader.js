
'use strict';


define(['angular', 'app'], function (angular,app) {
    var moduleName = 'gridHeader';

    var gridHeader = function () {
        return {
            restrict: 'E',
            templateUrl: '../../../HTML/templates/gridHeader.html'
        };
    };
   
    app.register.directive(moduleName, gridHeader);
})