using Newtonsoft.Json;
using SAVIS.FW.Business.Config;
using SAVIS.FW.Business.Logic.Class;
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
    public class TeacherController : ApiController
    {
        readonly ITeacherHandler _teacherHandler = BusinessServiceLocator.Instance.GetService<ITeacherHandler>();

        [HttpGet]
        [Route("api/v1/teachers/{teacherId}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Teacher> GetById(Guid teacherId)
        {
            return _teacherHandler.GetById(teacherId);
        }

        [HttpGet]
        [Route("api/v1/teachers/filter")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<IList<Teacher>> GetFilter(string filter)
        {
            var teacherFilter = JsonConvert.DeserializeObject<TeacherQueryFilter>(filter);
            return _teacherHandler.GetFilter(teacherFilter);
        }

        [HttpPost]
        [Route("api/v1/teachers")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Teacher> CreateTeacher(TeacherCreateRequestModel teacher)
        {
            return _teacherHandler.CreateTeacher(teacher);
        }

        [HttpPut]
        [Route("api/v1/teachers")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Teacher> UpdateTeacher(TeacherUpdateRequestModel teacher)
        {
            return _teacherHandler.UpdateTeacher(teacher);
        }

        [HttpDelete]
        [Route("api/v1/teachers/{teacherId}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Teacher> DeleteTeacher(Guid teacherId)
        {
            return _teacherHandler.DeleteTeacher(teacherId);
        }

        //Nghiep vu

        //lay
        [HttpGet]
        [Route("api/v1/teachers/{teacherId}/detail")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Teacher> TeacherDetail(Guid teacherId)
        {
            return _teacherHandler.CurrentAssignedClasses(teacherId);
        }
    }
}
