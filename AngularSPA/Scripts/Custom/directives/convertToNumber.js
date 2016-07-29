define(['angular', 'app'], function (angular, app) {

    var ConvertToNumber = function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (val) {
                    return parseInt(val, 10);
                });
                ngModel.$formatters.push(function (val) {
                    if (val != undefined)
                        return '' + val;
                    else
                        return '';
                });
            }
        };
    };

    app.register.directive('convertToNumber', ConvertToNumber);
});