
'use strict';


define(['angular', 'app'], function (angular,app) {
    var moduleName = 'gridTable';

    var gridTable = function () {
        return {
            restrict: 'E',
            templateUrl: '../../../HTML/templates/gridTable.html'
        };
    };
   
    app.register.directive(moduleName, gridTable);
})