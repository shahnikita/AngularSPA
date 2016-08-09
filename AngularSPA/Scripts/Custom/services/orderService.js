'use strict';
define(['app'], function (app) {

    var apiPaths = {
        addupdateOrder: "/Home/InsertUpdateOrder/",
        getOrder: "/Home/GetOrder/",
       
        paginationOrders: '/Home/GetAllOrderPagination',
        //deleteOrderStatus: "/Home/DeleteOrderStatus/"
        getCountOrderByStatus: '/Home/GetCountOrderByStatus',
    };

    var injectParams = ['$http'];
    var OrderService = function ($http) {
        //The function for pagination
        this.getOrders = function (gridOptions) {
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
                url: apiPaths.paginationOrders,
                params: paramObj,
            });


        };

        

        this.getCountOrderByStatus = function () {
            return $http({
                method: 'GET',
                url: apiPaths.getCountOrderByStatus
            });
        }
        //The function to insert/update Order
        this.addupdateOrder = function (order) {
            return $http({
                method: 'POST',
                url: apiPaths.addupdateOrder,
                data: angular.toJson(order),  // pass in data as strings
            });
        };
        this.getOrder = function (id) {

            return $http.get(apiPaths.getOrder + id);
        };
        //this.deleteOrderStatus = function (id) {

        //    return $http.get(apiPaths.deleteOrderStatus + id);
        //};

    };
    OrderService.$inject = injectParams;

    app.register.service('orderService', OrderService);
});