using SAVIS.FW.Business.Config;
using SAVIS.FW.Business.Logic.Login;
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
    public class LoginController : ApiController
    {
        readonly ILoginHandler _classHandler = BusinessServiceLocator.Instance.GetService<ILoginHandler>();

        [HttpPost]
        [Route("api/v1/login/signin")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<LoginResponseModel> Login([FromBody]LoginModel model)
        {
            return _classHandler.Login(model);
        }
    }
}
