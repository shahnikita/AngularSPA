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
    public class OrderLib : IOrderLib
    {
        #region "Private Variables"
        private IDataRepository<Order> _orderContext;
        private ICustomerLib _customerRepo;
        private IProductLib _productRepo;
        private IOrderStatusLib _orderStatusRepo;
        #endregion

        #region "Constructor & Destructor"
        /// <summary>
        /// Public Constructor.
        /// </summary>
        /// <param name="componentContext"></param>
        public OrderLib(IDataRepository<Order> orderContext
                        , ICustomerLib customerRepo
                        , IProductLib productRepo
                        , IOrderStatusLib orderStatusRepo 
                        )
        {
            _orderContext = orderContext;
            _customerRepo = customerRepo;
            _productRepo = productRepo;
            _orderStatusRepo = orderStatusRepo;
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


        public IList<Order> GetAll()
        {
            try
            {
                List<Order> order = new List<Order>();
                order = _orderContext.GetAll().ToList();
                order.ForEach(x =>
                    {
                        x.OrderStatus = _orderStatusRepo.Get(x.OrderStatusId);
                        x.Product = _productRepo.Get(x.ProductId);
                        x.Customer = _customerRepo.Get(x.CustomerId);
                    });
               
                return order;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return null;
        }

        public PagedList<Order> GetAll(string searchtext, int page = 1, int pageSize = 10, string sortBy = "OrderId", string sortDirection = "asc")
        {
            try
            {
                IEnumerable<Order> order;
                order = _orderContext.GetAll();
                if (!string.IsNullOrWhiteSpace(searchtext))
                    order = order.Where(x => x.Customer.CustomerName.Contains(searchtext)
                                             || x.OrderStatus.OrderStatusName.Contains(searchtext));
                PagedList<Order> orderStatusPageList = new PagedList<Order>()
                {
                    PageSize = pageSize,
                    CurrentPage = page,
                    TotalRecords = order.Count()
                };
                orderStatusPageList.Content = order.OrderBy(sortBy + " " + sortDirection).Skip((page - 1) * pageSize).Take(pageSize).ToList();
                return orderStatusPageList;

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return null;
        }
    
    }
}
