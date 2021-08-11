using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiskManagerment.Controllers
{
    public class LoginController : BaseController
    {
        public ActionResult Index()
        {
            if (UserName != null)
                return RedirectToAction("Index", "QuanLyKhachHang");
            else
                return View();
        }
        public ActionResult LoginCheck(string user,string password)
        {
            var userAdmin = new { id = "admin", password = "123" };
            var userClerk = new { id = "user", password = "123" };
            if(user == userAdmin.id)
            {
                if(password == userAdmin.password)
                {
                    UserName = user;
                    UserPassword = password;
                    IsAdmin = true;
                    Response.StatusCode = 200;
                    return Json("success", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    Response.StatusCode = 200;
                    return Json("Tài khoản hoặc mật khẩu không chính xác!", JsonRequestBehavior.AllowGet);
                }
            }
            else if(user == userClerk.id)
            {
                if (password == userClerk.password)
                {
                    UserName = user;
                    UserPassword = password;
                    IsAdmin = false;
                    Response.StatusCode = 200;
                    return Json("success", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    Response.StatusCode = 200;
                    return Json("Tài khoản hoặc mật khẩu không chính xác!", JsonRequestBehavior.AllowGet);
                }
            }
            Response.StatusCode = 200;
            return Json("Tài khoản hoặc mật khẩu không chính xác!", JsonRequestBehavior.AllowGet);
        }
        public ActionResult Logout()
        {
            UserName = null;
            UserPassword = null;
            IsAdmin = false;
            Response.StatusCode = 200;
            return RedirectToAction("Index", "Login");
        }
    }
}