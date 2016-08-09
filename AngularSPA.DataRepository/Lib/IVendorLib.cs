using AngularSPA.DataRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularSPA.DataRepository.Lib
{
    public interface IVendorLib : IDisposable
    {

        /// <summary>
        /// pagination to vendors.
        /// </summary>
        /// <param name="searchtext"></param>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="sortBy"></param>
        /// <param name="sortDirection"></param>
        /// <returns>object of PagedList for vendor model </returns>
        PagedList<Vendor> GetAll(string searchtext, int page = 1, int pageSize = 0, string sortBy = "VendorId", string sortDirection = "asc");

        /// <summary>
        /// get individual vendor by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>object of vendor</returns>
        Vendor Get(int id);

        /// <summary>
        /// insert or update vendor
        /// </summary>
        /// <param name="v"></param>
        /// <returns>int value of inserted/updated vendor.</returns>
        int InsertUpdate(Vendor v);

        /// <summary>
        /// delete vendor by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>int value of deleted vendor.</returns>
        int Delete(int id);
    }
}
