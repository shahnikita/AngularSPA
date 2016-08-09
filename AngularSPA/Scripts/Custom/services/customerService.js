'use strict';
define(['app'], function (app) {

    var apiPaths = {
        addupdateCustomer: "/Customer/InsertUpdateCustomer/",
        getCustomer: "/Customer/GetCustomer/",
        paginationCustomer: '/Customer/GetAllCustomerPagination',
        deleteCustomer: "/Customer/DeleteCustomer/"
    };
    var injectParams = ['$http'];
    var customerService = function ($http) {

        //The function for pagination
        this.getCustomers = function (gridOptions) {
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
                url: apiPaths.paginationCustomer,
                params: paramObj,
            });

         
        };

        //The function to insert/update Customer
        this.addupdateCustomer = function (customer) {
            return $http({
                method: 'POST',
                url: apiPaths.addupdateCustomer,
                data: angular.toJson(customer),  // pass in data as strings
            });
        };
        this.getCustomer = function (id) {

            return $http.get(apiPaths.getCustomer + id);
        };
        this.deleteCustomer = function (id) {

            return $http.get(apiPaths.deleteCustomer + id);
        };

    };
    customerService.$inject = injectParams;

    app.register.service('customerService', customerService);



});



