'use strict';
define(['app'], function (app) {

    var injectParams = ['$http'];
    var VendorService = function ($http) {
        //The function to read all Vendors

        this.getVendors = function () {
            var res = $http.get(apiPaths.getAllVendor);
            return res;
        };
        //The function to insert/update Vendor
        this.addupdateVendor = function (vendor) {

            return $http({
                method: 'POST',
                url: apiPaths.addupdateVendor,
                data: angular.toJson(vendor),  // pass in data as strings

            });
        };
        this.getVendor = function (id) {

            return $http.get(apiPaths.getVendor + id);
        };
        this.deleteVendor = function (id) {

            return $http.get(apiPaths.deleteVendor + id);
        };
    };

    VendorService.$inject = injectParams;

    app.register.service('vendorService', VendorService);

});
//define(['angular', 'angularRoute'], function (angular, angularRoute) {
//    var moduleName = 'vendorService';
//    angular
//		.module(moduleName, [])
//		.service('vendorService', ['$http',function ($http) {
//		    //The function to read all Vendors

//		        this.getVendors = function () {
//		            var res = $http.get(apiPaths.getAllVendor);
//		            return res;
//		        };
//		         //The function to insert/update Vendor
//		        this.addupdateVendor = function (vendor) {

//		            return $http({
//		                method: 'POST',
//		                url: apiPaths.addupdateVendor,
//		                data: angular.toJson(vendor),  // pass in data as strings

//		            });
//		        };
//		        this.getVendor = function (id) {

//		            return $http.get(apiPaths.getVendor + id);
//		        };
//		        this.deleteVendor = function (id) {

//		            return $http.get(apiPaths.deleteVendor + id);
//		        };

//		}]);
//    return moduleName;

//});


