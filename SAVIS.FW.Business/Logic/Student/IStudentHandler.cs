using SAVIS.FW.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAVIS.FW.Business.Logic.Student
{
    public interface IStudentHandler
    {
        Response<Student> GetStudentById(Guid studentId);
        Response<IList<Student>> GetFilter(StudentQueryFilter filter);
        Response<Student> CreateStudent(StudentCreateRequestModel student);
        Response<Student> UpdateStudent(StudentUpdateRequestModel student);
        Response<Student> DeleteStudent(Guid studentId);

        //Nghiep vu
        Response<Student> JoinClass(Guid studentId, Guid? classId);
        //Response<Student> LeaveClass(Guid studentId, Guid? ToClassId);
        Response<Student> AssignToRole(Guid studentId, Guid classRoleId);
        int TotalQuantity();
    }
}
