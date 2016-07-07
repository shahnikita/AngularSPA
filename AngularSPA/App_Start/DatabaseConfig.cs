using AngularSPA.DataRepository.Models;
using AngularSPA.DataRepository.Migrations;
using Autofac;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Web;
using System.Data.Entity;
using AngularSPA.Util.GlobalUtils;

namespace AngularSPA.App_Start
{
    public class DatabaseConfig
    {
        public static void Initialize(IComponentContext componentContext)
        {
            try
            {
                Database.SetInitializer(new MigrateDatabaseToLatestVersion<AngularSPAContext,Configuration>());
                using (var dbContext = componentContext.Resolve<DbContext>())
                {

                   dbContext.Database.Initialize(true);
                    //if (!dbContext.Database.Exists())
                    //{
                    //    dbContext.Database.Initialize(false);

                    //}


                }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, typeof(DatabaseConfig));
                throw;
            }
        }
    }
}