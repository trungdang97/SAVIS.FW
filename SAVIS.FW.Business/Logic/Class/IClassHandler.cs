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
        Response<Class> GetClassById(Guid id);
        Response<Class> CreateClass(ClassCreateRequestModel Class);
        Response<Class> UpdateClass(ClassUpdateRequestModel Class);
        Response<Class> DeleteClass(Guid ClassId);
        Response<IList<Class>> GetFilter(ClassQueryFilter filter);
    }
}
