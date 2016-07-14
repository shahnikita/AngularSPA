'use strict';
require.config({
    paths: {
        jquery: '../jquery-1.9.1',
        bootstrap: '../bootstrap.min',
        metisMenu: '../metisMenu.min',
        angular: '../angular',
        angularRoute: '../angular-route.min',

        angularGrid:'../ng-grid.min'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        angular: {
            exports: 'angular'
        },
        angularRoute: {
            deps: ['angular'],
            exports: 'angularRouter'
        },
        angularGrid: {
            deps: ['angular', 'jquery'],
            exports: 'angularGrid'
        }
    }
});



require(
    ['app'],
    function () {
        angular.bootstrap(document, ['adminApp']);
    });