using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularSPA.DataRepository.Models
{
    public class PagedList<T> where T : class
    {

        public List<T> Content { get; set; }

        private int _currentPage { get; set; }
        public int CurrentPage
        {
            get { return this._currentPage == 0 ? 1 : this._currentPage; }
            set { this._currentPage = value; }
        }
        private int _pageSize { get; set; }
        public int PageSize
        {
            get { return this._pageSize == 0 ? this.Content.Count : this._pageSize; }
            set { this._pageSize = value; }
        }
        private int _totalRecords { get; set; }
        public int TotalRecords
        {
            get { return this._totalRecords == 0 ? this.Content.Count : this._totalRecords; }
            set { this._totalRecords = value; }
        }

        public int TotalPages
        {
            get { return (int)Math.Ceiling((decimal)TotalRecords / PageSize); }
        }
    }
}
