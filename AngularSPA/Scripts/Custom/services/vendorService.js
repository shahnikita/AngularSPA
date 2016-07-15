'use strict';
define(['app'], function (app) {

    var injectParams = ['$http'];
    var VendorService = function ($http) {

        //The function to read all Vendors
        this.getVendors = function (searchtext, page, pageSize, sortBy, sortDirection) {
            return $http({
                method: 'GET',
                url: apiPaths.getAllVendor,
                params: {
                    searchtext: searchtext,
                    page: page,
                    pageSize: pageSize,
                    sortBy: sortBy,
                    sortDirection: sortDirection
                },
            });
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



