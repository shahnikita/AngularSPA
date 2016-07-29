/// <reference path="../angular.intellisense.js" />




define(['angular'
         ,'angularRoute'
         , 'jquery'
         , 'directives/loading'
          , 'directives/anchorPrevent'
         , 'services/routeResolver'
         , 'filters/rangeFilter'
], function (angular, angularRoute, $, loadingDir, anchorPrevent, routResolver, rangeFilter) {
    // create the module and name it adminApp
    var adminApp = angular.module('adminApp', ['ngRoute', 'routeResolverServices', 'LoadingDirective','AnchorPreventDirective', 'Range']);
   
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
                  .when('/vendor', route.resolve('vendor','','vendor'))
                  .when('/product', route.resolve('product', '', 'product'))
                  .when('/customer', route.resolve('customer', '', 'customer'))
                  .when('/', route.resolve('home'))
                  .otherwise({ redirectTo: '/home' });



          }]);

    return  adminApp
});


