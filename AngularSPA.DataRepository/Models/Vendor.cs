using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularSPA.DataRepository.Models
{
    public class Vendor
    {
        [Key]
        public int VendorId { get; set; }
        public string VendorName { get; set; }
    }
}
