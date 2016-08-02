define(['app', '../models/gridModel', '../services/orderStatusService'], function (app) {

    var injectParams = ['$scope', 'gridModel', 'orderStatusService'];

    var OrderStatusController = function ($scope, gridModel, orderStatusService) {
        $scope.message = 'OrderStatus Page';
        $scope.isDisplayForm = false;
        $scope.gridOptions = gridModel;

        $scope.gridOptions.sortBy = 'OrderStatusId';
        $scope.gridOptions.load = function () {
            var promise = orderStatusService.getOrderStatuses(this);
            var self = this;
            promise.then(function (resp) {
                self.data = resp.data.Content;
                self.totalItems = resp.data.TotalRecords;
            }, function (err) {
                $scope.message = "Call Failed " + err.status;
            });
        };

        $scope.gridOptions.load();

        // Function to add toggle behaviour to form.
        $scope.formToggle = function () {
            $scope.isDisplayForm = $scope.isDisplayForm ? false : true;
            $scope.orderStatus = {};
            $scope.orderStatusForm.$setPristine();
        }

        //post back function to add/update vendor.
        $scope.insert = function () {
            if ($scope.orderStatusForm.$valid && $scope.orderStatusForm.$dirty) {
                var promise = orderStatusService.addupdateOrderStatus($scope.orderStatus);
                promise.then(function (resp) {
                    $scope.gridOptions.load();
                    $scope.formToggle();
                }, function (err) {
                    $scope.message = "Call Failed " + err.status;
                });

            }
        }

        //get funtion to get vendor info for edit.
        $scope.edit = function (id) {
            var promise = orderStatusService.getOrderStatus(id);
            promise.then(function (resp) {
                $scope.isDisplayForm = true;
                $scope.orderStatus = resp.data;
                $scope.orderStatusForm.$setPristine();

            }, function (err) {
                $scope.message = "Call Failed " + err.status;
            });

        }

        //Delete vendor 
        $scope.delete = function (id) {
            var promise = orderStatusService.deleteOrderStatus(id);
            promise.then(function (resp) {
                if (resp.data) {
                    $scope.gridOptions.load();
                    $scope.formToggle();
                    $scope.isDisplayForm = false;
                }
            }, function (err) {
                $scope.message = "Call Failed " + err.status;
            });

        }

    };
    OrderStatusController.$inject = injectParams;

    app.register.controller('orderStatusController', OrderStatusController);

});