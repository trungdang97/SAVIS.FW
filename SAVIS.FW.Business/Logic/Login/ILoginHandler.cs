using SAVIS.FW.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAVIS.FW.Business.Logic.Login
{
    public interface ILoginHandler
    {
        Response<LoginResponseModel> Login(LoginModel model);
    }
}
