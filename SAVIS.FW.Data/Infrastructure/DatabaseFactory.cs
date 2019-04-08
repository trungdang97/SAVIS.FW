using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static SAVIS.FW.Common.Utils.Utils;

namespace SAVIS.FW.Data.Infrastructure
{
    class DatabaseFactory
    {
        //public Context Context {get;set;}
        private DbContext _context;

        public DatabaseFactory(Context Context)
        {
            if(Context == Context.SCHOOL)
            {
                _context = new SchoolEntities();
            }
        }

        public DbContext GetDbContext()
        {
            return _context;
        }
    }
}
