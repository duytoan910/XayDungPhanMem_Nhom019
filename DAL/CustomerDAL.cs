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
    public class CustomerDAL
    {
        DiskContext db;

        public CustomerDAL()
        {
            db = new DiskContext();
        }

        public List<Customer> getCustomer()
        {
            return db.Customers.ToList();
        }

        bool CheckOverdue(Guid idCus)
        {
            var list = (from c in db.RentalBills
                        where c.Disk.status == "Cho thuê" && c.hireDate == c.payDate && c.customerID == idCus && c.paymentTerm < DateTime.Now
                        select c).ToList();

            if (list.Count > 0)
                return true;
            return false;
        }
        //Load danh sách khách hàng có đĩa trễ hạn
        public List<Customer> getCustomerByOverdueDisk()
        {
            List<Customer> listCus = new List<Customer>();
            foreach(Customer x in db.Customers.ToList())
            {
                bool result = CheckOverdue(x.customerID);
                if (result == true)
                    listCus.Add(x);
            }          
            return listCus;
        }

        bool CheckLateCharge(Guid idCus)
        {
            //var listCharge = (from c in db.LateCharges
            //                  where c.RentalBill.customerID == idCus
            //                  orderby c.status
            //                  select c).ToList();

            //if (listCharge.Count > 0)
            //    return true;
            return false;
        }
        //Load danh sách khách hàng có phí trễ hạn
        public List<Customer> getCustomerByLateCharge()
        {
            List<Customer> listCus = new List<Customer>();
            foreach (Customer x in db.Customers.ToList())
            {
                bool result = CheckLateCharge(x.customerID);
                if (result == true)
                    listCus.Add(x);
            }
            return listCus;
        }

        public void addCustomer(Customer e)
        {
            e.customerCode = "KH_" + getNextCodeIndex();
            db.Customers.Add(e);
            db.SaveChanges();
        }

        public bool deleteCustomer(Guid id)
        {
            Customer x = findCustomer(id);
            if (x == null)
                return false;

            db.Customers.Remove(x);
            db.SaveChanges();
            return true;
        }

        public Customer findCustomer(Guid id)
        {
            Customer c = db.Customers.Find(id);
            return c;
        }

        public void editCustomer(Customer c)
        {
            Customer x = findCustomer(c.customerID);

            x.customerName = c.customerName;
            x.customerAddress = c.customerAddress;
            x.customerPhone = c.customerPhone;

            db.Entry(x).State = EntityState.Modified;
            db.SaveChanges();
        }
        public int getNextCodeIndex()
        {
            string[] code = { "KH_" };
            var arr = db.Customers.ToList();
            var listIndex = new List<int>();
            for (int i = 0; i < arr.Count(); i++)
            {
                try
                {
                    var str = arr[i].customerCode.Split(code, StringSplitOptions.None);
                    listIndex.Add(int.Parse(str[1]));
                }
                catch (Exception)
                {
                    continue;
                }
            }
            if (listIndex.ToArray().Count() == 0)
                return 1;

            return listIndex.ToArray().Max() + 1;
        }
    }
}
