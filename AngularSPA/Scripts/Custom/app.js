/// <reference path="../angular.intellisense.js" />

'use strict';

var apiPaths = {
    addupdateVendor: "/vendor/InsertUpdateVendor/",
    getVendor: "/vendor/GetVendor/",
    getAllVendor: '/vendor/GetAllVendor',
    deleteVendor: "/vendor/DeleteVendor/"
};


require(['angular',
         'angularRoute',

         'directives/loading',
         'services/vendorService',
           'controller/mainController',
             'controller/vendorController',
], function (angular, angularRoute, loadingDir, vendorSvr, mainController, vendorController) {
    // create the module and name it adminApp
    var adminApp = angular.module('adminApp', ['ngRoute', 'LoadingDirective', 'vendorService']);

    // configure our routes
    adminApp.config(function ($routeProvider) {
        $routeProvider
                    // route for the about page
                    .when('/vendor', {
                        templateUrl: 'pages/vendor.html',
                        controller: 'vendorController'
                    })

                    // route for the contact page
                    .when('/product', {
                        templateUrl: 'pages/product.html',
                        controller: 'productController'
                    })
                    // route for the home page
                    .when('/', {
                        templateUrl: 'pages/home.html',
                        controller: 'mainController'
                    })
                     .otherwise({
                         templateUrl: 'pages/home.html',
                         controller: 'mainController'
                     });
    })
    .controller('mainController', mainController)
     .controller('vendorController', vendorController);
});


