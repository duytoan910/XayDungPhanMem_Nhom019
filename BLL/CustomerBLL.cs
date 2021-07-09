using DAL;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class CustomerBLL
    {
        CustomerDAL cusDAL;

        public CustomerBLL()
        {
            cusDAL = new CustomerDAL();
        }

        public List<Customer> getCustomer()
        {
            return cusDAL.getCustomer();
        }
        public List<Customer> getCustomerByOverdueDisk()
        {
            return cusDAL.getCustomerByOverdueDisk();
        }
        public List<Customer> getCustomerByLateCharge()
        {
            return cusDAL.getCustomerByLateCharge();
        }
        public void addCustomer(Customer e)
        {
            cusDAL.addCustomer(e);
        }
        public bool deleteCustomer(int id)
        {
            return cusDAL.deleteCustomer(id);
        }
        public Customer findCustomer(int id)
        {
            return cusDAL.findCustomer(id);
        }
        public void editCustomer(Customer c)
        {
            cusDAL.editCustomer(c);
        }
    }
}
