using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace SAVIS.FW.Business.Config
{
    public static class ConfigType
    {
        public const int STATUS_OK = 1;
        public const int STATUS_NOT_OK = 0;


        public const int SUCCESS = 1;
        public const int ERROR = -1;
        public const int NODATA = 0;

        public const int SHOW = 1;
        public const int HIDE = 0;

        public const string ACION_CREATE = "CREATE";
        public const string ACION_UPDATE = "UPDATE";

        public static IList<T> CastToList<T>(this IEnumerable source)
        {
            return new List<T>(source.Cast<T>());
        }

        public static void SetHttpResponse(int statusCode,string statusDescription)
        {
            HttpContext.Current.Response.StatusCode = statusCode;
            HttpContext.Current.Response.StatusDescription = statusDescription;
        }

    }

}
