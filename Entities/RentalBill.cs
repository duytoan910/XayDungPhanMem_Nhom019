using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Entities
{
    [Table("RentalBill")]
    public class RentalBill
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public Guid rentalBillId { get; set; }
        public DateTime hireDate { get; set; }
        public DateTime paymentTerm { get; set; }
        public DateTime payDate { get; set; }
        public double lateFee { get; set; }
        public bool status { get; set; }
        [ForeignKey("Customer")]
        public Guid customerID { get; set; }
        public virtual Customer Customer { get; set; }
        [ForeignKey("Disk")]
        public Guid diskId { get; set; }
        public virtual Disk Disk { get; set; }
    }
}
