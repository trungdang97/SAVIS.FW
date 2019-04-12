using SAVIS.FW.Business.Config;
using SAVIS.FW.Business.Logic.Class;
using SAVIS.FW.Business.Logic.Student;
using SAVIS.FW.Business.Logic.Teacher;
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
    public class SummaryController : ApiController
    {
        readonly IClassHandler _classHandler = BusinessServiceLocator.Instance.GetService<IClassHandler>();
        readonly IStudentHandler _studentHandler = BusinessServiceLocator.Instance.GetService<IStudentHandler>();
        readonly ITeacherHandler _teacherHandler = BusinessServiceLocator.Instance.GetService<ITeacherHandler>();

        #region Total quantities
        [HttpGet]
        [Route("api/v1/summary/class/quantity")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public int TotalClassQuantity()
        {
            //ILogService logService = BusinessServiceLocator.Instance.GetService<ILogService>();
            return _classHandler.TotalQuantity();
        }
        [HttpGet]
        [Route("api/v1/summary/student/quantity")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public int TotalStudentQuantity()
        {
            //ILogService logService = BusinessServiceLocator.Instance.GetService<ILogService>();
            return _studentHandler.TotalQuantity();
        }
        [HttpGet]
        [Route("api/v1/summary/teacher/quantity")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public int TotalTeacherQuantity()
        {
            //ILogService logService = BusinessServiceLocator.Instance.GetService<ILogService>();
            return _teacherHandler.TotalQuantity();
        }
        #endregion
    }
}
