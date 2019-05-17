using System;
using System.Collections.Generic;
using SAVIS.FW.Business.Logic.Class;
using System.Web.Http;
using SAVIS.FW.Common;
using SAVIS.FW.Business.Config;
using Newtonsoft.Json;
using System.Web.Http.Cors;
using SAVIS.FW.Business.Logic.Student;

namespace SAVIS.FW.API.Controller
{
    public class ClassController : ApiController
    {
        readonly IClassHandler _classHandler = BusinessServiceLocator.Instance.GetService<IClassHandler>();

        [HttpGet]
        [Route("api/v1/classes/{classId}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<ClassModel> GetClassById(Guid classId)
        {
            return _classHandler.GetById(classId);
        }
        [HttpGet]
        [Route("api/v1/classes/code/{classCode}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<ClassModel> GetClassByCode(string classCode)
        {
            return _classHandler.GetByCode(classCode);
        }

        [HttpGet]
        [Route("api/v1/classes/all")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<IList<ClassModel>> GetClassById()
        {
            return _classHandler.GetAll();
        }

        [HttpGet]
        [Route("api/v1/classes")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<IList<ClassModel>> GetFilter(string filter)
        {
            ClassQueryFilterModel classFilter = JsonConvert.DeserializeObject<ClassQueryFilterModel>(filter);
            return _classHandler.GetByFilter(classFilter);
        }

        [HttpPost]
        [Route("api/v1/classes")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<ClassModel> CreateClass([FromBody]ClassCreateRequestModel Class)
        {
            return _classHandler.Create(Class);
        }

        [HttpPut]
        [Route("api/v1/classes")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<ClassModel> CreateClass([FromBody]ClassUpdateRequestModel Class)
        {
            return _classHandler.Update(Class);
        }

        [HttpDelete]
        [Route("api/v1/classes/{classId}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<ClassModel> DeleteClass(Guid classId)
        {
            return _classHandler.Delete(classId);
        }

        [HttpDelete]
        [Route("api/v1/classes/deletemany")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<IList<ClassModel>> DeleteManyClass([FromBody]List<Guid> model)
        {
            return _classHandler.DeleteMany(model);
            
        }
        ////Nghiep vu yeu cau

        //Them bot giao vien chu nhiem cho lop
        [HttpPost]
        [Route("api/v1/classes/assign")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<ClassModel> AssignToClass(Guid? teacherId, Guid classId)
        {
            return _classHandler.AssignToClass(teacherId, classId);
        }

        [HttpGet]
        [Route("api/v1/classes/{classId}/detail")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<ClassModel> ClassDetail(Guid classId)
        {
            return _classHandler.GetCurrentStudents(classId);
        }

        [HttpGet]
        [Route("api/v1/classes/roles")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<IList<ClassRoleModel>> GetRoles()
        {
            return _classHandler.GetRoles();
        }
    }
}
