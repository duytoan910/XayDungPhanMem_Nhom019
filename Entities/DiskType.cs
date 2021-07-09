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
    [Table("DiskType")]
    public class DiskType
    {
        [Key]
        public string diskTypeId { get; set; }

        public string diskName { get; set; }
        public double rentalCharge { get; set; }
        public double lateFee { get; set; }
        public int rentalPeriod  { get; set; }

        [JsonIgnore]
        //Nối đến Disk
        public virtual ICollection<DiskTitle> DiskTitles { get; set; }
    }
}
