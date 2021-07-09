using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServicesProject.Models
{
    public class BaseModel
    {
        public class HeadersModel
        {
            public string languageCode { get; set; }
            public string userLogin { get; set; }
            public string userID { get; set; }
            public string isPortalApp { get; set; }
            public string profileIDApp { get; set; }
            public string userGuidID { get; set; }
            public string profileID { get; set; }
        }
    }
}