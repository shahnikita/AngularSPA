using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularSPA.DataRepository.Models
{
    public class OrderStatus
    {
        [Key]
        public byte OrderStatusId { get; set; }
        [MaxLength(150)]
        public string OrderStatusName { get; set; }
    }
}
