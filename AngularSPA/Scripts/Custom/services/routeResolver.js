'use strict';

define(['angular'], function (angular) {

    var routeResolver = function () {

        this.$get = function () {
            return this;
        };

        this.routeConfig = function () {
            var viewsDirectory = '../Html/pages/',
                controllersDirectory = 'controllers/',
                servicesDirectory = 'services/',

            setBaseDirectories = function (viewsDir, controllersDir, servicesDir) {
                viewsDirectory = viewsDir;
                controllersDirectory = controllersDir;
                servicesDirectory = servicesDir;
            },

            getViewsDirectory = function () {
                return viewsDirectory;
            },
             getServicesDirectory = function () {
                 return servicesDirectory;
             },

            getControllersDirectory = function () {
                return controllersDirectory;
            };

            return {
                setBaseDirectories: setBaseDirectories,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory,
                getServicesDirectory: getServicesDirectory
            };
        }();

        this.route = function (routeConfig) {

            var resolve = function (baseName, path, service, controllerAs, secure) {
                if (!path) path = '';

                var routeDef = {};

                routeDef.templateUrl = routeConfig.getViewsDirectory() + path + baseName + '.html';
                routeDef.controller = baseName + 'Controller';
               

                if (controllerAs) routeDef.controller = controllerAs;

                routeDef.secure = (secure) ? secure : false;
                routeDef.resolve = {
                    load: ['$q', '$rootScope', function ($q, $rootScope) {
                        var dependencies = [];
                        if (service) {
                            dependencies.push(routeConfig.getServicesDirectory() + path + service +'Service');
                        }
                        dependencies.push(routeConfig.getControllersDirectory() + path + routeDef.controller);
                        return resolveDependencies($q, $rootScope, dependencies);
                    }]
                };

                return routeDef;
            },

            resolveDependencies = function ($q, $rootScope, dependencies) {
                var defer = $q.defer();
                require(dependencies, function () {
                    defer.resolve();
                    $rootScope.$apply()
                });

                return defer.promise;
            };

            return {
                resolve: resolve
            }
        }(this.routeConfig);

    };

    var servicesApp = angular.module('routeResolverServices', []);

    //Must be a provider since it will be injected into module.config()    
    servicesApp.provider('routeResolver', routeResolver);
});
