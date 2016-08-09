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
    public class ProductController : Controller
    {
        #region "Private variables"
        private readonly IProductLib _productRepository;
        #endregion

        #region "Constructor"
        public ProductController(IProductLib productRepository)
        {
            _productRepository = productRepository;
        }
        #endregion

        #region Public Variable"

        public JsonResult GetAllProduct(string searchtext, int page = 1, int pageSize = 0, string sortBy = "ProductId", string sortDirection = "asc")
        {
            PagedList<Product> productList = null;
            try
            {

                productList = _productRepository.GetAll(searchtext, page, pageSize, sortBy, sortDirection);

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(productList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpdateProduct(Product item)
        {
            int productID = 0;
            try
            {
                if (ModelState.IsValid)
                    productID = _productRepository.InsertUpdate(item);

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return Json(productID != 0, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProduct(int id)
        {
            Product product = null;
            try
            {
                product = _productRepository.Get(id);

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(product, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteProduct(int id)
        {
            int productID = 0;
            try
            {
                productID = _productRepository.Delete(id);

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }

            return Json(productID != 0, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}
