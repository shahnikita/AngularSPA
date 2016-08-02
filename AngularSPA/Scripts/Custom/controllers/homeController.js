


define(['app','../models/gridModel', '../services/orderService'], function (app) {

    var injectParams = ['$scope', 'gridModel', 'orderService'];

    var HomeController = function ($scope,gridModel,orderService) {
        $scope.message = 'Dashboard';
        $scope.LoadOrders = function () {
            var promise = orderService.getAllOrder();
            promise
        .then(function (resp) {
            $scope.Orders = resp.data;
        }, function (err) {
            $scope.message = "Call Failed " + err.status;
        });
        }();
    };

    HomeController.$inject = injectParams;

    app.register.controller('homeController', HomeController);

});

