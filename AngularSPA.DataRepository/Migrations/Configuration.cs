namespace AngularSPA.DataRepository.Migrations
{
    using AngularSPA.DataRepository.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public class Configuration : DbMigrationsConfiguration<AngularSPA.DataRepository.Models.AngularSPAContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(AngularSPA.DataRepository.Models.AngularSPAContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            Random rand = new Random();
            for (int i = 0; i < 10000; i++)
            {
                context.Order.Add(new Order()
                {
                    CustomerId = rand.Next(1, 3),
                    OrderStatusId = rand.Next(1, 3),
                    ProductId = rand.Next(1, 4),
                    ProductQuantity = rand.Next(1, 100)

                });

            }
            context.SaveChanges();
        }
    }
}
