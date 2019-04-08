using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SAVIS.FW.Common;
using SAVIS.FW.Business.Config;
using SAVIS.FW.Data.Infrastructure;
using SAVIS.FW.Data;

namespace SAVIS.FW.Business.Logic.Student
{
    class DbStudentHandler : IStudentHandler
    {
        ILogService logger = BusinessServiceLocator.Instance.GetService<ILogService>();

        public Response<Student> CreateStudent(StudentCreateRequestModel student)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    scf_Student model = new scf_Student()
                    {
                        StudentId = Guid.NewGuid(),
                        Code = student.Code,
                        Name = student.Name,
                        Birthday = student.Birthday,
                        ClassId = student.ClassId,
                        ClassRoleId = student.ClassRoleId
                    };
                    unitOfWork.GetRepository<scf_Student>().Add(model);
                    unitOfWork.Save();

                    return new Response<Student>(ConfigType.SUCCESS, "CREATED", null);
                }
            }
            catch (Exception ex)
            {
                return new Response<Student>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<Student> DeleteStudent(Guid studentId)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var model = unitOfWork.GetRepository<scf_Student>().GetById(studentId);
                    if (model == null)
                    {
                        return new Response<Student>(ConfigType.ERROR, "Object doesn't exists.", null);
                    }
                    unitOfWork.GetRepository<scf_Student>().Delete(model);
                    unitOfWork.Save();

                    return new Response<Student>(ConfigType.SUCCESS, "DELETED", ConvertStudent(model));
                }
            }
            catch (Exception ex)
            {
                return new Response<Student>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<IList<Student>> GetFilter(StudentQueryFilter filter)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    string textSearch = filter.TextSearch;
                    List<scf_Student> data = unitOfWork.GetRepository<scf_Student>().GetMany(x => (x.Name.Contains(textSearch)) || (x.Code.Contains(textSearch)) || (x.Birthday.ToString("d/M/yyyy").Contains(textSearch))).ToList();
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
                    return new Response<IList<Student>>(ConfigType.SUCCESS, "OK", ConvertStudents(data));
                }
            }
            catch (Exception ex)
            {
                return new Response<IList<Student>>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<Student> GetStudentById(Guid studentId)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var student = unitOfWork.GetRepository<scf_Student>().GetById(studentId);
                    if (student == null)
                    {
                        return new Response<Student>(ConfigType.ERROR, "Object doesn't exists", null);
                    }
                    return new Response<Student>(ConfigType.SUCCESS, "OK", ConvertStudent(student));
                }
            }
            catch (Exception ex)
            {
                return new Response<Student>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<Student> UpdateStudent(StudentUpdateRequestModel student)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var model = unitOfWork.GetRepository<scf_Student>().GetById(student.ClassId);
                    if (model == null)
                    {
                        return new Response<Student>(ConfigType.ERROR, "Object doesn't exists.", null);
                    }
                    model.Name = student.Name;
                    model.Birthday = student.Birthday;
                    model.ClassId = student.ClassId;
                    model.ClassRoleId = student.ClassRoleId;

                    unitOfWork.GetRepository<scf_Student>().Update(model);
                    unitOfWork.Save();

                    return new Response<Student>(ConfigType.SUCCESS, "UPDATED", ConvertStudent(model));
                }
            }
            catch (Exception ex)
            {
                return new Response<Student>(ConfigType.ERROR, ex.Message, null);
            }
        }

        #region CONVERT DATA
        public Student ConvertStudent(scf_Student student)
        {
            var model = new Student()
            {
                StudentId = student.StudentId,
                Code = student.Code,
                Name = student.Name,
                Birthday = student.Birthday
            };
            if (student.ClassId.HasValue)
            {
                model.ClassId = student.ClassId.Value;
            }

            return model;
        }

        public List<Student> ConvertStudents(List<scf_Student> students)
        {
            return students.Select(ConvertStudent).ToList();
        }
        #endregion
    }
}
