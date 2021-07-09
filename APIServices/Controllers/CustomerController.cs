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
    public class CustomerController : BaseController
    {
        CustomerDAL cusDAL;
        public CustomerController()
        {
            cusDAL = new CustomerDAL();
        }
        public object getCustomer()
        {
            return JsonConvert.SerializeObject(cusDAL.getCustomer());
        }
        public object getCustomerByOverdueDisk()
        {
            return JsonConvert.SerializeObject(cusDAL.getCustomerByOverdueDisk());
        }
        public object getCustomerByLateCharge()
        {
            return JsonConvert.SerializeObject(cusDAL.getCustomerByLateCharge());
        }
        public void addCustomer(Customer e)
        {
            cusDAL.addCustomer(e);
        }
        public object deleteCustomer(Guid id)
        {
            return JsonConvert.SerializeObject(cusDAL.deleteCustomer(id));
        }
        public object findCustomer(Guid id)
        {
            return JsonConvert.SerializeObject(cusDAL.findCustomer(id));
        }
        public void editCustomer(Customer c)
        {
            cusDAL.editCustomer(c);
        }
    }
}