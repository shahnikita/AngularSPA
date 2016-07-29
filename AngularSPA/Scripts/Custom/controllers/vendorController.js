
define(['app', '../models/gridModel'], function (app) {

    var injectParams = ['$scope', 'vendorService', 'gridModel'];

    var VendorController = function ($scope, vendorService, gridModel) {
        $scope.message = 'Vendor Page';
        $scope.isDisplayForm = false;
        $scope.gridOptions = gridModel;
        $scope.gridOptions.sortBy = 'VendorId';
        $scope.gridOptions.load = function () {
            $scope.gridOptions = vendorService.getVendors(this);
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

//define(['angular', 'services/vendorService'], function (angular, vendorService) {
//    return ['$scope', 'vendorService', function ($scope, vendorService) {
//            $scope.message = 'Vendor Page';
//            $scope.isDisplayForm = false;

//            var loadVendors = function () {
//                var promise = vendorService.getVendors();
//                promise.then(function (resp) {
//                    $scope.vendors = resp.data;
//                }, function (err) {
//                    $scope.message = "Call Failed " + err.status;
//                });
//            };
//            loadVendors();
//            // Function to add toggle behaviour to form
//            $scope.formToggle = function () {
//                $scope.isDisplayForm = $scope.isDisplayForm ? false : true;
//                $scope.vendor = {};
//                $scope.vendorForm.$setPristine();
//            }
//            $scope.insert = function () {
//                if ($scope.vendorForm.$valid) {
//                    var promise = vendorService.addupdateVendor($scope.vendor);
//                    promise.then(function (resp) {
//                        loadVendors();
//                        $scope.formToggle();
//                    }, function (err) {
//                        $scope.message = "Call Failed " + err.status;
//                    });

//                }
//            }
//            $scope.edit = function (id) {
//                var promise = vendorService.getVendor(id);
//                promise.then(function (resp) {
//                    $scope.isDisplayForm = true;
//                    $scope.vendor = resp.data;
//                    $scope.vendorForm.$setPristine();

//                }, function (err) {
//                    $scope.message = "Call Failed " + err.status;
//                });

//            }

//            $scope.delete = function (id) {
//                var promise = vendorService.deleteVendor(id);
//                promise.then(function (resp) {
//                    if (resp.data) {
//                        loadVendors();
//                        $scope.formToggle();
//                        $scope.isDisplayForm = false;
//                    }
//                }, function (err) {
//                    $scope.message = "Call Failed " + err.status;
//                });

//            }

//    }];

//});
