using AngularSPA.Core.Controllers;
using AngularSPA.Core.Lib;
using AngularSPA.Core.Repository;
using AngularSPA.DataRepository.Lib;
using AngularSPA.DataRepository.Models;
using AngularSPA.DataRepository.Repository;
using AngularSPA.Util.GlobalUtils;
using Autofac;
using Autofac.Integration.Mvc;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularSPA.App_Start
{
    public class IocConfig
    {
        public static Autofac.IContainer RegisterDependencies()
        {
            try
            {
                var containerBuilder = new ContainerBuilder();

                /*Register all the controllers within the current assembly.*/
                containerBuilder.RegisterControllers(typeof(HomeController).Assembly);

                /*Register Libs Files Here*/
                containerBuilder.RegisterType<VendorLib>().As<IVendorLib>();
                containerBuilder.RegisterType<ProductLib>().As<IProductLib>();
                containerBuilder.RegisterType<CustomerLib>().As<ICustomerLib>();

                //Register Database Configuration
                containerBuilder.RegisterType(typeof(DatabaseConfig)).InstancePerDependency();

                //Register Database Context
                containerBuilder.RegisterType<AngularSPAContext>().As<DbContext>().InstancePerDependency();

                //Register Database Repository
                containerBuilder.RegisterGeneric(typeof(DataRepository<>)).As(typeof(IDataRepository<>)).
                    InstancePerDependency();




                var container = containerBuilder.Build();
                var resolver = new AutofacDependencyResolver(container);
                DependencyResolver.SetResolver(resolver);
                return container;

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, typeof(IocConfig));
                return null;
            }
        }
    }
}