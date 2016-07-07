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
        private readonly IComponentContext _componentContext;
        #endregion

        public HomeController(IComponentContext componentContext)
        {
            _componentContext = componentContext;
        }
        public ActionResult Index()
        {
            return View();
        }
    }
}
