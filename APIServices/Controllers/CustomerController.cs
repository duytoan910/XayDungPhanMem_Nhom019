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
    public class CustomerController : Controller
    {
        CustomerDAL cusDAL;
        public CustomerController()
        {
            cusDAL = new CustomerDAL();
        }
        public JsonResult getCustomer()
        {
            return Json(cusDAL.getCustomer(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult getCustomerByOverdueDisk()
        {
            return Json(cusDAL.getCustomerByOverdueDisk(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult getCustomerByLateCharge()
        {
            return Json(cusDAL.getCustomerByLateCharge(), JsonRequestBehavior.AllowGet);
        }
        public void addCustomer(Customer e)
        {
            cusDAL.addCustomer(e);
        }
        public JsonResult deleteCustomer(Guid id)
        {
            return Json(cusDAL.deleteCustomer(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult findCustomer(Guid id)
        {
            return Json(cusDAL.findCustomer(id), JsonRequestBehavior.AllowGet);
        }
        public void editCustomer(Customer c)
        {
            cusDAL.editCustomer(c);
        }
    }
}