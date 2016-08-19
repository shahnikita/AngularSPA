using AngularSPA.DataRepository.Models;

using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using AngularSPA.Util.GlobalUtils;
using AngularSPA.DataRepository.Migrations;

namespace AngularSPA.App_Start
{
    public class DatabaseConfig
    {
        public static void Initialize(IComponentContext componentContext)
        {
            try
            {

                
                using (var dbContext = componentContext.Resolve<DbContext>())
                {
                    
                   
                   // dbContext.Database.Initialize(false);

                    if (!dbContext.Database.Exists())
                    {
                        Database.SetInitializer(new MigrateDatabaseToLatestVersion<AngularSPAContext, Configuration>());
                        dbContext.Database.Initialize(false);

                    }


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