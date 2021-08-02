using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiskManagerment.Controllers
{
    public class BaseController : Controller
    {
        public static string UserName { get; set; }
        public static string UserPassword { get; set; }
        public static bool IsAdmin { get; set; }
        public ActionResult LoginCheckView()
        {
            //if(UserName == null)
            //    return RedirectToAction("Index", "Login");

            if (IsAdmin)
            {
                ViewBag.UserPermission = "(Quản trị)";
            }
            else
            {
                ViewBag.UserPermission = "(Bán hàng)";
            }
            
            return View();
        }
    }
}