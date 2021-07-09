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
    public class ReservationDAL
    {
        DiskContext db;

        public ReservationDAL()
        {
            db = new DiskContext();
        }

        public List<Reservation> getAllReservation()
        {
            return db.Reservations.ToList();
        }

        //Load những khách hàng đã đặt trước theo tựa
        public IEnumerable getAllCustomerReservations(Guid id)
        {
            var list = (from x in db.Reservations
                        where x.diskTitleId == id
                        orderby x.dateOrder
                        select new
                        {
                            CusID = x.customerID,
                            CusName = x.Customer.customerName,
                            DateOrder = x.dateOrder,
                            ReID = x.id,
                            DiskID = x.diskId,
                        }).ToList();
            return list;
        }

        //Set trang thái on hold cho khách hàng đặt trước nếu có
        public bool setOnHold(string title, Guid? diskID)
        {
            Reservation y = (from x in db.Reservations
                        where x.DiskTitle.diskTitleName == title && x.diskId == null
                        orderby x.dateOrder
                        select x).FirstOrDefault();

            if (y != null) //Trường hợp có khách đặt trước
            {
                y.diskId = diskID;
                db.Entry(y).State = EntityState.Modified;
                db.SaveChanges();
                return true;
            }
            return false; //Trường hợp không có  
        }

        //Load những khách hàng đã đặt trước theo tựa
        public IList getDiskOnHod(Guid id)
        {
            var list = (from x in db.Reservations
                        where x.customerID == id && x.diskId != null
                        select new
                        {
                            DiskID = x.diskId,
                            Title = x.DiskTitle.diskTitleName,
                            DiskType = x.DiskTitle.DiskType.diskName,
                            DateAdd = x.Disk.dateAdd,
                            Status = x.Disk.status,
                            Charge = x.DiskTitle.DiskType.rentalCharge,
                            RentalPeriod =x.DiskTitle.DiskType.rentalPeriod
                        }).ToList();
            return list;
        }

        public void addReservation(Reservation e)
        {
            db.Reservations.Add(e);
            db.SaveChanges();
        }

        public void deleteReservation(Guid id)
        {
            Reservation x = findReservation(id);

            if(x!=null)
            {
                db.Reservations.Remove(x);
                db.SaveChanges();
            }
        }

        public void deleteReservationByDiskID(Guid id)
        {
            Reservation y = (from x in db.Reservations
                              where x.diskId == id
                              select x).FirstOrDefault();

            if (y != null)
            {
                db.Reservations.Remove(y);
                db.SaveChanges();
            }
        }

        public Reservation findReservation(Guid id)
        {
            Reservation DiskType = db.Reservations.Find(id);
            return DiskType;
        }

        public void editReservation(Reservation x)
        {
            db.Entry(x).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
