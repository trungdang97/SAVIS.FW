using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SAVIS.FW.Data.Infrastructure
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private DbContext _dataContext;
        private readonly IDbSet<T> _dbset;

        public Repository(DbContext dataContext)
        {
            _dataContext = dataContext;
            _dbset = _dataContext.Set<T>();
        }
        public int Count
        {
            get { return _dbset.Count(); }
        }

        public T Add(T entity)
        {
            return _dbset.Add(entity);
        }

        public void Delete(Expression<Func<T, bool>> predicate)
        {
            IQueryable<T> objects = _dbset.Where(predicate);
            foreach (T obj in objects)
            {
                _dbset.Remove(obj);
            }
        }

        public void Delete(T entity)
        {
            _dbset.Remove(entity);
        }

        public T Get(Expression<Func<T, bool>> predicate)
        {
            return _dbset.Where(predicate).FirstOrDefault();
        }

        public IQueryable<T> GetAll()
        {
            return _dbset.AsQueryable();
        }

        public IQueryable<T> GetAll(Expression<Func<T, string>> orderByProperty, bool isAscendingOrder)
        {
            var resetSet = _dbset.AsQueryable();

            resetSet = isAscendingOrder ? resetSet.OrderBy(orderByProperty) : resetSet.OrderByDescending(orderByProperty);

            //Skip the required rows for the current page and take the next records of pagesize count
            return resetSet;
        }

        public T GetById(string Id)
        {
            return _dbset.Find(Id);
        }

        public T GetById(Guid Id)
        {
            return _dbset.Find(Id);
        }

        public IQueryable<T> GetMany(Expression<Func<T, bool>> predicate)
        {
            return _dbset.Where(predicate);
        }

        public IQueryable<T> GetMany(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, int Count = 0, string includeProperties = "")
        {
            // nếu có lambda thì apply vào
            var query = filter != null ? _dbset.Where(filter) : _dbset;
            if (!string.IsNullOrWhiteSpace(includeProperties))
            {
                // tại sao lại không phải là params string[]
                foreach (var includeProperty in includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }

            //có sắp xếp theo thứ tự nếu có, default là không sắp xếp
            if (orderBy != null)
            {
                query = orderBy(query);
            }
            if (Count > 0)
            {
                query = query.Take(Count);
            }
            return query;
        }

        /// <summary>
        /// Phân trang
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="orderBy"></param>
        /// <param name="pageNum"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public IQueryable<T> GetPageMany(Expression<Func<T, bool>> filter, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy, int pageNum = 0, int pageSize = 20)
        {
            if (pageSize <= 0) pageSize = 20;
            var query = filter != null ? _dbset.Where(filter) : _dbset;

            return query.Skip((pageNum - 1) * pageSize).Take(pageSize);
        }

        public void Update(T entity)
        {
            _dbset.Attach(entity);
            _dataContext.Entry(entity).State = EntityState.Modified;
            // vì sao không SaveChanges() 
            //_dataContext.SaveChanges();
        }
    }
}
