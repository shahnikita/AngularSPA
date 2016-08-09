using AngularSPA.DataRepository.Lib;
using AngularSPA.DataRepository.Models;
using AngularSPA.DataRepository.Repository;
using AngularSPA.Util.GlobalUtils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Dynamic;

namespace AngularSPA.Core.Lib
{
    public class OrderStatusLib :IOrderStatusLib
    {
        #region "Private Variables"
        private IDataRepository<OrderStatus> _orderStatusContext;
        #endregion

        #region "Constructor & Destructor"
        /// <summary>
        /// Public Constructor.
        /// </summary>
        /// <param name="componentContext"></param>
        public OrderStatusLib(IDataRepository<OrderStatus> orderRepo)
        {
            _orderStatusContext = orderRepo;
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
      

        public PagedList<OrderStatus> GetAll(string searchtext, int page = 1, int pageSize = 0, string sortBy = "OrderStatusId", string sortDirection = "asc")
        {
            try
            {
                IEnumerable<OrderStatus> orderStatus;
                orderStatus = _orderStatusContext.GetAll();
                if (!string.IsNullOrWhiteSpace(searchtext))
                    orderStatus = orderStatus.Where(x => x.OrderStatusName.Contains(searchtext));
                PagedList<OrderStatus> orderStatusPageList = new PagedList<OrderStatus>()
                {
                   
                    CurrentPage = page,
                    TotalRecords = orderStatus.Count(),
                    PageSize=pageSize
                };
               
                orderStatusPageList.Content = orderStatus
                    .OrderBy(sortBy + " " + sortDirection)
                    .Skip((page - 1) * orderStatusPageList.PageSize).Take(orderStatusPageList.PageSize).ToList();
                return orderStatusPageList;

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return null;
        }

        public OrderStatus Get(int id)
        {
            try
            {
                OrderStatus orderStatus = _orderStatusContext.GetById(id);
                return orderStatus;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return null;
        }

        public int InsertUpdate(OrderStatus v)
        {
            try
            {
                v = v.OrderStatusId == 0 ? _orderStatusContext.Add(v) : _orderStatusContext.Update(v);
                _orderStatusContext.SaveChanges();


                return v.OrderStatusId;
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
                _orderStatusContext.Delete(id);
                _orderStatusContext.SaveChanges();
                return id;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return 0;
        }

      
    }
}
