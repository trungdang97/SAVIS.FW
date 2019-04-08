using SAVIS.FW.Business.Config;
using SAVIS.FW.Business.Logic.Student;
using SAVIS.FW.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace SAVIS.FW.API.Controller
{
    class StudentController
    {
        readonly IStudentHandler _studentHandler = BusinessServiceLocator.Instance.GetService<IStudentHandler>();
        [HttpGet]
        [Route("api/v1/students/{studentId}")]
        public Response<Student> GetById(Guid studentId)
        {
            return _studentHandler.GetStudentById(studentId);
        }
    }
}
