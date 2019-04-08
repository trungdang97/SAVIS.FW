using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static SAVIS.FW.Common.Utils.Utils;

namespace SAVIS.FW.Data.Infrastructure
{
    public class UnitOfWork :IUnitOfWork
    {
        //private readonly IDatabaseFactory _databaseFactory;
        private readonly DatabaseFactory _databaseFactory;
        private DbContext _dataContext;
        private bool disposed;

        public UnitOfWork()
        {
            _databaseFactory = new DatabaseFactory(Context.SCHOOL);
            _dataContext = _databaseFactory.GetDbContext();
        }

        public DbContext DataContext
        {
            get { return _dataContext ?? (_dataContext = _databaseFactory.GetDbContext()); }
        }

        public IRepository<T> GetRepository<T>() where T : class
        {
            return new Repository<T>(_dataContext);
        }

        public int Save()
        {
            if (_dataContext.GetValidationErrors().Any())
            {
                throw (new Exception(_dataContext.GetValidationErrors().ToList()[0].ValidationErrors.ToList()[0].ErrorMessage));
            }
            return DataContext.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _dataContext.Dispose();
                    disposed = true;
                }
                disposed = false;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
