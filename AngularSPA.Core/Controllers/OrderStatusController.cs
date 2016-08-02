using AngularSPA.DataRepository.Lib;
using AngularSPA.DataRepository.Models;
using AngularSPA.Util.GlobalUtils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace AngularSPA.Core.Controllers
{
    public class OrderStatusController:Controller
    {
        #region "Private variables"
        private readonly IOrderStatusLib _orderStatusRepository;
        #endregion

        public OrderStatusController(IOrderStatusLib orderStatusRepository)
        {
            _orderStatusRepository = orderStatusRepository;
        }

        public JsonResult GetAllOrderStatus()
        {
            IList<OrderStatus> orderStatusList = null;
            try
            {
                orderStatusList = _orderStatusRepository.GetAll().Content;

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(orderStatusList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllOrderStatusPagination(string searchtext, int page = 1, int pageSize = 10, string sortBy = "OrderStatusId", string sortDirection = "asc")
        {
            PagedList<OrderStatus> orderStatusList = null;
            try
            {
                orderStatusList = _orderStatusRepository.GetAll(searchtext, page, pageSize, sortBy, sortDirection);

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(orderStatusList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpdateOrderStatus(OrderStatus item)
        {
            int orderStatusID = 0;
            try
            {
                if (ModelState.IsValid)
                {
                    orderStatusID =
                        _orderStatusRepository.InsertUpdate(item);
                }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return Json(orderStatusID != 0, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOrderStatus(int id)
        {
            OrderStatus orderStatus = null;
            try
            {

                orderStatus = _orderStatusRepository.Get(id);

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(orderStatus, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteOrderStatus(int id)
        {
            int orderStatusID = 0;
            try
            {

                orderStatusID = _orderStatusRepository.Delete(id);

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(orderStatusID != 0, JsonRequestBehavior.AllowGet);
        }
    }
}
