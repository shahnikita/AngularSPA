
'use strict';


define(['angular'], function (angular) {
    var moduleName = 'Range';
    angular.module(moduleName, [])
    .filter('range',function () {
        return function(val, range) {
            range = parseInt(range);
            for (var i=1; i<range+1; i++)
                val.push(i);
            return val;
        };
    });

    return moduleName;
});

