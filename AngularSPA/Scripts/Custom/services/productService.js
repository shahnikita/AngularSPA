'use strict';
define(['app'], function (app) {

    var apiPaths = {
        addupdateProduct: "/Product/InsertUpdateProduct/",
        getProduct: "/Product/GetProduct/",
        getAllProduct: '/Product/GetAllProduct',
        deleteProduct: "/Product/DeleteProduct/"
    };
    var injectParams = ['$http'];
    var ProductService = function ($http) {

        //The function to read all Products
        this.getProducts = function (gridOptions) {
            var paramObj={};
            if(gridOptions){
                paramObj={
                    searchtext: gridOptions.search,
                    page: gridOptions.pageNumber,
                    pageSize: gridOptions.pageSize,
                    sortBy: gridOptions.sortBy,
                    sortDirection: gridOptions.sortDirection ? 'desc' : 'asc'
                };
            }
            return $http({
                method: 'GET',
                url: apiPaths.getAllProduct,
                params: paramObj,
            });
        };

        //The function to insert/update Product
        this.addupdateProduct = function (product) {

            return $http({
                method: 'POST',
                url: apiPaths.addupdateProduct,
                data: angular.toJson(product),  // pass in data as strings

            });
        };
        this.getProduct = function (id) {

            return $http.get(apiPaths.getProduct + id);
        };
        this.deleteProduct = function (id) {

            return $http.get(apiPaths.deleteProduct + id);
        };

    };
    ProductService.$inject = injectParams;

    app.register.service('productService', ProductService);



});



