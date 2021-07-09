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
    [Table("DiskTitle")]
    public class DiskTitle
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public Guid diskTitleId { get; set; }
        public string diskTitleName { get; set; }

        [ForeignKey("DiskType")]
        public string diskTypeId { get; set; }
        public virtual DiskType DiskType { get; set; }

        //Nối đến Disk
        [JsonIgnore]
        public virtual ICollection<Disk> Disks { get; set; }

        //Nối đến 
        [JsonIgnore]
        public virtual ICollection<Reservation> Reservations { get; set; }

    }
}
