'use strict';

define(['angular', 'angularRoute'], function (angular, angularRoute) {
    var moduleName = 'vendorService';
    angular
		.module(moduleName, [])
		.service('vendorService', ['$http',function ($http) {
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

		}]);
    return moduleName;

});


// adminApp.service('vendorService', function ($http) {

//     //The function to read all Vendors
//    this.getVendors = function () {
//        var res = $http.get(apiPaths.getAllVendor);
//        return res;
//    };
//     //The function to insert/update Vendor
//    this.addupdateVendor = function (vendor) {

//        return $http({
//            method: 'POST',
//            url: apiPaths.addupdateVendor,
//            data: $.param(vendor),  // pass in data as strings
//            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
//        });
//    };
//    this.getVendor = function (id) {
//        url = apiPaths.getVendor + id;
//        return $http.get(url);
//    };
//    this.deleteVendor = function (id) {
//        url = apiPaths.deleteVendor + id;
//        return $http.get(url);
//    };
//});