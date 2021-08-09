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
    public class DiskTitleDAL
    {
        DiskContext db;

        public DiskTitleDAL()
        {
            db = new DiskContext();
        }

        public IEnumerable getAllDiskTitleForLoad()
        {
            var listEmpl = (from m in db.DiskTitles
                            select new
                            {
                                ID = m.diskTitleId,
                                Code = m.diskTitleCode,
                                Name = m.diskTitleName,
                                NameType = m.DiskType.diskName,
                            }).ToList();
            return listEmpl;
        }

        public List<DiskTitle> getAllDiskTitle()
        {
            return db.DiskTitles.ToList();
        }

        public string addDiskTitle(DiskTitle e)
        {
            if(Array.Exists(db.DiskTitles.ToArray<DiskTitle>(), elem => elem.diskTitleCode == e.diskTitleCode))
            {
                return "Mã tựa đĩa đã tồn tại!";
            }
            DiskTitle add = new DiskTitle();
            add.diskTitleId = e.diskTitleId;
            add.diskTitleCode = e.diskTitleCode;
            add.diskTitleName = e.diskTitleName;
            add.diskTypeId = e.diskTypeId;

            db.DiskTitles.Add(add);
            db.SaveChanges();
            return "success";
        }

        public bool deleteDiskTitle(Guid id)
        {
            DiskTitle de = db.DiskTitles.Find(id);
            if (de == null)
                return false;

            db.DiskTitles.Remove(de);
            db.SaveChanges();
            return true;
        }

        public DiskTitle findDiskTitle(Guid id)
        {
            DiskTitle DiskTitle = db.DiskTitles.Find(id);
            return DiskTitle;
        }

        public void editDiskTitle(DiskTitle e)
        {
            DiskTitle edit = findDiskTitle(e.diskTitleId);

            edit.diskTitleName = e.diskTitleName;
            edit.diskTypeId = e.diskTypeId;

            db.Entry(edit).State = EntityState.Modified;
            db.SaveChanges();
        }

        public bool checkTitleIfExist(string title)
        {
            DiskTitle c = db.DiskTitles.Where(x => x.diskTitleName == title).FirstOrDefault();

            if (c != null)
                return true;
            return false;
        }

        //TẠO THỐNG KÊ
        public int CountDisk(Guid titleID) //Số bản sao
        {
            var list = (from m in db.Disks
                        where m.diskTitleId == titleID
                        select m).ToList();
            return list.Count;
        }

        public int CountInstock(Guid titleID) //Đang trên kệ
        {
            var list = (from m in db.Disks
                        where m.status == "Trên kệ" && m.diskTitleId == titleID
                        select m).ToList();
            return list.Count;
        }

        public int CountRent(Guid titleID) //Đang cho thuê
        {
            var list = (from m in db.Disks
                        where m.status == "Cho thuê" && m.diskTitleId == titleID
                        select m).ToList();
            return list.Count;
        }

        public int CountOnHold(Guid titleID) //Đang giữ
        {
            var list = (from m in db.Disks
                        where m.status == "Đang chờ" && m.diskTitleId == titleID
                        select m).ToList();
            return list.Count;
        }

        public int CountReservation(Guid titleID) //Tựa được đặt
        {
            //    var list = (from m in db.Reservations
            //                where m.diskTitleId == titleID 
            //                select m).ToList();
            //    return list.Count;
            return 0;
        }
    }
}
