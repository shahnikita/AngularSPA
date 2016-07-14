


define(['app'], function (app) {

    var injectParams = ['$scope'];

    var HomeController = function ($scope) {
        $scope.message = 'Everyone come and see how good I look!';
    };

    HomeController.$inject = injectParams;

    app.register.controller('homeController', HomeController);

});

