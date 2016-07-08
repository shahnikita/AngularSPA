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

        public JsonResult GetAllVendor()
        {
            IList<Vendor> vendorList = null;
            try
            {
                var vendorContext = _componentContext.Resolve<VendorLib>();
                vendorList = vendorContext.GetAllVendor();

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(vendorList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertVendor(Vendor item)
        {
            int vendorID = 0;
            try
            {
                if (ModelState.IsValid)
                {
                    var vendorContext = _componentContext.Resolve<VendorLib>();
                    vendorID = vendorContext.InsertVendor(item);
                }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return Json(vendorID!=0, JsonRequestBehavior.AllowGet);
        }
    }
}
