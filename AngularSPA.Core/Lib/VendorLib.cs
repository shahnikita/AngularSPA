using AngularSPA.DataRepository.Models;
using AngularSPA.DataRepository.Repository;
using AngularSPA.Util.GlobalUtils;
using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularSPA.Core.Lib
{
    public class VendorLib
    {
         #region "Private Variables"
        private IComponentContext _componentContext;
        #endregion

        #region "Constructor & Destructor"
        /// <summary>
        /// Public Constructor.
        /// </summary>
        /// <param name="componentContext"></param>
        public VendorLib(IComponentContext componentContext)
        {
            _componentContext = componentContext;
        }
        #endregion

        #region "Dispose Method(s)"
        /// <summary>
        /// Method call when 
        /// </summary>
        public void Dispose()
        {
            try
            {
                GC.SuppressFinalize(this);
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            finally
            {

            }
        }

        #endregion

        public List<Vendor> GetAllVendor()
        {
            try
            {
                List<Vendor> vendors = new List<Vendor>();
                using (var vendorContext = _componentContext.Resolve<IDataRepository<Vendor>>())
                {
                    vendors = vendorContext.GetAll().ToList();

                }
                return vendors;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return null;
        }

        public int InsertVendor(Vendor v)
        {
            try
            {             
                using (var vendorContext = _componentContext.Resolve<IDataRepository<Vendor>>())
                {
                    v=vendorContext.Add(v);
                    vendorContext.SaveChanges();

                }
                return v.VendorId;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return 0;
        }
    }
}
