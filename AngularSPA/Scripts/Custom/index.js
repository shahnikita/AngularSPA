'use strict';
require.config({
    paths: {
        jquery: '../jquery-1.9.1.min',
        bootstrap: '../bootstrap.min',
        metisMenu: '../metisMenu.min',
        angular: '../angular',
        angularRoute: '../angular-route'
    },
    shim: {

        angular: {
            exports: 'angular'
        },
        angularRoute: {
            deps: ['angular'],
            exports: 'angularRouter'
        }

    },
    deps: ['app']
});



