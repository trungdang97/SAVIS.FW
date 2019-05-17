﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SAVIS.FW.Common;
using SAVIS.FW.Business.Config;
using SAVIS.FW.Data.Infrastructure;
using SAVIS.FW.Data;
using SAVIS.FW.Business.Logic.Class;

namespace SAVIS.FW.Business.Logic.Student
{
    class DbStudentHandler : IStudentHandler
    {
        ILogService logger = BusinessServiceLocator.Instance.GetService<ILogService>();

        #region Nghiep vu
        public Response<IList<StudentModel>> JoinClass(List<Guid> studentId, Guid? classId)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    List<scf_Student> lstStudent = new List<scf_Student>();
                    foreach (var id in studentId)
                    {
                        var student = unitOfWork.GetRepository<scf_Student>().GetById(id);
                        Guid? _classId = student.ClassId;
                        if (classId == _classId)
                        {
                            if (classId == null) //không có lớp sẵn
                            {
                                // Trường hợp không có lớp => không có lớp
                                return new Response<IList<StudentModel>>(ConfigType.ERROR, "Student doesn't belong to any class.", null);
                            }
                            //Trường hợp lớp giống nhau
                            return new Response<IList<StudentModel>>(ConfigType.ERROR, "Student is in the class already.", null);
                        }
                        student.ClassId = classId;
                        if (!classId.HasValue)
                        {
                            student.ClassRoleId = null;
                        }
                        lstStudent.Add(student);
                        
                        unitOfWork.GetRepository<scf_Student>().Update(student);
                    }
                    unitOfWork.Save();

                    var response = ConvertStudents(lstStudent);
                    
                    return new Response<IList<StudentModel>>(ConfigType.SUCCESS, "OK", response);
                }
            }
            catch (Exception ex)
            {
                return new Response<IList<StudentModel>>(ConfigType.ERROR, ex.Message, null);
            }
        }
        //public Response<Student> LeaveClass(Guid studentId, Guid? classId)
        //{
        //    try
        //    {
        //        using (var unitOfWork = new UnitOfWork())
        //        {
        //            var student = unitOfWork.GetRepository<scf_Student>().GetById(studentId);
        //            student.ClassId = (classId == null) ? null : classId;

        //            unitOfWork.GetRepository<scf_Student>().Update(student);
        //            unitOfWork.Save();

        //            var response = ConvertStudent(student);
        //            if(classId != null)
        //                response.Class = DbClassHandler.ConvertClass(unitOfWork.GetRepository<scf_Class>().GetById(classId.Value));

        //            return new Response<Student>(ConfigType.SUCCESS, "Joined class: " + response.Class.Name, response);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return new Response<Student>(ConfigType.ERROR, ex.Message, null);
        //    }
        //}
        public Response<StudentModel> AssignToRole(Guid studentId, Guid classRoleId)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var model = unitOfWork.GetRepository<scf_Student>().GetById(studentId);
                    if (model.ClassId == null)
                    {
                        return new Response<StudentModel>(ConfigType.ERROR, "Student isn't in a specific class.", null);
                    }
                    model.ClassRoleId = classRoleId;
                    unitOfWork.GetRepository<scf_Student>().Update(model);
                    unitOfWork.Save();

                    var role = unitOfWork.GetRepository<scf_Class_Role>().GetById(classRoleId);
                    return new Response<StudentModel>(ConfigType.SUCCESS, "Assigned to class role: " + role.Name, ConvertStudent(model));
                }
            }
            catch (Exception ex)
            {
                return new Response<StudentModel>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public int TotalQuantity()
        {
            return new UnitOfWork().GetRepository<scf_Student>().Count;
        }
        #endregion

        #region R
        public Response<IList<StudentModel>> GetByFilter(StudentQueryFilterModel filter)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    string textSearch = filter.TextSearch;
                    List<scf_Student> data = unitOfWork.GetRepository<scf_Student>().GetMany(x => (x.Name.Contains(textSearch)) || (x.Code.Contains(textSearch))).ToList();// || (x.Birthday.ToString("d/M/yyyy").Contains(textSearch))).ToList();
                    
                    int count = data.Count;

                    if (filter.PageSize.HasValue && filter.PageNumber.HasValue)
                    {
                        if (filter.PageSize.Value <= 0)
                            filter.PageSize = 10;
                        int excludedRows = (filter.PageNumber.Value - 1) * filter.PageSize.Value;
                        if (excludedRows <= 0)
                            excludedRows = 0;
                        data = data.Skip(excludedRows).Take(filter.PageSize.Value).ToList();
                    }
                    foreach(var s in data)
                    {
                        if(s.ClassId != null)
                        {
                            s.scf_Class = unitOfWork.GetRepository<scf_Class>().Get(y => y.ClassId == s.ClassId);
                        }
                        if(s.ClassRoleId != null)
                        {
                            s.scf_Class_Role = unitOfWork.GetRepository<scf_Class_Role>().Get(y => y.ClassRoleId == s.ClassRoleId);
                        }
                    }
                    
                    

                    return new Response<IList<StudentModel>>(ConfigType.SUCCESS, "OK", ConvertStudents(data))
                    {
                        TotalCount = count,
                        DataCount = data.Count
                    };
                }
            }
            catch (Exception ex)
            {
                return new Response<IList<StudentModel>>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<StudentModel> GetById(Guid studentId)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var student = unitOfWork.GetRepository<scf_Student>().GetById(studentId);
                    if (student == null)
                    {
                        return new Response<StudentModel>(ConfigType.ERROR, "Object doesn't exists", null);
                    }
                    return new Response<StudentModel>(ConfigType.SUCCESS, "OK", ConvertStudent(student));
                }
            }
            catch (Exception ex)
            {
                return new Response<StudentModel>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<IList<StudentModel>> GetUnassignedStudents()
        {
            try
            {
                using(var unitOfWork = new UnitOfWork())
                {
                    var students = ConvertStudents(unitOfWork.GetRepository<scf_Student>().GetMany(x => x.ClassId == null && x.IsActive == true).ToList());
                    return new Response<IList<StudentModel>>(ConfigType.SUCCESS, "OK", students) {
                        TotalCount = students.Count
                    };
                }
            }
            catch(Exception ex)
            {
                return new Response<IList<StudentModel>>(ConfigType.ERROR, ex.Message, null);
            }
        }
        #endregion

        #region CUD
        public Response<StudentModel> Create(StudentCreateRequestModel student)
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
                        ClassRoleId = null,
                        ClassId = null,
                        IsActive = true
                    };
                    if (student.ClassRoleId != Guid.Empty)
                    {
                        model.ClassRoleId = student.ClassRoleId;
                    }
                    if (student.ClassId != Guid.Empty)
                    {
                        model.ClassId = student.ClassId;
                    }

                    unitOfWork.GetRepository<scf_Student>().Add(model);
                    unitOfWork.Save();

                    return new Response<StudentModel>(ConfigType.SUCCESS, "CREATED", ConvertStudent(model));
                }
            }
            catch (Exception ex)
            {
                return new Response<StudentModel>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<StudentModel> Delete(Guid studentId)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var model = unitOfWork.GetRepository<scf_Student>().GetById(studentId);
                    if (model == null)
                    {
                        return new Response<StudentModel>(ConfigType.ERROR, "Object doesn't exists.", null);
                    }
                    unitOfWork.GetRepository<scf_Student>().Delete(model);
                    unitOfWork.Save();

                    return new Response<StudentModel>(ConfigType.SUCCESS, "DELETED", ConvertStudent(model));
                }
            }
            catch (Exception ex)
            {
                return new Response<StudentModel>(ConfigType.ERROR, ex.Message, null);
            }
        }
        public Response<IList<StudentModel>> DeleteMany(List<Guid> deletedItems)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    List<scf_Student> lstStudent = new List<scf_Student>();
                    foreach(Guid guid in deletedItems)
                    {
                        var model = unitOfWork.GetRepository<scf_Student>().GetById(guid);
                        if(model != null)
                        {
                            lstStudent.Add(model);
                            unitOfWork.GetRepository<scf_Student>().Delete(model);
                        }
                    }
                    unitOfWork.Save();
                    return new Response<IList<StudentModel>>(ConfigType.SUCCESS, "DELETED", ConvertStudents(lstStudent));
                }
            }
            catch (Exception ex)
            {
                return new Response<IList<StudentModel>>(ConfigType.ERROR, ex.Message, null);
            }
        }

        public Response<StudentModel> Update(StudentUpdateRequestModel student)
        {
            try
            {
                using (var unitOfWork = new UnitOfWork())
                {
                    var model = unitOfWork.GetRepository<scf_Student>().GetById(student.StudentId);
                    if (model == null)
                    {
                        return new Response<StudentModel>(ConfigType.ERROR, "Object doesn't exists.", null);
                    }
                    model.Name = student.Name;
                    model.Birthday = student.Birthday;
                    model.ClassId = (student.ClassId != Guid.Empty) ? student.ClassId : null;
                    model.ClassRoleId = (student.ClassRoleId != Guid.Empty) ? student.ClassRoleId : null;

                    unitOfWork.GetRepository<scf_Student>().Update(model);
                    unitOfWork.Save();

                    return new Response<StudentModel>(ConfigType.SUCCESS, "UPDATED", ConvertStudent(model));
                }
            }
            catch (Exception ex)
            {
                return new Response<StudentModel>(ConfigType.ERROR, ex.Message, null);
            }
        }
        #endregion

        #region CONVERT DATA
        public static StudentModel ConvertStudent(scf_Student student)
        {
            var model = new StudentModel()
            {
                StudentId = student.StudentId,
                Code = student.Code,
                Name = student.Name,
                Birthday = student.Birthday,
            };
            if (student.ClassId.HasValue)
            {
                model.Class = DbClassHandler.ConvertClass(student.scf_Class);
            }
            if (student.ClassRoleId.HasValue)
            {
                model.ClassRoleId = student.ClassRoleId.Value;
                model.Role = new ClassRoleModel(student.scf_Class_Role);
            }

            return model;
        }

        public static List<StudentModel> ConvertStudents(List<scf_Student> students)
        {
            return students.Select(ConvertStudent).ToList();
        }
        #endregion
    }
}
