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
    public class RentalBillDAL
    {
        DiskContext db;

        public RentalBillDAL()
        {
            db = new DiskContext();
        }

        public List<RentalBill> getRentalBill()
        {
            return db.RentalBills.ToList();
        }

        public IEnumerable getRentalBillDetail()
        {
            var list = (from c in db.RentalBills
                              where c.Disk.status == "Cho thuê" && c.hireDate == c.payDate
                              select new
                              {
                                  ID = c.Disk.diskId,
                                  DiskName = c.Disk.DiskTitle.diskTitleName,
                                  Status = c.Disk.status,
                                  CustomerName = c.Customer.customerName,
                                  HireDate = c.hireDate,
                                  PaymentTerm = c.paymentTerm,
                                  IDBill = c.rentalBillId,
                                  Charge = c.Disk.DiskTitle.DiskType.lateFee
                              }).ToList();

            return list;
        }

        //Load đĩa đang cho thuê theo mã khách hàng
        public IList getRentalBillDetailByID(Guid cusID)
        {
            var list = (from c in db.RentalBills
                        where c.Disk.status == "Cho thuê" && c.hireDate == c.payDate && c.customerID == cusID
                        select new
                        {
                            ID = c.Disk.diskId,
                            DiskName = c.Disk.DiskTitle.diskTitleName,
                            HireDate = c.hireDate,
                            PaymentTerm = c.paymentTerm,
                        }).ToList();

            return list;
        }

        //Load đĩa đang cho thuê quá hạn theo mã khách hàng
        public IList getOverdueRentalBillByID(Guid cusID)
        {
            var list = (from c in db.RentalBills
                        where c.Disk.status == "Cho thuê" && c.hireDate == c.payDate && c.customerID == cusID && c.paymentTerm < DateTime.Now
                        select new
                        {
                            ID = c.Disk.diskId,
                            DiskName = c.Disk.DiskTitle.diskTitleName,
                            HireDate = c.hireDate,
                            PaymentTerm = c.paymentTerm,
                        }).ToList();

            return list;
        }

        public void addRentalBill(RentalBill e)
        {
            db.RentalBills.Add(e);
            db.SaveChanges();
        }

        public void deleteRentalBill(RentalBill e)
        {
            db.RentalBills.Remove(e);
            db.SaveChanges();
        }

        public RentalBill findRentalBill(Guid id)
        {
            RentalBill c = db.RentalBills.Find(id);
            return c;
        }

        public void editRentalBill(RentalBill c)
        {
            db.Entry(c).State = EntityState.Modified;
            db.SaveChanges();
        }

        //Set ngày trả đĩa
        public void setPayDate(Guid id)
        {
            RentalBill x = findRentalBill(id);

            x.payDate = DateTime.Now;

            db.Entry(x).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
