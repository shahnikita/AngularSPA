using AngularSPA.DataRepository.Lib;
using AngularSPA.DataRepository.Models;
using AngularSPA.DataRepository.Repository;
using AngularSPA.Util.GlobalUtils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;

namespace AngularSPA.Core.Lib
{
    public class CustomerLib : ICustomerLib
    {


        #region "Private Variables"
        private IDataRepository<Customer> _customerContext;
        #endregion
        #region "Constructor & Destructor"
        /// <summary>
        /// Public Constructor.
        /// </summary>
        /// <param name="componentContext"></param>
        public CustomerLib(IDataRepository<Customer> customerRepo)
        {
            _customerContext = customerRepo;
        }
        #endregion

        #region "Dispose Method(s)"
        /// <summary>
        /// Method call when 
        /// </summary>
        public void Dispose()
        {
            try
            {
                GC.SuppressFinalize(this);
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            finally
            {

            }
        }

        #endregion


      

        public PagedList<Customer> GetAll(string searchtext, int page = 1, int pageSize = 10, string sortBy = "CustomerId", string sortDirection = "asc")
        {
            try
            {
                IEnumerable<Customer> customers;
                customers = _customerContext.GetAll();
                if (!string.IsNullOrWhiteSpace(searchtext))
                    customers = customers.Where(x => x.CustomerName.Contains(searchtext));
                PagedList<Customer> customerPageList = new PagedList<Customer>()
                {
                    PageSize = pageSize,
                    CurrentPage = page,
                    TotalRecords = customers.Count()
                };
                customerPageList.Content = customers
                                .OrderBy(sortBy + " " + sortDirection)
                                 .Skip((page - 1) * customerPageList.PageSize)
                                 .Take(customerPageList.PageSize).ToList();
                return customerPageList;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return null;
        }

        public Customer Get(int id)
        {
            try
            {
                Customer customer = _customerContext.GetById(id);
                return customer;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return null;
        }

        public int InsertUpdate(Customer customer)
        {
            try
            {
                customer = customer.CustomerId == 0 ? _customerContext.Add(customer) : _customerContext.Update(customer);
                _customerContext.SaveChanges();
                return customer.CustomerId;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return 0;
        }

        public int Delete(int id)
        {
            try
            {
                if (id != 0)
                {
                    _customerContext.Delete(id);
                    _customerContext.SaveChanges();
                    return id;
                }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return 0;
        }
    }
}
