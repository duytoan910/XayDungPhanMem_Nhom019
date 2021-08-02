using Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DiskDAL
    {
        DiskContext db;

        public DiskDAL()
        {
            db = new DiskContext();
        }

        public IEnumerable getAllDiskForLoad()
        {
            var list = (from d in db.Disks
                        select new
                        {
                            ID = d.diskId,
                            Title = d.DiskTitle.diskTitleName,
                            Type = d.DiskTitle.DiskType.diskName,
                            Date = d.dateAdd,
                            Status = d.status,
                            Charge = d.DiskTitle.DiskType.rentalCharge,
                            }).ToList();
            return list;
        }
        
        //Load những đĩa đang trên kệ để load cho thuê
        public IEnumerable getAllDiskForLoadOnShelf()
        {
            var list = (from d in db.Disks
                        where d.status == "Trên kệ"
                        orderby d.DiskTitle.diskTitleName
                        select new
                        {
                            ID = d.diskId,
                            Code = d.diskCode,
                            Title = d.DiskTitle.diskTitleName,
                            Type = d.DiskTitle.DiskType.diskName,
                            Date = d.dateAdd,
                            Status = d.status,
                            Charge = d.DiskTitle.DiskType.rentalCharge,
                            RentalPeriod = d.DiskTitle.DiskType.rentalPeriod
                        }).ToList();
            return list;
        }       

        public List<Disk> getAllDisk()
        {
            return db.Disks.ToList();
        }

        public Disk addDisk(Disk e, int quantity)
        {
            var _distCode = "";

            var diskTitle = db.DiskTitles.First(x => x.diskTitleId == e.diskTitleId);
            var diskType = db.DiskTypes.First(x => x.diskTypeId == diskTitle.diskTypeId);

            if (diskType.diskTypeId == "GAME")
                _distCode += "GM_";
            else
                _distCode += "MV_";

            Disk add;
            for(int i=0; i< quantity; i++)
            {
                add = new Disk();
                add.diskCode = _distCode + diskTitle.diskTitleCode + "_" +
                (getNextCodeIndex(
                    new string[]
                    {
                    _distCode + diskTitle.diskTitleCode + "_"
                    }
                ) + i);
                add.diskId = e.diskId;
                add.dateAdd = e.dateAdd;
                add.status = e.status;
                add.diskTitleId = e.diskTitleId;

                db.Disks.Add(add);
            }
            db.SaveChanges();
            return new Disk();
        }

        public bool deleteDisk(Guid id)
        {
            Disk de = db.Disks.Find(id);
            if (de == null)
                return false;

            db.Disks.Remove(de);
            db.SaveChanges();
            return true;
        }

        public Disk findDisk(Guid? id)
        {
            Disk Disk = db.Disks.Find(id);
            return Disk;
        }

        public void editDisk(Disk e)
        {
            var s = db.DiskTitles.Where(x => x.diskTitleName == e.DiskTitle.diskTitleName).FirstOrDefault();

            Disk edit = findDisk(e.diskId);

            edit.dateAdd = e.dateAdd;
            edit.status = e.status;
            edit.diskTitleId = s.diskTitleId;

            db.Entry(edit).State = EntityState.Modified;
            db.SaveChanges();
        }

        //Chuyển đổi trạng thái cho đĩa
        public void setStatus(Guid? id, string status)
        {
            Disk x = findDisk(id);

            x.status = status;

            db.Entry(x).State = EntityState.Modified;
            db.SaveChanges();
        }

        //Check trạng thái hiện tại của đĩa
        public bool checkStatus(Guid id, string status)
        {
            Disk x = findDisk(id);

            if (x.status == status)
                return true;
            return false;
        }

        public int getNextCodeIndex(string[] code)
        {
            string filterCode = code[0];
            var arr = db.Disks.Where(x => x.diskCode.Contains(filterCode)).ToArray();
            var listIndex = new List<int>();
            for(int i=0; i< arr.Count(); i++)
            {
                try
                {
                    var str = arr[i].diskCode.Split(code, StringSplitOptions.None);
                    listIndex.Add(int.Parse(str[1]));
                }
                catch (Exception)
                {
                    continue;
                }
            }
            if (listIndex.ToArray().Count() == 0)
                return 1;

            return listIndex.ToArray().Max() + 1;
        }
    }
}
