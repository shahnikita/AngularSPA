
define(['app', '../models/gridModel'], function (app) {

    var injectParams = ['$scope', 'CustomerService', 'gridModel'];

    var CustomerController = function ($scope, customerService, gridModel) {
        $scope.message = 'Customer Page';
        $scope.isDisplayForm = false;
        $scope.gridOptions = gridModel;
        $scope.gridOptions.sortBy = 'CustomerId';

        $scope.gridOptions.load = function () {
            $scope.gridOptions = customerService.getCustomers(this);
        };

        $scope.gridOptions.load();

        // Function to add toggle behaviour to form.
        $scope.formToggle = function () {
            $scope.isDisplayForm = $scope.isDisplayForm ? false : true;
            $scope.customer = {};
            $scope.customerForm.$setPristine();
        }

        //post back function to add/update vendor.
        $scope.insert = function () {
            if ($scope.customerForm.$valid) {
                if ($scope.customerForm.$dirty) {
                    var promise = customerService.addupdateCustomer($scope.customer);
                    promise.then(function (resp) {
                        $scope.gridOptions.load();
                        $scope.formToggle();
                    }, function (err) {
                        $scope.message = "Call Failed " + err.status;
                    });

                }
                else {
                    $scope.formToggle();
                }
            }

        }

        //get funtion to get customer info for edit.
        $scope.edit = function (id) {
            var promise = customerService.getCustomer(id);
            promise.then(function (resp) {
                $scope.isDisplayForm = true;
                $scope.customer = resp.data;
                $scope.customerForm.$setPristine();

            }, function (err) {
                $scope.message = "Call Failed " + err.status;
            });

        }

        //Delete customer 
        $scope.delete = function (id) {
            var promise = customerService.deleteCustomer(id);
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
    CustomerController.$inject = injectParams;

    app.register.controller('customerController', CustomerController);

});


