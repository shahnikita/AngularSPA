
define(['app', '../models/gridModel', '../services/vendorService'], function (app) {

    var injectParams = ['$scope', 'vendorService', 'gridModel'];

    var VendorController = function ($scope, vendorService, gridModel) {
        $scope.message = 'Vendor Page';
        $scope.isDisplayForm = false;
        $scope.gridOptions = gridModel;
        $scope.gridOptions.sortBy = 'VendorId';
        $scope.gridOptions.load = function () {
            var promise = vendorService.getVendors(this);
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
            $scope.vendor = {};
            $scope.vendorForm.$setPristine();
        }

        //post back function to add/update vendor.
        $scope.insert = function () {
            if ($scope.vendorForm.$valid) {
                if ($scope.vendorForm.$dirty) {
                    var promise = vendorService.addupdateVendor($scope.vendor);
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

        //get funtion to get vendor info for edit.
        $scope.edit = function (id) {
            var promise = vendorService.getVendor(id);
            promise.then(function (resp) {
                $scope.isDisplayForm = true;
                $scope.vendor = resp.data;
                $scope.vendorForm.$setPristine();

            }, function (err) {
                $scope.message = "Call Failed " + err.status;
            });

        }

        //Delete vendor 
        $scope.delete = function (id) {
            var promise = vendorService.deleteVendor(id);
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
    VendorController.$inject = injectParams;

    app.register.controller('vendorController', VendorController);

});


