'use strict';
define(['app'], function (app) {

    var injectParams = [];
    var GridModel = function () {
        return {
            data: null,
            pageSize: 5,
            pageNumber: 1,
            pageOptions: [5, 10, 20, 50, 100, 200],
            totalItems: 0,
            sortBy:null,
            sortDirection: false,//bit
            search: null,
            getTotalPages: function () {
                return Math.ceil(this.totalItems / this.pageSize);
            },
            nextPage: function () {
                if (this.pageNumber < this.getTotalPages()) {
                    this.pageNumber++;
                    this.load();
                }
            },
            previousPage: function () {
                if (this.pageNumber > 1) {
                    this.pageNumber--;
                    this.load();
                }
            },
            changePageNumber: function (n) {
                this.pageNumber = n;
                this.load();
            },
            changeSorting: function (sort) {
                this.sortBy = sort;
                this.sortDirection = this.sortDirection != null ? !this.sortDirection : false;
                this.load();
            }
        }

    };
    GridModel.$inject = injectParams;

    app.register.service('gridModel', GridModel);



});
