'use strict';
define(['app'], function (app) {

    var apiPaths = {
        addupdateVendor: "/vendor/InsertUpdateVendor/",
        getVendor: "/vendor/GetVendor/",

        paginationVendor: '/Vendor/GetAllVendorPagination',
        deleteVendor: "/vendor/DeleteVendor/"
    };
    var injectParams = ['$http'];
    var VendorService = function ($http) {

        //The function for pagination
        this.getVendors = function (gridOptions) {
            var paramObj = {};
            if (gridOptions) {
                paramObj =
                {
                    searchtext: gridOptions.search,
                    page: gridOptions.pageNumber,
                    pageSize: gridOptions.pageSize,
                    sortBy: gridOptions.sortBy,
                    sortDirection: gridOptions.sortDirection ? 'desc' : 'asc'
                };
            }
            return $http({
                method: 'GET',
                url: apiPaths.paginationVendor,
                params: paramObj,
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



