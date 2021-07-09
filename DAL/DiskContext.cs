using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;

namespace DAL
{
    class DiskContext : DbContext
    {
        public DiskContext() : base("DiskConnectionDb") { }

        public DbSet<DiskType> DiskTypes { get; set; }
        public DbSet<Disk> Disks { get; set; }
        public DbSet<DiskTitle> DiskTitles { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<RentalBill> RentalBills { get; set; }
        public DbSet<LateCharge> LateCharges { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
    }
}
