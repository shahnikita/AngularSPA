using AngularSPA.DataRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularSPA.DataRepository.Lib
{

    public interface IOrderStatusLib : IDisposable
    {
        /// <summary>
        /// Get all orderstatus
        /// </summary>
        /// <returns></returns>
        PagedList<OrderStatus> GetAll();

        /// <summary>
        /// pagination to orderstatus.
        /// </summary>
        /// <param name="searchtext"></param>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="sortBy"></param>
        /// <param name="sortDirection"></param>
        /// <returns>object of PagedList for Orderstatus model </returns>
        PagedList<OrderStatus> GetAll(string searchtext, int page = 1, int pageSize = 10, string sortBy = "OrderStatusId", string sortDirection = "asc");

        /// <summary>
        /// get individual OrderStatus by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>object of OrderStatus</returns>
        OrderStatus Get(int id);

        /// <summary>
        /// insert or update OrderStatus
        /// </summary>
        /// <param name="v"></param>
        /// <returns>int value of inserted/updated OrderStatus.</returns>
        int InsertUpdate(OrderStatus v);

        /// <summary>
        /// delete OrderStatus by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>int value of deleted OrderStatus.</returns>
        int Delete(int id);
    }
}
