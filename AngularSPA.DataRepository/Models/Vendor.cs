

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace AngularSPA.DataRepository.Models
{

    public class Vendor
    {
        [Key]
        public int VendorId { get; set; }
        [Required]
        public string VendorName { get; set; }
    }
}
