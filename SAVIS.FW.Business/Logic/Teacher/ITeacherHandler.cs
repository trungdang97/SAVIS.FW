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
        Response<TeacherModel> GetById(Guid teacherId);
        //Response<IList<TeacherModel>> GetByText(string searchText);
        Response<IList<TeacherModel>> GetByFilter(TeacherQueryFilterModel filter);
        Response<TeacherModel> Create(TeacherCreateRequestModel teacher);
        Response<TeacherModel> Update(TeacherUpdateRequestModel teacher);
        Response<TeacherModel> Delete(Guid teacherId);

        //
        int TotalQuantity();

        Response<TeacherModel> GetAssignedClasses(Guid teacherId);
    }
}
