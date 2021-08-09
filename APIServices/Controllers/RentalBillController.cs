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
    public class RentalBillController : BaseController
    {
        RentalBillDAL lcDAL;

        public RentalBillController()
        {
            lcDAL = new RentalBillDAL();
        }

        public object getRentalBill()
        {
            return JsonConvert.SerializeObject(lcDAL.getRentalBill());
        }
        public object getRentalBillDetail()
        {
            return JsonConvert.SerializeObject(lcDAL.getRentalBillDetail());
        }
        public object getRentalBillDetailByID(Guid cusID)
        {
            return JsonConvert.SerializeObject(lcDAL.getRentalBillDetailByID(cusID));
        }
        public object getOverdueRentalBillByID(Guid cusID)
        {
            return JsonConvert.SerializeObject(lcDAL.getOverdueRentalBillByID(cusID));
        }
        public object getAllLateChargeByIDCus(Guid id)
        {
            return JsonConvert.SerializeObject(lcDAL.getAllLateChargeByIDCus(id));
        }
        public object getLateChargeByIDCus(Guid id)
        {
            return JsonConvert.SerializeObject(lcDAL.getLateChargeByIDCus(id));
        }
        public void addRentalBill(RentalBill e)
        {
            lcDAL.addRentalBill(e);
        }
        public void deleteRentalBill(RentalBill e)
        {
            lcDAL.deleteRentalBill(e);
        }
        public object findRentalBill(Guid id)
        {
            return JsonConvert.SerializeObject(lcDAL.findRentalBill(id));
        }
        public void editRentalBill(RentalBill c)
        {
            lcDAL.editRentalBill(c);
        }
        public void setPayDate(Guid id, int fee)
        {
            lcDAL.setPayDate(id, fee);
        }
        public void setPayStatus(Guid id)
        {
            lcDAL.setPayStatus(id);
        }
    }
}