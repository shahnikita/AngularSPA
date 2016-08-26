﻿
'use strict';


define(['angular'], function (angular) {
    var moduleName = 'JsonDateFormatter';
    angular.module(moduleName, [])
    .filter('jsonDateFormatter', function () {
        return function (input, format) {

            if (angular.isUndefined(input))
                return;

            // first 6 character is the date
            var date = new Date(parseInt(input.substr(6)));

            // default date format
            if (angular.isUndefined(format))
                format = "MM/DD/YYYY";

            format = format.replace("DD", (date.getDate() < 10 ? '0' : '') + date.getDate()); // Pad with '0' if needed
            format = format.replace("MM", (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)); // Months are zero-based
            format = format.replace("YYYY", date.getFullYear());

            return format;
        };
    });

    return moduleName;
});

