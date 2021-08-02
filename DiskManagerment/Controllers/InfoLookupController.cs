using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiskManagerment.Controllers
{
    public class InfoLookupController : BaseController
    {
        // GET: InfoLookup
        public ActionResult Index()
        {
            return LoginCheckView();
        }
    }
}