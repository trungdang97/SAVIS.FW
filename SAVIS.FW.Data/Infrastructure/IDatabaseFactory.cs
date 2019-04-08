using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAVIS.FW.Data.Infrastructure
{
    public interface IDatabaseFactory
    {
        SchoolEntities GetSchoolContext();
    }
}
