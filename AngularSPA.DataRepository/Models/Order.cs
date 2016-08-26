using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularSPA.DataRepository.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int OrderStatusId { get; set; }
        public int ProductQuantity { get; set; }
        public DateTime OrderPlacedDate { get; set; }

       [ForeignKey("CustomerId")]
        public  Customer Customer { get; set; }
        [ForeignKey("ProductId")]
        public  Product Product { get; set; }
        [ForeignKey("OrderStatusId")]
        public  OrderStatus OrderStatus { get; set; }
    }
}
