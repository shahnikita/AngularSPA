
'use strict';


define(['angular', 'app'], function (angular,app) {
    var moduleName = 'gridFooter';

    var gridFooter = function () {
        return {
            restrict: 'E',
            templateUrl: '../../../HTML/templates/gridFooter.html'
        };
    };
   
    app.register.directive(moduleName, gridFooter);
})