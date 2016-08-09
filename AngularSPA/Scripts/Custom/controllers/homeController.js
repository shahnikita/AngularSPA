


define(['app', '../models/gridModel', '../services/orderService', '../services/customerService', '../services/productService', '../services/orderStatusService', '../directives/convertToNumber'], function (app) {

    var injectParams = ['$scope', 'gridModel', 'orderService','customerService','productService','orderStatusService'];

    var HomeController = function ($scope, gridModel, orderService, customerService, productService, orderStatusService) {
        $scope.message = 'Dashboard';
        $scope.gridOptions = gridModel;

        $scope.gridOptions.sortBy = 'OrderId';
        $scope.gridOptions.load = function () {
            var promise = orderService.getOrders(this);
            var self = this;
            promise.then(function (resp) {
                self.data = resp.data.Content;
                self.totalItems = resp.data.TotalRecords;
            }, function (err) {
                $scope.message = "Call Failed " + err.status;
            });
        };

        $scope.gridOptions.load();

        //var getCountOrderByStatus = function () {
        //    var promise = orderService.getCountOrderByStatus();
        //    promise
        //.then(function (resp) {
        //    $scope.OrderStatuses = resp.data;
        //}, function (err) {
        //    $scope.message = "Call Failed " + err.status;
        //});

        //};
        //getCountOrderByStatus();
        
        var LoadRelatedData = function () {
            //load customers
            if (!$scope.Customers) {
                var customerPromise = customerService.getCustomers();
                customerPromise
                .then(function (resp) {
                    $scope.Customers = resp.data.Content;
                }, function (err) {
                    $scope.message = "Call Failed " + err.status;
                });
            }
            //load product
            if (!$scope.Products) {
                var productPromise = productService.getProducts();
                productPromise
                .then(function (resp) {
                    $scope.Products = resp.data.Content;
                }, function (err) {
                    $scope.message = "Call Failed " + err.status;
                });
            }
            //load OrderStatus
            if (!$scope.OrderStatuses) {
                var orderStatusPromise = orderStatusService.getOrderStatuses();
                orderStatusPromise
                .then(function (resp) {
                    $scope.OrderStatuses = resp.data.Content;
                }, function (err) {
                    $scope.message = "Call Failed " + err.status;
                });
            }
        }

        //$scope.$watch('isDisplayForm', function (newValue, oldValue) {
        //    if(newValue)
        //        LoadRelatedData();
        //});


        // Function to add toggle behaviour to form.
        $scope.formToggle = function () {
            $scope.isDisplayForm = !$scope.isDisplayForm;
            $scope.order = {};
            $scope.OrderForm.$setPristine();
            if ($scope.isDisplayForm)
                LoadRelatedData();
            
        }


        //post back function to add/update order.
        $scope.insert = function () {
            if ($scope.OrderForm.$valid && $scope.OrderForm.$dirty) {
                var promise = orderService.addupdateOrder($scope.order);
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
            var promise = orderService.getOrder(id);
            promise.then(function (resp) {
                $scope.formToggle();
                $scope.isDisplayForm = true;
                $scope.order = resp.data;
               

            }, function (err) {
                $scope.message = "Call Failed " + err.status;
            });

        }

        //Delete vendor 
        $scope.delete = function (id) {
            var promise = orderService.deleteOrder(id);
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

    HomeController.$inject = injectParams;

    app.register.controller('homeController', HomeController);

});

