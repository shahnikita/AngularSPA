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
   public class CustomerController: Controller
    {
       #region "Private variables"
       private readonly ICustomerLib _customerRepository;
       #endregion

       public CustomerController(ICustomerLib customerRepository)
       {
           _customerRepository = customerRepository;
       }




       public JsonResult GetAllCustomerPagination(string searchtext, int page = 1, int pageSize = 0, string sortBy = "CustomerId", string sortDirection = "asc")
       {
           PagedList<Customer> customerList = null;
           try
           {
               customerList = _customerRepository.GetAll(searchtext, page, pageSize, sortBy, sortDirection);

           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
           }

           return Json(customerList, JsonRequestBehavior.AllowGet);
       }

       [HttpPost]
       public JsonResult InsertUpdateCustomer(Customer item)
       {
           int customerID = 0;
           try
           {
               if (ModelState.IsValid)
               {
                   customerID =
                       _customerRepository.InsertUpdate(item);
               }
           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
           }
           return Json(customerID != 0, JsonRequestBehavior.AllowGet);
       }

       public JsonResult GetCustomer(int id)
       {
           Customer customer = null;
           try
           {

               customer = _customerRepository.Get(id);

           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
           }

           return Json(customer, JsonRequestBehavior.AllowGet);
       }

       public JsonResult DeleteCustomer(int id)
       {
           int customerID = 0;
           try
           {

               customerID = _customerRepository.Delete(id);

           }
           catch (Exception ex)
           {
               GlobalUtil.HandleAndLogException(ex, this);
           }

           return Json(customerID != 0, JsonRequestBehavior.AllowGet);
       }
    }
}
