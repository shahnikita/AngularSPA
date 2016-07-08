/// <reference path="../angular.intellisense.js" />
var apiPaths = {
    addVendor: "/vendor/InsertVendor/" ,
    getVendor: "UserService/GetUser/",
    getAllVendor: '/vendor/GetAllVendor',
    deleteVendor: "UserService/DeleteUser/",
    updateVendor: "UserService/ModifyUser/"
};

// create the module and name it adminApp
var adminApp = angular.module('adminApp', ['ngRoute']);

// configure our routes
adminApp.config(function ($routeProvider) {

    $routeProvider

                // route for the home page
                .when('/', {
                    templateUrl: 'pages/home.html',
                    controller: 'mainController'
                })

                // route for the about page
                .when('/vendor', {
                    templateUrl: 'pages/vendor.html',
                    controller: 'vendorController'
                })

                // route for the contact page
                .when('/product', {
                    templateUrl: 'pages/product.html',
                    controller: 'productController'
                });
});


//Declaring Service
adminApp.service('vendorService', function ($http) {
    
    //The function to read all Vendors
    this.getVendors = function () {
        var res = $http.get(apiPaths.getAllVendor);
        return res;
    };
    //The function to insert Vendor
    this.addVendor = function (vendor) {
        
        return $http({
            method: 'POST',
            url: apiPaths.addVendor,
            data: $.param(vendor),  // pass in data as strings
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        });
    
    };
    //this.getVendor= function (vendor) {
    //    url = apiPaths.getVendor + vendor.VendorID;
    //    return $http.get(url);
    //};
    //this.deleteVendor= function (vendor) {
    //    url = apiPaths.deleteVendor + vendor.VendorID;
    //    return $http.delete(url);
    //};
    //updateUser= function (vendor) {
    //    url = apiPaths.updateVendor + vendor.VendorID;
    //    return $http.put(url, user);
    //}

    
});




// create the controller and inject Angular's $scope
adminApp.controller('mainController', function ($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    
    

});


adminApp.controller('vendorController', function ($scope, vendorService) {
    $scope.message = 'Look! I am an vendor page.';
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
            var promise = vendorService.addVendor($scope.vendor);
            promise.then(function (resp) {
                loadVendors();
               
                $scope.formToggle();
            }, function (err) {
                $scope.message = "Call Failed " + err.status;
            });
            
        }


    }
});

adminApp.controller('productController', function ($scope) {
    $scope.message = 'product';
});