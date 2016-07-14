
define(['angular','app'], function (angular,app) {

    var injectParams = ['$scope', 'vendorService'];

    var VendorController = function ($scope, vendorService) {
        $scope.message = 'Vendor Page';
        $scope.isDisplayForm = false;

        var loadVendors = function () {
            var promise = vendorService.getVendors();
            promise.then(function (resp) {
                $scope.vendors = resp.data;
            }, function (err) {
                $scope.message = "Call Failed " + err.status;
            });
        };
        loadVendors();
        // Function to add toggle behaviour to form
        $scope.formToggle = function () {
            $scope.isDisplayForm = $scope.isDisplayForm ? false : true;
            $scope.vendor = {};
            $scope.vendorForm.$setPristine();
        }
        $scope.insert = function () {
            if ($scope.vendorForm.$valid) {
                var promise = vendorService.addupdateVendor($scope.vendor);
                promise.then(function (resp) {
                    loadVendors();
                    $scope.formToggle();
                }, function (err) {
                    $scope.message = "Call Failed " + err.status;
                });

            }
        }
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

        $scope.delete = function (id) {
            var promise = vendorService.deleteVendor(id);
            promise.then(function (resp) {
                if (resp.data) {
                    loadVendors();
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
