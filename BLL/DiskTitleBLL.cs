using DAL;
using Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class DiskTitleBLL
    {
        DiskTitleDAL diskTitleBLL;

        public DiskTitleBLL()
        {
            diskTitleBLL = new DiskTitleDAL();
        }

        public IEnumerable getAllDiskTitleForLoad()
        {
            return diskTitleBLL.getAllDiskTitleForLoad();
        }
        public List<DiskTitle> getAllDiskTitle()
        {
            return diskTitleBLL.getAllDiskTitle();
        }
        public bool addDiskTitle(DiskTitle e)
        {
            return diskTitleBLL.addDiskTitle(e);
        }
        public bool deleteDiskTitle(int e)
        {
            return diskTitleBLL.deleteDiskTitle(e);
        }
        public DiskTitle findDiskTitle(int id)
        {
            return diskTitleBLL.findDiskTitle(id);
        }
        public void editDiskTitle(DiskTitle DiskTitle)
        {
            diskTitleBLL.editDiskTitle(DiskTitle);
        }
        public bool checkTitleIfExist(string title)
        {
            return diskTitleBLL.checkTitleIfExist(title);
        }
        public int CountDisk(int titleID)
        {
            return diskTitleBLL.CountDisk(titleID);
        }
        public int CountInstock(int titleID)
        {
            return diskTitleBLL.CountInstock(titleID);
        }

        public int CountRent(int titleID)
        {
            return diskTitleBLL.CountRent(titleID);
        }

        public int CountOnHold(int titleID)
        {
            return diskTitleBLL.CountOnHold(titleID);
        }

        public int CountReservation(int titleID)
        {
            return diskTitleBLL.CountReservation(titleID);
        }
    }
}
