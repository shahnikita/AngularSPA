
'use strict';


define(['angular'], function (angular) {
    var moduleName = 'Range';
    angular.module(moduleName, [])
    .filter('range', function () {
        return function (val, pageNumber, TotalPages) {

            var min = pageNumber > 2 ? (pageNumber + 2 >= TotalPages) ? TotalPages - 4 :
                                   pageNumber - 2 : 1;

            var max = (pageNumber > 2 ?
                            ((pageNumber +2 >= TotalPages) ?
                                    TotalPages + 1 : pageNumber + 3)
                              : TotalPages>5?6:TotalPages+1);

            min = parseInt(min);
            max = parseInt(max);
            for (var i = min; i < max; i++)
                val.push(i);
            return val;

        };
    });

    return moduleName;
});

