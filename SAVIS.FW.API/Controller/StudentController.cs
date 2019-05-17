using Newtonsoft.Json;
using SAVIS.FW.Business.Config;
using SAVIS.FW.Business.Logic.Student;
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
    public class StudentController : ApiController
    {
        readonly IStudentHandler _studentHandler = BusinessServiceLocator.Instance.GetService<IStudentHandler>();
        [HttpGet]
        [Route("api/v1/students/{studentId}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<StudentModel> GetById(Guid studentId)
        {
            return _studentHandler.GetById(studentId);
        }
        [HttpGet]
        [Route("api/v1/students")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<IList<StudentModel>> GetFilter(string filter)
        {
            StudentQueryFilterModel studentFilter = JsonConvert.DeserializeObject<StudentQueryFilterModel>(filter);

            return _studentHandler.GetByFilter(studentFilter);
        }

        [HttpGet]
        [Route("api/v1/students/unassigned")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<IList<StudentModel>> GetUnassignedStudents()
        {
            return _studentHandler.GetUnassignedStudents();
        }

        [HttpPost]
        [Route("api/v1/students")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<StudentModel> Create([FromBody]StudentCreateRequestModel student)
        {
            return _studentHandler.Create(student);
        }

        [HttpPut]
        [Route("api/v1/students")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<StudentModel> Update([FromBody]StudentUpdateRequestModel student)
        {
            if(student.Birthday.Hour == 17)
            {
                //UTC thi phai + 7 ve local
                student.Birthday = student.Birthday.AddHours(7);
            }
            return _studentHandler.Update(student);
        }

        [HttpDelete]
        [Route("api/v1/students/{studentId}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<StudentModel> Delete(Guid studentId)
        {
            return _studentHandler.Delete(studentId);
        }

        [HttpDelete]
        [Route("api/v1/students/deletemany")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<IList<StudentModel>> DeleteMany([FromBody]List<Guid> model)
        {
            return _studentHandler.DeleteMany(model);
        }

        [HttpPut]
        [Route("api/v1/students/class/{classId}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<IList<StudentModel>> InAndOut([FromBody]List<Guid> studentId, Guid? classId)
        {
            return _studentHandler.JoinClass(studentId, classId);
        }

        [HttpPut]
        [Route("api/v1/students/role")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<StudentModel> AssignToRole([FromBody]RoleRequestModel model)
        {
            return _studentHandler.AssignToRole(model.StudentId, model.ClassRoleId);
        }
        public class RoleRequestModel
        {
            public Guid StudentId { get; set; }
            public Guid ClassRoleId { get; set; }
        }
    }
}
