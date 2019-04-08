using SAVIS.FW.Business.Config;
using SAVIS.FW.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SAVIS.FW.API.Controller
{
    public class ValuesController : ApiController
    {
        [HttpGet]
        [Route("api/values")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public string GetValue()
        {
            ILogService logService = BusinessServiceLocator.Instance.GetService<ILogService>();

            // logService.Info("Application Started");

            return "Data successfully returned / API is now running";
        }
    }
}
