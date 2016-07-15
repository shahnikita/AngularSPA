'use strict';
require.config({
    paths: {
        jquery: '../jquery-1.9.1',
        bootstrap: '../bootstrap.min',
        metisMenu: '../metisMenu.min',
        angular: '../angular',
        angularRoute: '../angular-route.min',

        uiGrid:'../ui-grid.min'
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
        uiGrid: {
            deps: ['angular', 'jquery'],
            exports: 'uiGrid'
        }
    }
});



require(
    ['app'],
    function () {
        angular.bootstrap(document, ['adminApp']);
    });