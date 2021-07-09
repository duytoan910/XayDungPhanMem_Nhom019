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
    public class DiskController : BaseController
    {
        DiskDAL DAL;
        public DiskController()
        {
            DAL = new DiskDAL();
        }
        public object getAllDiskForLoad()
        {
            return JsonConvert.SerializeObject(DAL.getAllDiskForLoad());
        }
        public object getAllDiskForLoadOnShelf()
        {
            return JsonConvert.SerializeObject(DAL.getAllDiskForLoadOnShelf());
        }
        public object getAllDisk()
        {
            return JsonConvert.SerializeObject(DAL.getAllDisk());
        }
        public object addDisk(Disk e)
        {
            return JsonConvert.SerializeObject(DAL.addDisk(e));
        }
        public object deleteDisk(Guid e)
        {
            return JsonConvert.SerializeObject(DAL.deleteDisk(e));
        }
        public object findDisk(Guid id)
        {
            return JsonConvert.SerializeObject(DAL.findDisk(id));
        }
        public void editDisk(Disk Disk)
        {
            DAL.editDisk(Disk);
        }
        public void setStatus(Guid? id, string status)
        {
            DAL.setStatus(id, status);
        }
        public object checkStatus(Guid id, string status)
        {
            return JsonConvert.SerializeObject(DAL.checkStatus(id, status));
        }
    }
}