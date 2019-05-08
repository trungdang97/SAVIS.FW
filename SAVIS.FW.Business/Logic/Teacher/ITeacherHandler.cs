using SAVIS.FW.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAVIS.FW.Business.Logic.Teacher
{
    public interface ITeacherHandler
    {
        Response<Teacher> GetById(Guid teacherId);
        Response<IList<Teacher>> GetByText(string searchText);
        Response<IList<Teacher>> GetFilter(TeacherQueryFilter filter);
        Response<Teacher> CreateTeacher(TeacherCreateRequestModel teacher);
        Response<Teacher> UpdateTeacher(TeacherUpdateRequestModel teacher);
        Response<Teacher> DeleteTeacher(Guid teacherId);

        //
        int TotalQuantity();

        Response<Teacher> CurrentAssignedClasses(Guid teacherId);
    }
}
