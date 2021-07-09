using Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DiskTypeDAL
    {
        DiskContext db;

        public DiskTypeDAL()
        {
            db = new DiskContext();
        }

        public List<DiskType> getAllDiskType()
        {
            return db.DiskTypes.ToList();
        }

        public DiskType getGameType()
        {
            DiskType y = (from x in db.DiskTypes
                              where x.diskTypeId == "GAMES"
                              select x).FirstOrDefault();

            if (y != null) {  
                return y;
            }
            return null; 
        }

        public DiskType getMovieType()
        {
            DiskType y = (from x in db.DiskTypes
                           where x.diskTypeId == "MOVIES"
                           select x).FirstOrDefault();

            if (y != null)
            {
                return y;
            }
            return null;
        }

        public void addDiskType(DiskType e)
        {
            db.DiskTypes.Add(e);
            db.SaveChanges();
        }

        public void deleteDiskType(DiskType e)
        {
            db.DiskTypes.Remove(e);
            db.SaveChanges();
        }

        public DiskType findDiskType(string id)
        {
            DiskType DiskType = db.DiskTypes.Find(id);
            return DiskType;
        }

        public void editDiskType(DiskType x)
        {
            DiskType y = findDiskType(x.diskTypeId);
            y.rentalCharge = x.rentalCharge;
            y.lateFee = x.lateFee;
            y.rentalPeriod = x.rentalPeriod;

            db.Entry(y).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
