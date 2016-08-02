'use strict';
define(['app'], function (app) {

    var apiPaths = {
        //addupdateOrderStatus: "/Home/InsertUpdateOrderStatus/",
        //getOrderStatus: "/Home/GetOrderStatus/",
        getAllOrder: '/Home/GetAllOrder',
        //paginationOrderStatus: '/Home/GetAllOrderStatusPagination',
        //deleteOrderStatus: "/Home/DeleteOrderStatus/"
    };

    var injectParams = ['$http'];
    var OrderService = function ($http) {
        //The function for pagination
        //this.getOrderStatuses = function (gridOptions) {
        //    return $http({
        //        method: 'GET',
        //        url: apiPaths.paginationOrderStatus,
        //        params: {
        //            searchtext: gridOptions.search,
        //            page: gridOptions.pageNumber,
        //            pageSize: gridOptions.pageSize,
        //            sortBy: gridOptions.sortBy,
        //            sortDirection: gridOptions.sortDirection ? 'desc' : 'asc'
        //        },
        //    });


        //};

        this.getAllOrder= function () {
            return $http({
                method: 'GET',
                url: apiPaths.getAllOrder
            });
        }

        ////The function to insert/update OrderStatus
        //this.addupdateOrderStatus = function (orderStatus) {
        //    return $http({
        //        method: 'POST',
        //        url: apiPaths.addupdateOrderStatus,
        //        data: angular.toJson(orderStatus),  // pass in data as strings
        //    });
        //};
        //this.getOrderStatus = function (id) {

        //    return $http.get(apiPaths.getOrderStatus + id);
        //};
        //this.deleteOrderStatus = function (id) {

        //    return $http.get(apiPaths.deleteOrderStatus + id);
        //};

    };
    OrderService.$inject = injectParams;

    app.register.service('orderService', OrderService);
});