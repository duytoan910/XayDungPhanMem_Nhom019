using DAL;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class DiskTypeBLL
    {
        DiskTypeDAL diskTypeDAL;

        public DiskTypeBLL()
        {
            diskTypeDAL = new DiskTypeDAL();
        }

        public List<DiskType> getAllDiskType()
        {
            return diskTypeDAL.getAllDiskType();
        }

        public DiskType getGameType()
        {
            return diskTypeDAL.getGameType();
        }

        public DiskType getMovieType()
        {
            return diskTypeDAL.getMovieType();
        }
        public void addDiskType(DiskType e)
        {
            diskTypeDAL.addDiskType(e);
        }
        public void deleteDiskType(DiskType e)
        {
            diskTypeDAL.deleteDiskType(e);
        }
        public DiskType findDiskType(string id)
        {
            return diskTypeDAL.findDiskType(id);
        }
        public void editDiskType(DiskType DiskType)
        {
            diskTypeDAL.editDiskType(DiskType);
        }
    }
}
