using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    [Table("Reservation")]
    public class Reservation
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public Guid id { get; set; }
        public DateTime dateOrder { get; set; }

        [ForeignKey("DiskTitle")]
        public Guid diskTitleId { get; set; }

        [ForeignKey("Customer")]
        public Guid customerID { get; set; }

        [ForeignKey("Disk")]
        public Guid? diskId { get; set; }

        [JsonIgnore]
        public virtual DiskTitle DiskTitle { get; set; }
        [JsonIgnore]
        public virtual Customer Customer { get; set; }
        [JsonIgnore]
        public virtual Disk Disk { get; set; }
    }
}
