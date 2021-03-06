﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SAVIS.FW.Common;
using SAVIS.FW.Data.Infrastructure;
using SAVIS.FW.Data;
using SAVIS.FW.Common;
using SAVIS.FW.Business.Config;
using SAVIS.FW.Business.Logic.Teacher;
using SAVIS.FW.Business.Logic.Student;

namespace SAVIS.FW.Business.Logic.Class
{
    class DbClassHandler : IClassHandler
    {
        ILogService logger = BusinessServiceLocator.Instance.GetService<ILogService>();

        #region Nghiệp vụ
        public Response<Class> AssignToClass(Guid? teacherId, Guid classId)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var teacher = unitOfWork.GetRepository<scf_Class>().GetById(classId);
                    var teacherHistory = unitOfWork.GetRepository<scf_Teacher_History>().Get(x => (x.ClassId == classId) && (x.EndDate == null));
                    var _teacherId = teacherHistory.TeacherId;
                    if (teacher == null)
                    {
                        return new Response<Class>(ConfigType.ERROR, "Objects doesn't exists.", null);
                    }
                    else if (teacherHistory != null && teacherId == _teacherId)
                    {
                        return new Response<Class>(ConfigType.ERROR, "Teacher's already in charge of this class.", null);
                    }
                    teacher.TeacherId = (teacherId == Guid.Empty) ? null : teacherId;
                    unitOfWork.GetRepository<scf_Class>().Update(teacher);

                    //log

                    if (teacherHistory != null && teacherId == null)
                    {
                        //không quản lý lớp nữa và không có người tiếp nhận
                        teacherHistory.EndDate = DateTime.Now;
                        unitOfWork.GetRepository<scf_Teacher_History>().Update(teacherHistory);
                    }
                    else if (teacherId != _teacherId)
                    {
                        //có người tiếp nhận / chuyển giao
                        teacherHistory.EndDate = DateTime.Now;
                        unitOfWork.GetRepository<scf_Teacher_History>().Update(teacherHistory);
                        teacherHistory = new scf_Teacher_History()
                        {
                            TeacherHistoryId = Guid.NewGuid(),
                            TeacherId = teacherId.Value,
                            StartDate = DateTime.Today,
                            ClassId = classId
                        };
                        unitOfWork.GetRepository<scf_Teacher_History>().Add(teacherHistory);
                    }
                    else if (teacherHistory == null && teacherId != null)
                    {
                        //tiếp nhận lớp quản lý
                        teacherHistory = new scf_Teacher_History()
                        {
                            TeacherHistoryId = Guid.NewGuid(),
                            TeacherId = teacherId.Value,
                            ClassId = classId,
                            StartDate = DateTime.Today
                        };
                        unitOfWork.GetRepository<scf_Teacher_History>().Add(teacherHistory);
                    }


                    unitOfWork.Save();

                    teacher = unitOfWork.GetRepository<scf_Class>().GetById(classId);
                    Teacher.Teacher Teacher = new Teacher.Teacher();
                    if (teacherId != null)
                    {
                        Teacher = DbTeacherHandler.ConvertTeacher(unitOfWork.GetRepository<scf_Teacher>().GetById(teacherId.Value));
                    }

                    Class response = new Class()
                    {
                        ClassId = teacher.ClassId,
                        Code = teacher.Code,
                        Name = teacher.Name,
                        StudentQuantity = teacher.StudentQuantity,
                        TeacherId = (teacher.TeacherId == null) ? null : teacher.TeacherId,
                        Teacher = (teacher.TeacherId == null) ? null : Teacher
                    };
                    if (response.TeacherId == null)
                    {
                        return new Response<Class>(ConfigType.SUCCESS, "Resigned from class: " + response.Name, response);
                    }

                    return new Response<Class>(ConfigType.SUCCESS, "Assigned to class: " + response.Name, response);
                }
            }
            catch (Exception ex)
            {
                return new Response<Class>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public int TotalQuantity()
        {
            return new UnitOfWork().GetRepository<scf_Class>().Count;
        }

        public Response<Class> CurrentStudents(Guid classId)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var _class = unitOfWork.GetRepository<scf_Class>().GetById(classId);
                    if (_class == null)
                    {
                        return new Response<Class>(ConfigType.ERROR, "Object doesn't exists.", null);
                    }
                    var response = ConvertClass(_class);
                    var students = unitOfWork.GetRepository<scf_Student>().GetMany(x => x.ClassId == classId).Select(DbStudentHandler.ConvertStudent);
                    foreach (var student in students)
                    {
                        if (student.ClassRoleId != Guid.Empty)
                        {
                            var role = unitOfWork.GetRepository<scf_Class_Role>().GetById(student.ClassRoleId);
                            student.Role = new ClassRole()
                            {
                                ClassRoleId = role.ClassRoleId,
                                Name = role.Name
                            };
                        }
                    }
                    response.Students = students.ToList();
                    return new Response<Class>(ConfigType.SUCCESS, "OK. Class has " + response.Students.Count + " students", response)
                    {
                        DataCount = response.Students.Count
                    };
                }
            }
            catch (Exception ex)
            {
                return new Response<Class>(ConfigType.ERROR, ex.Message, null);
            }
        }
        #endregion

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
        public static Class ConvertClass(scf_Class classEntity)
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

        public static List<Class> ConvertClasses(List<scf_Class> classEntities)
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
