
/// <reference path="../Lib/Angular/angular.intellisense.js" />
'use strict';


define(['angular'
         , 'angularRoute'
         , 'angularDatepicker'
         , 'jquery'
         , 'directives/loading'
          , 'directives/anchorPrevent'
         , 'services/routeResolver'
         , 'filters/rangeFilter'
         , 'filters/jsonDateFormatter'

], function (angular, angularRoute, angularDatepicker, $, loadingDir, anchorPrevent, routResolver, rangeFilter, jsonDateFormatter) {
    // create the module and name it adminApp
    var adminApp = angular.module('adminApp', ['ngRoute', 'ng-bootstrap-datepicker', 'routeResolverServices', 'LoadingDirective', 'AnchorPreventDirective', 'Range', 'JsonDateFormatter']);
    
    // configure our routes
    adminApp.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
                  '$compileProvider', '$filterProvider', '$provide',
          function ($routeProvider, routeResolverProvider, $controllerProvider, 
                    $compileProvider, $filterProvider, $provide) {
              //Change default views and controllers directory using the following:
             

              adminApp.register =
              {
                  controller: $controllerProvider.register,
                  directive: $compileProvider.directive,
                  filter: $filterProvider.register,
                  factory: $provide.factory,
                  service: $provide.service
              };

              //Define routes - controllers will be loaded dynamically
              var route = routeResolverProvider.route;

              $routeProvider
                  .when('/vendor', route.resolve('vendor'))
                  .when('/product', route.resolve('product'))
                  .when('/customer', route.resolve('customer'))
                   .when('/orderStatus', route.resolve('orderStatus'))
                  .when('/', route.resolve('home'))
                  .otherwise({ redirectTo: '/home' });



          }]);

    return  adminApp
});


