using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SAVIS.FW.Business.Logic.Class;

namespace SAVIS.FW.Business.Logic.Student
{
    public class Student
    {
        public Guid StudentId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public Guid ClassId { get; set; }
        public Class.Class Class { get; set; }
        public Guid ClassRoleId { get; set; }
        public ClassRole Role { get; set; }
    }

    public class StudentQueryFilter
    {
        public string TextSearch { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }
        public StudentQueryFilter()
        {
            PageSize = 10;
            PageNumber = 1;
        }
    }

    public class StudentCreateRequestModel
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public Guid ClassId { get; set; }
        public Guid ClassRoleId { get; set; }
    }

    public class StudentUpdateRequestModel
    {
        public Guid StudentId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public Guid? ClassId { get; set; }
        public Guid? ClassRoleId { get; set; }
    }

    public class StudentDeleteResponseModel
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public Guid ClassId { get; set; }
        public Guid ClassRoleId { get; set; }
        public string Message { get; set; }
    }

    public class ClassRole
    {
        public Guid ClassRoleId { get; set; }
        public string Name { get; set; }
    }
}
