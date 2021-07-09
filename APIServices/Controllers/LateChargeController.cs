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
    public class LateChargeController : BaseController
    {
        LateChargeDAL lcDAL;

        public LateChargeController()
        {
            lcDAL = new LateChargeDAL();
        }

        public object getLateCharge()
        {
            return JsonConvert.SerializeObject(lcDAL.getLateCharge());
        }
        public object getLateChargeByIDCus(Guid id)
        {
            return JsonConvert.SerializeObject(lcDAL.getLateChargeByIDCus(id));
        }
        public object getAllLateChargeByIDCus(Guid id)
        {
            return JsonConvert.SerializeObject(lcDAL.getAllLateChargeByIDCus(id));
        }
        public void addLateCharge(LateCharge e)
        {
            lcDAL.addLateCharge(e);
        }
        public void deleteLateCharge(Guid id)
        {
            lcDAL.deleteLateCharge(id);
        }
        public object findLateCharge(Guid id)
        {
            return JsonConvert.SerializeObject(lcDAL.findLateCharge(id));
        }
        public void editLateCharge(LateCharge c)
        {
            lcDAL.editLateCharge(c);
        }
        public void setStatus(Guid id, bool status)
        {
            lcDAL.setStatus(id, status);
        }
    }
}