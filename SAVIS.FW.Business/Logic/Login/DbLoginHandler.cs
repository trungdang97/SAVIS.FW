using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SAVIS.FW.Business.Config;
using SAVIS.FW.Common;
using SAVIS.FW.Data;
using SAVIS.FW.Data.Infrastructure;
using Sodium;

namespace SAVIS.FW.Business.Logic.Login
{
    public class DbLoginHandler : ILoginHandler
    {
        public Response<LoginResponseModel> Login(LoginModel model)
        {
            try
            {
                using(var unitOfWork = new UnitOfWork())
                {
                    var credential = unitOfWork.GetRepository<scf_Users>().Get(x => x.Username == model.Username);
                    //libsodium
                    if (PasswordHash.ArgonHashStringVerify(credential.Hash, model.Password))
                    {
                        return new Response<LoginResponseModel>(ConfigType.SUCCESS, "OK", new LoginResponseModel()
                        {
                            UserId = credential.UserId,
                            UserRoleCode = credential.scf_Users_Role.Code,
                            IsActive = credential.IsActive
                        });
                    }
                    else
                    {
                        throw new Exception();
                    }
                    //
                }
            }
            catch(Exception ex)
            {
                return new Response<LoginResponseModel>(ConfigType.ERROR, "Wrong username/password", null);
            }
        }
    }
}
