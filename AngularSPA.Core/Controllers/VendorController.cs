using AngularSPA.Core.Lib;
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
    public class VendorController : Controller
    {
        #region "Private variables"
        private readonly IComponentContext _componentContext;
        #endregion

        public VendorController(IComponentContext componentContext)
        {
            _componentContext = componentContext;
        }

        public JsonResult GetAllVendor(int page = 1, int pageSize = 10, string sortBy = "VendorId", string sortDirection = "asc")
        {
            IList<Vendor> vendorList = null;
            try
            {
                var vendorContext = _componentContext.Resolve<VendorLib>();
                vendorList = vendorContext.GetAll();

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(vendorList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpdateVendor(Vendor item)
        {
            int vendorID = 0;
            try
            {
                if (ModelState.IsValid)
                {
                    var vendorContext = _componentContext.Resolve<VendorLib>();


                    vendorID =
                        vendorContext.InsertUpdate(item);


                }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return Json(vendorID != 0, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetVendor(int id)
        {
            Vendor vendor = null;
            try
            {
                var vendorContext = _componentContext.Resolve<VendorLib>();
                vendor = vendorContext.Get(id);

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(vendor, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteVendor(int id)
        {
            int vendorID = 0;
            try
            {
                var vendorContext = _componentContext.Resolve<VendorLib>();
                vendorID = vendorContext.Delete(id);

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(vendorID!=0, JsonRequestBehavior.AllowGet);
        }
    }
}
