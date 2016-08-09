'use strict';
define(['app'], function (app) {

    var apiPaths = {
        addupdateOrderStatus: "/OrderStatus/InsertUpdateOrderStatus/",
        getOrderStatus: "/OrderStatus/GetOrderStatus/",
        
        paginationOrderStatus: '/OrderStatus/GetAllOrderStatusPagination',
        deleteOrderStatus: "/OrderStatus/DeleteOrderStatus/"
    };

    var injectParams = ['$http'];
    var OrderStatusService = function ($http) {
        //The function for pagination
        this.getOrderStatuses = function (gridOptions) {
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
                url: apiPaths.paginationOrderStatus,
                params: paramObj,
            });

             
        };

     

        //The function to insert/update OrderStatus
        this.addupdateOrderStatus = function (orderStatus) {
            return $http({
                method: 'POST',
                url: apiPaths.addupdateOrderStatus,
                data: angular.toJson(orderStatus),  // pass in data as strings
            });
        };
        this.getOrderStatus = function (id) {

            return $http.get(apiPaths.getOrderStatus + id);
        };
        this.deleteOrderStatus = function (id) {

            return $http.get(apiPaths.deleteOrderStatus + id);
        };

    };
    OrderStatusService.$inject = injectParams;

    app.register.service('orderStatusService', OrderStatusService);
});