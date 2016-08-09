using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularSPA.DataRepository.Models
{
    public class OrderStatus
    {
        [Key]
        public int OrderStatusId { get; set; }
        [MaxLength(150)]
        public string OrderStatusName { get; set; }

        [NotMapped]
        public int OrderCount { get; set; }
    }
}
