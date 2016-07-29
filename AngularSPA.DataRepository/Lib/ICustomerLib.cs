using AngularSPA.DataRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularSPA.DataRepository.Lib
{
    public interface ICustomerLib
    {
        /// <summary>
        /// Get all Customers
        /// </summary>
        /// <returns></returns>
        PagedList<Customer> GetAll();

        /// <summary>
        /// pagination to Customers.
        /// </summary>
        /// <param name="searchtext"></param>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="sortBy"></param>
        /// <param name="sortDirection"></param>
        /// <returns>object of PagedList for Customer model </returns>
        PagedList<Customer> GetAll(string searchtext, int page = 1, int pageSize = 10, string sortBy = "CustomerId", string sortDirection = "asc");

        /// <summary>
        /// get individual Customer by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>object of Customer</returns>
        Customer Get(int id);

        /// <summary>
        /// insert or update Customer
        /// </summary>
        /// <param name="v"></param>
        /// <returns>int value of inserted/updated Customer.</returns>
        int InsertUpdate(Customer v);

        /// <summary>
        /// delete Customer by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>int value of deleted Customer.</returns>
        int Delete(int id);
    }
}
