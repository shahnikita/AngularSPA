'use strict';
define(['app'], function (app) {

    var apiPaths = {
        addupdateCustomer: "/Customer/InsertUpdateCustomer/",
        getCustomer: "/Customer/GetCustomer/",
        getAllCustomer: '/Customer/GetAllCustomer',
        paginationCustomer: '/Customer/GetAllCustomerPagination',
        deleteCustomer: "/Customer/DeleteCustomer/"
    };
    var injectParams = ['$http'];
    var customerService = function ($http) {

        //The function for pagination
        this.getCustomers = function (gridOptions) {
            $http({
                method: 'GET',
                url: apiPaths.paginationCustomer,
                params: {
                    searchtext: gridOptions.search,
                    page: gridOptions.pageNumber,
                    pageSize: gridOptions.pageSize,
                    sortBy: gridOptions.sortBy,
                    sortDirection: gridOptions.sortDirection ? 'desc' : 'asc'
                },
            }).then(function (resp) {
                gridOptions.data = resp.data.Content;
                gridOptions.totalItems = resp.data.TotalRecords;

            }, function (err) {
                gridOptions.data = "Call Failed " + err.status;
            });

            return gridOptions;
        };


        this.getAllCustomers = function () {
            return $http({
                method: 'GET',
                url: apiPaths.getAllCustomer
            });
        }

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

    app.register.service('CustomerService', customerService);



});



