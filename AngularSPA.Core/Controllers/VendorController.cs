using AngularSPA.Core.Lib;
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
    public class VendorController : Controller
    {
        #region "Private variables"
        private readonly IVendorLib _vendorRepository;
        #endregion

        public VendorController(IVendorLib vendorRepository)
        {
            _vendorRepository = vendorRepository;
        }

        public JsonResult GetAllVendor()
        {
            IList<Vendor> vendorList = null;
            try
            {
                vendorList = _vendorRepository.GetAll().Content;

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(vendorList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllVendorPagination(string searchtext, int page = 1, int pageSize = 10, string sortBy = "VendorId", string sortDirection = "asc")
        {
            PagedList<Vendor> vendorList = null;
            try
            {
                vendorList = _vendorRepository.GetAll(searchtext, page, pageSize, sortBy, sortDirection);

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
                    vendorID =
                        _vendorRepository.InsertUpdate(item);
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

                vendor = _vendorRepository.Get(id);

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

                vendorID = _vendorRepository.Delete(id);

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(vendorID != 0, JsonRequestBehavior.AllowGet);
        }
    }
}
