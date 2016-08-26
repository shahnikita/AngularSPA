
'use strict';


require.config({
    paths: {
        jquery: '../Lib/Jquery/jquery-1.9.1.min',
        bootstrap: '../Lib/Bootstrap/bootstrap.min',
        metisMenu: '../Lib/MetisMenu/metisMenu.min',
        angular: '../Lib/Angular/angular',
        angularRoute: '../Lib/Angular/angular-route.min',
        angularDatepicker:'../Lib/Angular/angular-bootstrap-datepicker',
        uiGrid: '../Lib/UiGrid/ui-grid.min'
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
        angularDatepicker: {
            deps: ['angular', 'jquery'],
            exports: 'angularDatepicker'
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