using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SAVIS.FW.Common;
using SAVIS.FW.Data.Infrastructure;
using SAVIS.FW.Data;
using SAVIS.FW.Business.Config;

namespace SAVIS.FW.Business.Logic.Teacher
{
    class DbTeacherHandler : ITeacherHandler
    {
        ILogService logger = BusinessServiceLocator.Instance.GetService<ILogService>();
        public Response<Teacher> CreateTeacher(TeacherCreateRequestModel teacher)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var model = new scf_Teacher()
                    {
                        TeacherId = Guid.NewGuid(),
                        Code = teacher.Code,
                        Name = teacher.Name,
                        Birthday = teacher.Birthday
                    };
                    unitOfWork.GetRepository<scf_Teacher>().Add(model);
                    unitOfWork.Save();

                    return new Response<Teacher>(ConfigType.SUCCESS, "CREATED", null);
                }
            }
            catch (Exception ex)
            {
                return new Response<Teacher>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<Teacher> DeleteTeacher(Guid teacherId)
        {
            try
            {
                using(var unitOfWork = new UnitOfWork())
                {
                    var model = unitOfWork.GetRepository<scf_Teacher>().GetById(teacherId);
                    if(model == null)
                    {
                        return new Response<Teacher>(ConfigType.ERROR, "Object doesn't exists.", null);
                    }
                    unitOfWork.GetRepository<scf_Teacher>().Delete(model);
                    unitOfWork.Save();

                    return new Response<Teacher>(ConfigType.SUCCESS, "DELETED", ConvertTeacher(model));
                }
            }
            catch(Exception ex)
            {
                return new Response<Teacher>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<Teacher> GetById(Guid teacherId)
        {
            try
            {
                using(var unitOfWork = new UnitOfWork())
                {
                    var model = unitOfWork.GetRepository<scf_Teacher>().GetById(teacherId);
                    if(model == null)
                    {
                        return new Response<Teacher>(ConfigType.ERROR, "Object doesn't exists", null);
                    }
                    return new Response<Teacher>(ConfigType.SUCCESS, "OK", ConvertTeacher(model));
                }
            }
            catch(Exception ex)
            {
                return new Response<Teacher>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<IList<Teacher>> GetFilter(TeacherQueryFilter filter)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    string textSearch = filter.TextSearch;
                    List<scf_Teacher> data = unitOfWork.GetRepository<scf_Teacher>().GetMany(x => (x.Name.Contains(textSearch)) || (x.Code.Contains(textSearch)) || (x.Birthday.ToString("d/M/yyyy").Contains(textSearch))).ToList();
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
                    return new Response<IList<Teacher>>(ConfigType.SUCCESS, "OK", ConvertTeachers(data));
                }
            }
            catch (Exception ex)
            {
                return new Response<IList<Teacher>>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<Teacher> UpdateTeacher(TeacherUpdateRequestModel teacher)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var model = unitOfWork.GetRepository<scf_Teacher>().GetById(teacher.TeacherId);
                    if (model == null)
                    {
                        return new Response<Teacher>(ConfigType.ERROR, "Object doesn't exists.", null);
                    }
                    model.Name = teacher.Name;
                    model.Birthday = teacher.Birthday;

                    unitOfWork.GetRepository<scf_Teacher>().Update(model);
                    unitOfWork.Save();

                    return new Response<Teacher>(ConfigType.SUCCESS, "UPDATED", ConvertTeacher(model));
                }
            }
            catch (Exception ex)
            {
                return new Response<Teacher>(ConfigType.ERROR, ex.Message, null);
            }
        }

        #region CONVERT DATA
        public Teacher ConvertTeacher(scf_Teacher teacher)
        {
            var model = new Teacher()
            {
                TeacherId = teacher.TeacherId,
                Code = teacher.Code,
                Name = teacher.Name,
                Birthday = teacher.Birthday
            };
            return model;
        }

        public List<Teacher> ConvertTeachers(List<scf_Teacher> teachers)
        {
            return teachers.Select(ConvertTeacher).ToList();
        }
        #endregion
    }
}
