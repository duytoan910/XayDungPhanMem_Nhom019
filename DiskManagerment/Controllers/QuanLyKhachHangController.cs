using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiskManagerment.Controllers
{
    public class QuanLyKhachHangController : BaseController
    {
        // GET: Customer
        public ActionResult Index()
        {
            return LoginCheckView();
        }
    }
}