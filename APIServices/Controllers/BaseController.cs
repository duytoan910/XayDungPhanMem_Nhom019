using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static ServicesProject.Infrastructure.Constant;
using static ServicesProject.Models.BaseModel;

namespace ServicesProject.Controllers
{
    public class BaseController : Controller
    {
        private string languageCode = string.Empty;
        private string userLogin = string.Empty;
        private string userID = string.Empty;
        //private Guid? profileID;
        //private bool isPortalApp = true;
        private Guid profileIDApp = Guid.Empty;
        //private Guid? userGuidID;

        public string LanguageCode
        {
            get
            {
                return GetHeaderValue(HeaderObject.LanguageCode);
            }
        }

        public string UserLogin
        {
            get
            {
                return GetHeaderValue(HeaderObject.UserLogin);
            }
        }

        public string UserID
        {
            get
            {
                return GetHeaderValue(HeaderObject.UserID);
            }
        }

        public Guid ProfileIDApp
        {
            get
            {
                if (profileIDApp == Guid.Empty)
                {
                    var _profileID = GetHeaderValue(HeaderObject.ProfileidApp);
                    if (!string.IsNullOrEmpty(_profileID))
                    {
                        Guid.TryParse(_profileID, out profileIDApp);
                    }
                }

                return profileIDApp;
            }
        }

        public string GetHeaderValue(string headerName)
        {
            string result = string.Empty;

            if (!string.IsNullOrEmpty(headerName)
                && Request.Headers != null && Request.Headers.AllKeys != null && Request.Headers.AllKeys.Contains(headerName))
            {
                result = Request.Headers.GetValues(headerName).FirstOrDefault();
            }

            return result;
        }

        public HeadersModel getHeader()
        {
            return new HeadersModel()
            {
                isPortalApp = "true",
                languageCode = LanguageCode,
                profileIDApp = ProfileIDApp.ToString(),
                userID = UserID,
                userLogin = UserLogin,
                profileID = ProfileIDApp.ToString(),
                userGuidID = UserID
            };
        }
    }
}