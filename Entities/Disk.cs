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
    [Table("Disk")]
    public class Disk
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public Guid diskId { get; set; }
        public string diskCode { get; set; }
        public string status { get; set; }
        public DateTime dateAdd { get; set; }
        [ForeignKey("DiskTitle")]
        public Guid diskTitleId { get; set; }
        public virtual DiskTitle DiskTitle { get; set; }
        //Liên kết RentalBill
        [JsonIgnore]
        public virtual ICollection<RentalBill> RentalBills { get; set; }
    }
}
