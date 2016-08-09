define(['app', '../models/gridModel', '../services/productService', '../services/vendorService', '../directives/convertToNumber'], function (app) {

    var injectParams = ['$scope', 'gridModel', 'productService', 'vendorService', ];

    var ProductController = function ($scope, gridModel, productService, vendorService) {
        $scope.message = 'Product Page';
        $scope.isDisplayForm = false;
        $scope.LoadVendors = function () {
            var promise = vendorService.getVendors();
                promise       
            .then(function (resp) {
                $scope.Vendors = resp.data.Content;
            }, function (err) {
                $scope.message = "Call Failed " + err.status;
            });
        }();
        $scope.gridOptions = gridModel;

        $scope.gridOptions.sortBy = 'ProductId';
        $scope.gridOptions.load = function () {
            var promise = productService.getProducts(this);
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
            $scope.product = {};
            $scope.productForm.$setPristine();
        }

        //post back function to add/update vendor.
        $scope.insert = function () {
            if ($scope.productForm.$valid && $scope.productForm.$dirty) {
                var promise = productService.addupdateProduct($scope.product);
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
            var promise = productService.getProduct(id);
            promise.then(function (resp) {
                $scope.isDisplayForm = true;
                $scope.product = resp.data;
                $scope.productForm.$setPristine();

            }, function (err) {
                $scope.message = "Call Failed " + err.status;
            });

        }

        //Delete vendor 
        $scope.delete = function (id) {
            var promise = productService.deleteProduct(id);
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
    ProductController.$inject = injectParams;

    app.register.controller('productController', ProductController);

});