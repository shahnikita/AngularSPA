
define(['app'], function (app) {

    var injectParams = ['$scope', 'vendorService'];

    var VendorController = function ($scope, vendorService) {
        $scope.message = 'Vendor Page';
        $scope.isDisplayForm = false;
       
        
        $scope.gridOptions = {
            data:null,
            pageSize: 5,
            pageNumber: 1,
            pageOptions:[5,10,20,50,100,200],
            totalItems: 0,
            sortBy: null,
            sorDirection: null,
            search:null,
            getTotalPages: function () {
                return Math.ceil(this.totalItems / this.pageSize);
            },
            nextPage: function () {
                if (this.pageNumber < this.getTotalPages()) {
                    this.pageNumber++;
                    $scope.load();
                }
            },
            previousPage: function () {
                if (this.pageNumber > 1) {
                    this.pageNumber--;
                    $scope.load();
                }
            }
        }

        var loadVendors = function () {
            var promise = vendorService.getVendors($scope.gridOptions.search
                                                    , $scope.gridOptions.page
                                                    , $scope.gridOptions.pageSize
                                                    , $scope.gridOptions.sortBy
                                                    , $scope.gridOptions.sortDirection);
            promise.then(function (resp) {
                $scope.gridOptions.data = resp.data;
                $scope.gridOptions.totalItems = resp.data.length;
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
