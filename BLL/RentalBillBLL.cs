using DAL;
using Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class RentalBillBLL
    {
        RentalBillDAL lcDAL;

        public RentalBillBLL()
        {
            lcDAL = new RentalBillDAL();
        }

        public List<RentalBill> getRentalBill()
        {
            return lcDAL.getRentalBill();
        }
        public IEnumerable getRentalBillDetail()
        {
            return lcDAL.getRentalBillDetail();
        }
        public IList getRentalBillDetailByID(int cusID)
        {
            return lcDAL.getRentalBillDetailByID(cusID);
        }
        public IList getOverdueRentalBillByID(int cusID)
        {
            return lcDAL.getOverdueRentalBillByID(cusID);
        }
        public void addRentalBill(RentalBill e)
        {
            lcDAL.addRentalBill(e);
        }
        public void deleteRentalBill(RentalBill e)
        {
            lcDAL.deleteRentalBill(e);
        }
        public RentalBill findRentalBill(int id)
        {
            return lcDAL.findRentalBill(id);
        }
        public void editRentalBill(RentalBill c)
        {
            lcDAL.editRentalBill(c);
        }
        public void setPayDate(int id)
        {
            lcDAL.setPayDate(id);
        }
    }
}
