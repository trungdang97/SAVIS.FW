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
        Response<StudentModel> GetById(Guid studentId);
        Response<IList<StudentModel>> GetByFilter(StudentQueryFilterModel filter);
        Response<StudentModel> Create(StudentCreateRequestModel student);
        Response<StudentModel> Update(StudentUpdateRequestModel student);
        Response<StudentModel> Delete(Guid studentId);
        Response<IList<StudentModel>> DeleteMany(List<Guid> deletedItems);
        //Nghiep vu
        Response<IList<StudentModel>> JoinClass(List<Guid> studentId, Guid? classId);
        //Response<Student> LeaveClass(Guid studentId, Guid? ToClassId);
        Response<StudentModel> AssignToRole(Guid studentId, Guid classRoleId);
        Response<IList<StudentModel>> GetUnassignedStudents();
        int TotalQuantity();
    }
}
