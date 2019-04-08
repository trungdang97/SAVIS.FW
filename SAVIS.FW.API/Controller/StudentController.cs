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
    public class StudentController : ApiController
    {
        readonly IStudentHandler _studentHandler = BusinessServiceLocator.Instance.GetService<IStudentHandler>();
        [HttpGet]
        [Route("api/v1/students/{studentId}")]
        public Response<Student> GetById(Guid studentId)
        {
            return _studentHandler.GetStudentById(studentId);
        }
        [HttpGet]
        [Route("api/v1/students/filter")]
        public Response<IList<Student>> GetFilter(string textSearch, int? pageSize, int? pageNumber)
        {
            StudentQueryFilter filter = new StudentQueryFilter()
            {
                TextSearch = (textSearch != null) ? textSearch : "",
                PageSize = (pageSize != null || pageSize.Value <= 0) ? pageSize : 10,
                PageNumber = (pageNumber != null || pageNumber.Value <= 0) ? pageNumber : 1
            };
            return _studentHandler.GetFilter(filter);
        }

        [HttpPost]
        [Route("api/v1/students")]
        public Response<Student> Create([FromBody]StudentCreateRequestModel student)
        {
            return _studentHandler.CreateStudent(student);
        }

        [HttpPut]
        [Route("api/v1/students")]
        public Response<Student> Update([FromBody]StudentUpdateRequestModel student)
        {
            return _studentHandler.UpdateStudent(student);
        }

        [HttpDelete]
        [Route("api/v1/students/{studentId}")]
        public Response<Student> Delete(Guid studentId)
        {
            return _studentHandler.DeleteStudent(studentId);
        }
    }
}
