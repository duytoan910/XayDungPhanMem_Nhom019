using DAL;
using Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.LateChargeDAL;

namespace BLL
{
    public class LateChargeBLL
    {
        LateChargeDAL lcDAL;

        public LateChargeBLL()
        {
            lcDAL = new LateChargeDAL();
        }

        public List<LateCharge> getLateCharge()
        {
            return lcDAL.getLateCharge();
        }
        public List<LateChargeDetail> getLateChargeByIDCus(int id)
        {
            return lcDAL.getLateChargeByIDCus(id);
        }
        public List<LateChargeDetail> getAllLateChargeByIDCus(int id)
        {
            return lcDAL.getAllLateChargeByIDCus(id);
        }
        public void addLateCharge(LateCharge e)
        {
            lcDAL.addLateCharge(e);
        }
        public void deleteLateCharge(int id)
        {
            lcDAL.deleteLateCharge(id);
        }
        public LateCharge findLateCharge(int id)
        {
            return lcDAL.findLateCharge(id);
        }
        public void editLateCharge(LateCharge c)
        {
            lcDAL.editLateCharge(c);
        }
        public void setStatus(int id, bool status)
        {
            lcDAL.setStatus(id, status);
        }
    }
}
