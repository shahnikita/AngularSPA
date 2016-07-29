using AngularSPA.DataRepository.Lib;
using AngularSPA.DataRepository.Models;
using AngularSPA.DataRepository.Repository;
using AngularSPA.Util.GlobalUtils;
using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;


namespace AngularSPA.Core.Lib
{
    public class ProductLib : IProductLib
    {
        #region "Private Variables"
        private IDataRepository<Product> _productContext;
        private IDataRepository<Vendor> _vendorContext;
        #endregion

        #region "Constructor"
        /// <summary>
        /// Public Constructor.
        /// </summary>
        /// <param name="componentContext"></param>
        public ProductLib(IDataRepository<Product> productRepo, IDataRepository<Vendor> vendorRepo)
        {
            _productContext = productRepo;
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

        public PagedList<Product> GetAll()
        {
            try
            {
                PagedList<Product> products = new PagedList<Product>();
                products.Content = _productContext.GetAll().ToList();
                return products;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return null;
        }

        public PagedList<Product> GetAll(string searchtext, int page = 1, int pageSize = 10, string sortBy = "ProductId", string sortDirection = "asc")
        {
            try
            {
                IEnumerable<Product> products;
                products = _productContext.GetAll();
                if (products.Any())
                {
                    if (!string.IsNullOrWhiteSpace(searchtext))
                        products = products.Where(x => x.ProductName.Contains(searchtext));
                    PagedList<Product> productsPageList = new PagedList<Product>()
                    {
                        PageSize = pageSize,
                        CurrentPage = page,
                        TotalRecords = products.Count()
                    };
                    productsPageList.Content = products.OrderBy(sortBy + " " + sortDirection)
                                                .Skip((page - 1) * pageSize)
                                                .Take(pageSize)
                                                .ToList();
                    productsPageList.Content.ForEach(x => x.Vendor = _vendorContext.GetById(x.VendorId));
                    return productsPageList;
                }
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return null;
        }

        public Product Get(int id)
        {
            try
            {
                Product product = new Product();
                product = _productContext.GetById(id);
                product.Vendor = _vendorContext.GetById(product.VendorId);
                return product;
            }
            catch (Exception ex)
            {
                GlobalUtil.HandleAndLogException(ex, this);
            }
            return null;
        }

        public int InsertUpdate(Product pmodel)
        {
            try
            {
                Product p = new Product()
                {
                    ProductId=pmodel.ProductId,
                    ProductName=pmodel.ProductName,
                    VendorId=pmodel.VendorId
                };
                p = p.ProductId == 0 ? _productContext.Add(p) : _productContext.Update(p);
                _productContext.SaveChanges();


                return p.ProductId;
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

                _productContext.Delete(id);
                _productContext.SaveChanges();
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
