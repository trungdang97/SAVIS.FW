using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SAVIS.FW.Common;
using SAVIS.FW.Data.Infrastructure;
using SAVIS.FW.Data;
using SAVIS.FW.Common;
using SAVIS.FW.Business.Config;

namespace SAVIS.FW.Business.Logic.Class
{
    class DbClassHandler : IClassHandler
    {
        ILogService logger = BusinessServiceLocator.Instance.GetService<ILogService>();
        #region GET
        public Response<Class> GetClassById(Guid id)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var Class = unitOfWork.GetRepository<scf_Class>().GetById(id);
                    return new Response<Class>(ConfigType.SUCCESS, "OK", ConvertClass(Class));
                }
            }
            catch (Exception ex)
            {
                return new Response<Class>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<IList<Class>> GetFilter(ClassQueryFilter filter)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    string textSearch = filter.TextSearch;
                    List<scf_Class> data = unitOfWork.GetRepository<scf_Class>().GetMany(x => (x.Name.Contains(textSearch)) || (x.Code.Contains(textSearch))).ToList();
                    int count = data.Count;

                    if (filter.PageSize.HasValue && filter.PageNumber.HasValue)
                    {
                        if (filter.PageSize.Value <= 0)
                            filter.PageSize = 10;
                        int excludedRows = (filter.PageNumber.Value - 1) * (filter.PageSize.Value - 1);
                        if (excludedRows <= 0)
                            excludedRows = 0;
                        data = data.Skip(excludedRows).Take(filter.PageSize.Value + 1).ToList();
                    }

                    return new Response<IList<Class>>(ConfigType.SUCCESS, "OK", ConvertClasses(data))
                    {
                        DataCount = count
                    };
                }
            }
            catch (Exception ex)
            {
                return new Response<IList<Class>>(ConfigType.ERROR, ex.Message, null);
            }
        }
        #endregion

        #region CREATE, UPDATE, DELETE
        public Response<Class> CreateClass(ClassCreateRequestModel Class)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    //var db = unitOfWork.DataContext;
                    scf_Class model = new scf_Class()
                    {
                        ClassId = Guid.NewGuid(),
                        Code = Class.Code,
                        Name = Class.Name,
                        StudentQuantity = 0
                    };
                    //unitOfWork.GetRepository<scf_Class>().Add(model);
                    //db.Set<scf_Class>().Add(model);
                    unitOfWork.GetRepository<scf_Class>().Add(model);
                    unitOfWork.Save();

                    return new Response<Class>(ConfigType.SUCCESS, "CREATED", ConvertClass(model));
                }
            }
            catch (Exception ex)
            {
                return new Response<Class>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<Class> UpdateClass(ClassUpdateRequestModel Class)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var db = unitOfWork.DataContext;
                    if (db.Set<scf_Class>().FirstOrDefault(x => x.ClassId == Class.ClassId) == null)
                    {
                        return new Response<Class>(ConfigType.ERROR, "Object doesn't exists.", null);
                    }
                    scf_Class model = new scf_Class()
                    {
                        ClassId = Class.ClassId,
                        Code = Class.Code,
                        Name = Class.Name,
                        StudentQuantity = Class.StudentQuantity
                    };
                    if (Class.TeacherId != Guid.Empty)
                    {
                        model.TeacherId = Class.TeacherId;
                    }
                    unitOfWork.GetRepository<scf_Class>().Update(model);
                    unitOfWork.Save();

                    return new Response<Class>(ConfigType.SUCCESS, "UPDATED", ConvertClass(model));
                }
            }
            catch (Exception ex)
            {
                return new Response<Class>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<Class> DeleteClass(Guid ClassId)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var db = unitOfWork.DataContext;
                    if (db.Set<scf_Class>().FirstOrDefault(x => x.ClassId == ClassId) == null)
                    {
                        return new Response<Class>(ConfigType.ERROR, "Objects doesn't exists.", null);
                    }
                    scf_Class model = unitOfWork.GetRepository<scf_Class>().GetById(ClassId);
                    unitOfWork.GetRepository<scf_Class>().Delete(model);
                    //var deletedModel = new ClassDeleteResponseModel()
                    //{
                    //    ClassId = model.ClassId,
                    //    Code = model.Code,
                    //    Name = model.Name,
                    //    Message = "OK"
                    //};
                    unitOfWork.Save();

                    return new Response<Class>(ConfigType.SUCCESS, "DELETED", ConvertClass(model));
                }
            }
            catch (Exception ex)
            {
                return new Response<Class>(ConfigType.ERROR, ex.Message, null);
            }
        }
        #endregion

        #region CONVERT DATA
        public Class ConvertClass(scf_Class classEntity)
        {
            try
            {
                Class model = new Class();
                model.ClassId = classEntity.ClassId;
                model.Code = classEntity.Code;
                model.Name = classEntity.Name;
                model.StudentQuantity = classEntity.StudentQuantity;
                if (classEntity.TeacherId != null)
                {
                    model.TeacherId = (Guid)classEntity.TeacherId;
                }
                return model;
            }
            catch (Exception ex)
            {
                return new Class();
            }
        }

        public List<Class> ConvertClasses(List<scf_Class> classEntities)
        {
            try
            {
                var models = classEntities.Select(ConvertClass).ToList();
                return models;
            }
            catch (Exception ex)
            {
                return new List<Class>();
            }
        }
        #endregion
    }
}
