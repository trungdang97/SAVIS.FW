using SAVIS.FW.Business.Logic.Student;
using SAVIS.FW.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAVIS.FW.Business.Logic.Class
{
    public interface IClassHandler
    {
        Response<ClassModel> GetById(Guid id);
        Response<ClassModel> GetByCode(string code);
        Response<ClassModel> Create(ClassCreateRequestModel Class);
        Response<ClassModel> Update(ClassUpdateRequestModel Class);
        Response<ClassModel> Delete(Guid ClassId);
        Response<IList<ClassModel>> GetByFilter(ClassQueryFilterModel filter);
        Response<IList<ClassModel>> GetAll();
        Response<IList<ClassModel>> DeleteMany(List<Guid> lstClassId);
        //specific 
        Response<ClassModel> AssignToClass(Guid? teacherId, Guid classId);
        Response<IList<ClassRoleModel>> GetRoles();
        int TotalQuantity();
        Response<ClassModel> GetCurrentStudents(Guid classId);
    }
}
