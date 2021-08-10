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
                              where c.Disk.status == "Cho thuê" && c.IsReturn == false
                        select new
                              {
                                  ID = c.Disk.diskId,
                                  DiskCode = c.Disk.diskCode,
                                  DiskName = c.Disk.DiskTitle.diskTitleName,
                                  Status = c.Disk.status,
                                  CustomerName = c.Customer.customerName,
                                  HireDate = c.hireDate,
                                  PaymentTerm = c.paymentTerm,
                                  IDBill = c.rentalBillId,
                                  Fee = c.Disk.DiskTitle.DiskType.lateFee
                              }).ToList();

            return list;
        }

        //Load đĩa đang cho thuê theo mã khách hàng
        public IList getRentalBillDetailByID(Guid cusID)
        {
            var list = (from c in db.RentalBills
                        where c.Disk.status == "Cho thuê" && c.IsReturn == false && c.customerID == cusID
                        select new
                        {
                            ID = c.Disk.diskCode,
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

        //Lấy danh sách phí phạt với chi tiết phiếu thuê
        public IList getLateChargeByIDCus(Guid id)
        {
            var listCharge = (from c in db.RentalBills
                              where c.customerID == id && c.status == false && c.IsReturn == true && c.payDate > c.paymentTerm
                              select new
                              {
                                  ID = c.rentalBillId,
                                  DiskRent = c.Disk.DiskTitle.diskTitleName,
                                  HireDate = c.paymentTerm,
                                  PayDate = c.payDate,
                                  Fee = c.lateFee,
                                  Status = c.status
                              }).ToList();
            return listCharge;
        }
        //Lấy toàn bộ phí của khách hàng (thanh toán + chưa thanh toán)
        public IList getAllLateChargeByIDCus(Guid id)
        {
            var listCharge = (from c in db.RentalBills
                              where c.customerID == id && c.IsReturn == true && c.payDate > c.paymentTerm
                              orderby c.status
                              select new
                              {
                                  ID = c.rentalBillId,
                                  DiskRent = c.Disk.DiskTitle.diskTitleName,
                                  HireDate = c.paymentTerm,
                                  PayDate = c.payDate,
                                  Fee = c.lateFee,
                                  Status = c.status
                              }).ToList();
            return listCharge;
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
        public void setPayDate(Guid id, int fee)
        {
            RentalBill x = findRentalBill(id);

            x.payDate = DateTime.Now;
            x.IsReturn = true;
            int result = DateTime.Compare(x.paymentTerm, DateTime.Now);
            if (result < 0)
            {
                x.lateFee = fee;
                x.status = false;
            }

            db.Entry(x).State = EntityState.Modified;
            db.SaveChanges();
        }
        //Set thanh toán
        public void setPayStatus(Guid id)
        {
            RentalBill x = findRentalBill(id);

            x.status = true;

            db.Entry(x).State = EntityState.Modified;
            db.SaveChanges();
        }
        public void deleteLateCharge(Guid id)
        {
            RentalBill x = findRentalBill(id);

            if (x != null)
            {
                db.RentalBills.Remove(x);
                db.SaveChanges();
            }
        }
    }
}
