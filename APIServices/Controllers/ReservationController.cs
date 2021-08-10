using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ServicesProject.Models;
using DAL;
using Entities;
using Newtonsoft.Json;

namespace ServicesProject.Controllers
{
    public class ReservationController : BaseController
    {
        ReservationDAL ReservationDAL;

        public ReservationController()
        {
            ReservationDAL = new ReservationDAL();
        }

        public object getAllReservation()
        {
            return JsonConvert.SerializeObject(ReservationDAL.getAllReservation());
        }
        public object getAllCustomerReservations(Guid id)
        {
            return JsonConvert.SerializeObject(ReservationDAL.getAllCustomerReservations(id));
        }
        public object setOnHold(string title, Guid? diskID)
        {
            return JsonConvert.SerializeObject(ReservationDAL.setOnHold(title, diskID));
        }
        public object getDiskOnHod(Guid id)
        {
            return JsonConvert.SerializeObject(ReservationDAL.getDiskOnHod(id));
        }
        public void addReservation(Reservation e)
        {
            ReservationDAL.addReservation(e);
        }
        public void deleteReservation(Guid id)
        {
            ReservationDAL.deleteReservation(id);
        }
        public void deleteReservationByDiskID(Guid id)
        {
            ReservationDAL.deleteReservationByDiskID(id);
        }
        public object findReservation(Guid id)
        {
            return JsonConvert.SerializeObject(ReservationDAL.findReservation(id));
        }
        public void editReservation(Reservation ReservationType)
        {
            ReservationDAL.editReservation(ReservationType);
        }
        public object checkExistReservationByCustomer(Guid diskTitleId, Guid customerID)
        {
            return JsonConvert.SerializeObject(ReservationDAL.checkExistReservationByCustomer(diskTitleId, customerID));
        }
    }
}