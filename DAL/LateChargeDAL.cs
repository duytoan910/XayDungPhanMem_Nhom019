﻿using Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class LateChargeDAL
    {
        DiskContext db;

        public LateChargeDAL()
        {
            db = new DiskContext();
        }

        public List<LateCharge> getLateCharge()
        {
            return db.LateCharges.ToList();
        }

        //Tạo object lưu chi tiết của bảng phí phạt
        public class LateChargeDetail
        {
            public LateChargeDetail()
            {
                id = Guid.NewGuid();
                hireDate = DateTime.MinValue;
                payDate = DateTime.MinValue;
                fee = 0;
                status = false;
            }

            public Guid id { get; set; }
            public string diskRent { get; set; }
            public DateTime hireDate { get; set; }
            public DateTime payDate { get; set; }
            public double fee { get; set; }
            public bool status { get; set; }
            public Guid rentalBillid { get; set; }
        }
        //Lấy danh sách phí phạt với chi tiết phiếu thuê
        public List<LateChargeDetail> getLateChargeByIDCus(Guid id)
        {
            var listCharge = (from c in db.LateCharges
                              where c.RentalBill.customerID == id && c.status == false
                              select new
                              {
                                  ID = c.lateChargeId,
                                  DiskRent = c.RentalBill.Disk.DiskTitle.diskTitleName,
                                  HireDate = c.RentalBill.hireDate,
                                  PayDate = c.RentalBill.payDate,
                                  Fee = c.lateFee,
                                  Status = c.status,
                                  RentalBillid = c.rentalBillId
                            }).ToList();

            //Sử dụng list object vừa tạo 
            List<LateChargeDetail> list = new List<LateChargeDetail>();
            foreach(var x in listCharge)
            {
                LateChargeDetail y = new LateChargeDetail();
                y.id = x.ID;
                y.diskRent = x.DiskRent;
                y.hireDate = x.HireDate;
                y.payDate = (DateTime) x.PayDate;
                y.fee = x.Fee;
                y.status = x.Status;
                y.rentalBillid = x.RentalBillid;

                list.Add(y); //Trả về kiểu object tạo trong clas này
            }
            return list;
        }
        //Lấy toàn bộ phí của khách hàng (thanh toán + chưa thanh toán)
        public List<LateChargeDetail> getAllLateChargeByIDCus(Guid id)
        {
            var listCharge = (from c in db.LateCharges
                              where c.RentalBill.customerID == id
                              orderby c.status
                              select new
                              {
                                  ID = c.lateChargeId,
                                  DiskRent = c.RentalBill.Disk.DiskTitle.diskTitleName,
                                  HireDate = c.RentalBill.paymentTerm,
                                  PayDate = c.RentalBill.payDate,
                                  Fee = c.lateFee,
                                  Status = c.status,
                                  RentalBillid = c.rentalBillId
                              }).ToList();

            //Sử dụng list object vừa tạo 
            List<LateChargeDetail> list = new List<LateChargeDetail>();
            foreach (var x in listCharge)
            {
                LateChargeDetail y = new LateChargeDetail();
                y.id = x.ID;
                y.diskRent = x.DiskRent;
                y.hireDate = x.HireDate;
                y.payDate = (DateTime) x.PayDate;
                y.fee = x.Fee;
                y.status = x.Status;
                y.rentalBillid = x.RentalBillid;

                list.Add(y); //Trả về kiểu object tạo trong clas này
            }
            return list;
        }

        public void addLateCharge(LateCharge e)
        {
            db.LateCharges.Add(e);
            db.SaveChanges();
        }

        public void deleteLateCharge(Guid id)
        {
            LateCharge x = findLateCharge(id);

            if (x != null)
            {
                db.LateCharges.Remove(x);
                db.SaveChanges();
            }
        }

        public LateCharge findLateCharge(Guid id)
        {
            LateCharge c = db.LateCharges.Find(id);
            return c;
        }

        public void editLateCharge(LateCharge c)
        {
            db.Entry(c).State = EntityState.Modified;
            db.SaveChanges();
        }

        //Chuyển đổi trạng thái cho phí trễ hạn
        public void setStatus(Guid id, bool status)
        {
            LateCharge x = findLateCharge(id);

            x.status = status;

            db.Entry(x).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
