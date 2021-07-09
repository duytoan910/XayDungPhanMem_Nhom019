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
    public class DiskTypeController : BaseController
    {
        DiskTypeDAL diskTypeDAL;
        public DiskTypeController()
        {
            diskTypeDAL = new DiskTypeDAL();
        }
        public object getAllDiskType()
        {
            return JsonConvert.SerializeObject(diskTypeDAL.getAllDiskType());
        }
        public object getGameType()
        {
            return JsonConvert.SerializeObject(diskTypeDAL.getGameType());
        }
        public object getMovieType()
        {
            return JsonConvert.SerializeObject(diskTypeDAL.getMovieType());
        }
        public void addDiskType(DiskType e)
        {
            diskTypeDAL.addDiskType(e);
        }
        public void deleteDiskType(DiskType e)
        {
            diskTypeDAL.deleteDiskType(e);
        }
        public object findDiskType(string id)
        {
            return JsonConvert.SerializeObject(diskTypeDAL.findDiskType(id));
        }
        public void editDiskType(DiskType DiskType)
        {
            diskTypeDAL.editDiskType(DiskType);
        }
    }
}