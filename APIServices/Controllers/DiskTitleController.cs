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
    public class DiskTitleController : BaseController
    {
        DiskTitleDAL diskTitleBLL;
        public DiskTitleController()
        {
            diskTitleBLL = new DiskTitleDAL();
        }
        public object getAllDiskTitleForLoad()
        {
            return JsonConvert.SerializeObject(diskTitleBLL.getAllDiskTitleForLoad());
        }
        public object getAllDiskTitle()
        {
            return JsonConvert.SerializeObject(diskTitleBLL.getAllDiskTitle());
        }
        public object addDiskTitle(DiskTitle e)
        {
            return JsonConvert.SerializeObject(diskTitleBLL.addDiskTitle(e));
        }
        public object deleteDiskTitle(Guid e)
        {
            return JsonConvert.SerializeObject(diskTitleBLL.deleteDiskTitle(e));
        }
        public object findDiskTitle(Guid id)
        {
            return JsonConvert.SerializeObject(diskTitleBLL.findDiskTitle(id));
        }
        public void editDiskTitle(DiskTitle DiskTitle)
        {
            diskTitleBLL.editDiskTitle(DiskTitle);
        }
        public object checkTitleIfExist(string title)
        {
            return JsonConvert.SerializeObject(diskTitleBLL.checkTitleIfExist(title));
        }
        public object CountDisk(Guid titleID)
        {
            return JsonConvert.SerializeObject(diskTitleBLL.CountDisk(titleID));
        }
        public object CountInstock(Guid titleID)
        {
            return JsonConvert.SerializeObject(diskTitleBLL.CountInstock(titleID));
        }
        public object CountRent(Guid titleID)
        {
            return JsonConvert.SerializeObject(diskTitleBLL.CountRent(titleID));
        }
        public object CountOnHold(Guid titleID)
        {
            return JsonConvert.SerializeObject(diskTitleBLL.CountOnHold(titleID));
        }
        public object CountReservation(Guid titleID)
        {
            return JsonConvert.SerializeObject(diskTitleBLL.CountReservation(titleID));
        }
    }
}