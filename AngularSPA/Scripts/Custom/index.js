

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

// create the controller and inject Angular's $scope
adminApp.controller('mainController', function ($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});


adminApp.controller('vendorController', function ($scope) {
    $scope.message = 'Look! I am an vendor page.';
});

adminApp.controller('productController', function ($scope) {
    $scope.message = 'product';
});