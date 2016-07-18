'use strict';
define(['app'], function (app) {

    var injectParams = ['$http'];
    var VendorService = function ($http) {

        //The function to read all Vendors
        this.getVendors = function (gridOptions) {
            return $http({
                method: 'GET',
                url: apiPaths.getAllVendor,
                params: {
                    searchtext: gridOptions.search,
                    page: gridOptions.pageNumber,
                    pageSize: gridOptions.pageSize,
                    sortBy: gridOptions.sortBy,
                    sortDirection: gridOptions.sortDirection?'desc':'asc'
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



