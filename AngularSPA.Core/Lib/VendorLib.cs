
using AngularSPA.DataRepository.Models;
using AngularSPA.DataRepository.Repository;
using AngularSPA.Util.GlobalUtils;
using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Dynamic;
using AngularSPA.DataRepository.Lib;

namespace AngularSPA.Core.Lib
{
    public class VendorLib : IVendorLib
    {
        #region "Private Variables"
        private IDataRepository<Vendor> _vendorContext;
        #endregion

        #region "Constructor & Destructor"
        /// <summary>
        /// Public Constructor.
        /// </summary>
        /// <param name="componentContext"></param>
        public VendorLib(IDataRepository<Vendor> vendorRepo)
        {
            _vendorContext = vendorRepo;
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

   

        public PagedList<Vendor> GetAll(string searchtext, int page = 1, int pageSize = 0, string sortBy = "VendorId", string sortDirection = "asc")
        {
            try
            {
                IEnumerable<Vendor> vendors;
                vendors = _vendorContext.GetAll();
                if (!string.IsNullOrWhiteSpace(searchtext))
                    vendors = vendors.Where(x => x.VendorName.Contains(searchtext));
                PagedList<Vendor> vendorsPageList = new PagedList<Vendor>()
                {
                    CurrentPage = page,
                    TotalRecords = vendors.Count(),
                    PageSize=pageSize
                };
                
                vendorsPageList.Content = vendors.OrderBy(sortBy + " " + sortDirection)
                                            .Skip((page - 1) * vendorsPageList.PageSize)
                                            .Take(vendorsPageList.PageSize).ToList();
                return vendorsPageList;

            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return null;
        }

        public Vendor Get(int id)
        {
            try
            {
                Vendor vendor = _vendorContext.GetById(id);
                return vendor;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return null;
        }

        public int InsertUpdate(Vendor v)
        {
            try
            {
                v = v.VendorId == 0 ? _vendorContext.Add(v) : _vendorContext.Update(v);
                _vendorContext.SaveChanges();


                return v.VendorId;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return 0;
        }

        public int Delete(int id)
        {
            try
            {
                _vendorContext.Delete(id);
                _vendorContext.SaveChanges();
                return id;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return 0;
        }

    }
}
