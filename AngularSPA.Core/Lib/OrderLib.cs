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


        public int InsertUpdate(Order v)
        {
            try
            {
                v = v.OrderId == 0 ? _orderContext.Add(v) : _orderContext.Update(v);
                _orderContext.SaveChanges();


                return v.OrderId;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return 0;
        }

        public PagedList<Order> GetAll(string searchtext, int page = 1, int pageSize = 0, string sortBy = "OrderId", string sortDirection = "asc")
        {
            try
            {
                IEnumerable<Order> order;
                order = _orderContext.GetAll();
                if (!string.IsNullOrWhiteSpace(searchtext))
                    order = order.Where(x => x.Customer.CustomerName.Contains(searchtext)
                                             || x.OrderStatus.OrderStatusName.Contains(searchtext));
                PagedList<Order> orderPageList = new PagedList<Order>()
                {
                    CurrentPage = page,
                    TotalRecords = order.Count(),
                    PageSize = pageSize,
                };
                orderPageList.Content = order.OrderBy(sortBy + " " + sortDirection)
                                        .Skip((page - 1) * orderPageList.PageSize).Take(orderPageList.PageSize).ToList();

                orderPageList.Content.ForEach(x =>
                {
                    x.Product = _productRepo.Get(x.ProductId);
                    x.Customer = _customerRepo.Get(x.CustomerId);
                    x.OrderStatus = _orderStatusRepo.Get(x.OrderStatusId);
                });
                return orderPageList;

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return null;
        }
        public IList<OrderStatus> GetCountOrderByStatus()
        {
            IList<OrderStatus> count = null;
            try
            {
                count = _orderContext.GetAll()
                    .GroupBy(x => x.OrderStatus).ToList()
                    .Select(x => new OrderStatus()
                    {
                        OrderCount = x.Count(),
                        OrderStatusId = x.Key.OrderStatusId,
                        OrderStatusName = x.Key.OrderStatusName
                    }).ToList();
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return count;

        }

        public Order Get(int id)
        {
            Order order = null;
            try {

                order = _orderContext.GetById(id);
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return order;
        }
    }
}
