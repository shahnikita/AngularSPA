using AngularSPA.DataRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularSPA.DataRepository.Lib
{
    public interface IProductLib : IDisposable
    {
        /// <summary>
        /// Get all products
        /// </summary>
        /// <returns></returns>
        PagedList<Product> GetAll();

        /// <summary>
        /// pagination to products.
        /// </summary>
        /// <param name="searchtext"></param>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="sortBy"></param>
        /// <param name="sortDirection"></param>
        /// <returns>object of PagedList for Product model </returns>
        PagedList<Product> GetAll(string searchtext, int page = 1, int pageSize = 10, string sortBy = "ProductId", string sortDirection = "asc");

        /// <summary>
        /// get individual Product by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>object of Product</returns>
        Product Get(int id);

        /// <summary>
        /// insert or update Product
        /// </summary>
        /// <param name="v"></param>
        /// <returns>int value of inserted/updated Product.</returns>
        int InsertUpdate(Product v);

        /// <summary>
        /// delete Product by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>int value of deleted Product.</returns>
        int Delete(int id);
    }
}
