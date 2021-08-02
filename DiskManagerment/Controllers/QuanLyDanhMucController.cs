using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiskManagerment.Controllers
{
    public class QuanLyDanhMucController : BaseController
    {
        // GET: QuanLyDanhMuc
        public ActionResult Index()
        {
            return LoginCheckView();
        }
        public ActionResult TuaDia()
        {
            return Index();
        }
        public ActionResult Dia()
        {
            return LoginCheckView();
        }
    }
}