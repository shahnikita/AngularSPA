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
        /// Get all order
        /// </summary>
        /// <returns></returns>
        IList<Order> GetAll();

        /// <summary>
        /// pagination to order.
        /// </summary>
        /// <param name="searchtext"></param>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="sortBy"></param>
        /// <param name="sortDirection"></param>
        /// <returns>object of PagedList for Orderstatus model </returns>
        PagedList<Order> GetAll(string searchtext, int page = 1, int pageSize = 10, string sortBy = "OrderId", string sortDirection = "asc");

    }
}
