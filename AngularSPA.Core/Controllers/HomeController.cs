using AngularSPA.DataRepository.Lib;
using AngularSPA.DataRepository.Models;
using AngularSPA.Util.GlobalUtils;
using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace AngularSPA.Core.Controllers
{
    public class HomeController : Controller
    {
        #region "Private variables"
        private readonly IOrderLib _orderRepository;
        #endregion

        public HomeController(IOrderLib orderRepository)
        {
            _orderRepository = orderRepository;
        }
        #region Public Variable"

        public JsonResult GetAllOrderPagination(string searchtext, int page = 1, int pageSize = 0, string sortBy = "OrderId", string sortDirection = "asc")
        {
            PagedList<Order> orderList = null;
            try
            {

                orderList = _orderRepository.GetAll(searchtext, page, pageSize, sortBy, sortDirection);

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(orderList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpdateOrder(Order item) {
            int orderID = 0;
            try
            {
                if (ModelState.IsValid)
                {
                    orderID =
                        _orderRepository.InsertUpdate(item);
                }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return Json(orderID != 0, JsonRequestBehavior.AllowGet);
        
        }

        public JsonResult GetCountOrderByStatus()
        {
            IList<OrderStatus> orderStatusList = null;
            try
            {
                orderStatusList = _orderRepository.GetCountOrderByStatus();
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return Json(orderStatusList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOrder(int id)
        {
            Order order= null;
            try
            {
                order = _orderRepository.Get(id);
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(order, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}
