using AngularSPA.DataRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularSPA.DataRepository.Lib
{
    public interface IOrderLib : IDisposable
    {
       

        /// <summary>
        /// pagination to order.
        /// </summary>
        /// <param name="searchtext"></param>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="sortBy"></param>
        /// <param name="sortDirection"></param>
        /// <returns>object of PagedList for Orderstatus model </returns>
        PagedList<Order> GetAll(string searchtext, int page = 1, int pageSize = 0, string sortBy = "OrderId", string sortDirection = "asc");

        IList<OrderStatus> GetCountOrderByStatus();

        /// <summary>
        /// insert or update Order
        /// </summary>
        /// <param name="v"></param>
        /// <returns>int value of inserted/updated Order.</returns>
        int InsertUpdate(Order v);

        Order Get(int id);
    }
}
