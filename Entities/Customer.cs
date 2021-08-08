using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Entities
{
    [Table("Customer")]
    public class Customer
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public Guid customerID { get; set; }
        public string customerCode { get; set; }
        public string customerName { get; set; }
        public string customerAddress { get; set; }
        public string customerPhone { get; set; }

        //Nối đến RentalBill
        //[JsonIgnore]
        //public virtual ICollection<RentalBill> RentalBills { get; set; }

        //Nối đến Reservation
        //[JsonIgnore]
        //public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
