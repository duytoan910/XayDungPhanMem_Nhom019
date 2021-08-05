using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiskManagerment.Controllers
{
    public class QuanLyThueDiaController : BaseController
    {
        // GET: QuanLyThueDia
        public ActionResult Index()
        {
            return LapPhieuThue();
        }
        public ActionResult LapPhieuThue()
        {
            return LoginCheckView();
        }
        public ActionResult TraDia()
        {
            return LoginCheckView();
        }
        public ActionResult DatDia()
        {
            return LoginCheckView();
        }
    }
}