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
      
        public int VendorId { get; set; }
        [Required]
        public string VendorName { get; set; }
    }
}
