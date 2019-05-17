using Newtonsoft.Json;
using SAVIS.FW.Business.Config;
using SAVIS.FW.Business.Logic.Teacher;
using SAVIS.FW.Common;
using System;
using System.Collections.Generic;
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
        public Response<TeacherModel> GetById(Guid teacherId)
        {
            return _teacherHandler.GetById(teacherId);
        }

        [HttpGet]
        [Route("api/v1/teachers")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<IList<TeacherModel>> GetFilter(string filter)
        {
            var teacherFilter = JsonConvert.DeserializeObject<TeacherQueryFilterModel>(filter);
            return _teacherHandler.GetByFilter(teacherFilter);
        }

        //[HttpGet]
        //[Route("api/v1/teachers/text")]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        //public Response<IList<TeacherModel>> GetByText(string searchText)
        //{
        //    return _teacherHandler.GetByText(searchText);
        //}

        [HttpPost]
        [Route("api/v1/teachers")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<TeacherModel> CreateTeacher(TeacherCreateRequestModel teacher)
        {
            return _teacherHandler.Create(teacher);
        }

        [HttpPut]
        [Route("api/v1/teachers")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<TeacherModel> UpdateTeacher(TeacherUpdateRequestModel teacher)
        {
            return _teacherHandler.Update(teacher);
        }

        [HttpDelete]
        [Route("api/v1/teachers/{teacherId}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<TeacherModel> DeleteTeacher(Guid teacherId)
        {
            return _teacherHandler.Delete(teacherId);
        }

        //Nghiep vu

        //lay
        [HttpGet]
        [Route("api/v1/teachers/{teacherId}/detail")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<TeacherModel> TeacherDetail(Guid teacherId)
        {
            return _teacherHandler.GetAssignedClasses(teacherId);
        }
    }
}
