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
        public Response<Student> GetById(Guid studentId)
        {
            return _studentHandler.GetStudentById(studentId);
        }
        [HttpGet]
        [Route("api/v1/students")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<IList<Student>> GetFilter(string filter)
        {
            StudentQueryFilter studentFilter = JsonConvert.DeserializeObject<StudentQueryFilter>(filter);

            return _studentHandler.GetFilter(studentFilter);
        }

        [HttpPost]
        [Route("api/v1/students")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Student> Create([FromBody]StudentCreateRequestModel student)
        {
            return _studentHandler.CreateStudent(student);
        }

        [HttpPut]
        [Route("api/v1/students")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Student> Update([FromBody]StudentUpdateRequestModel student)
        {
            if(student.Birthday.Hour == 17)
            {
                //UTC thi phai + 7 ve local
                student.Birthday = student.Birthday.AddHours(7);
            }
            return _studentHandler.UpdateStudent(student);
        }

        [HttpDelete]
        [Route("api/v1/students/{studentId}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Student> Delete(Guid studentId)
        {
            return _studentHandler.DeleteStudent(studentId);
        }

        [HttpDelete]
        [Route("api/v1/students/deletemany")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<IList<Student>> DeleteMany([FromBody]List<Guid> model)
        {
            return _studentHandler.DeleteMany(model);
        }

        [HttpPut]
        [Route("api/v1/students/class")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Student> InAndOut(Guid studentId, Guid? classId)
        {
            return _studentHandler.JoinClass(studentId, classId);
        }
    }
}
