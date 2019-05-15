using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAVIS.FW.Business.Logic.Login
{
    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class LoginResponseModel
    {
        public Guid UserId { get; set; }
        public int UserRoleCode { get; set; }
        public bool IsActive { get; set; }
    }
}
