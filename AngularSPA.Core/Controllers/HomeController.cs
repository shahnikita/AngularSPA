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

        public JsonResult GetAllOrderPagination(string searchtext, int page = 1, int pageSize = 10, string sortBy = "OrderId", string sortDirection = "asc")
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

        public JsonResult GetAllOrder()
        {
            IList<Order> ordertList = null;
            try
            {
                ordertList = _orderRepository.GetAll();
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return Json(ordertList, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}
