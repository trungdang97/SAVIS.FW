using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SAVIS.FW.Business.Logic.Class;
using SAVIS.FW.Data;

namespace SAVIS.FW.Business.Logic.Student
{
    public class StudentModel
    {
        public Guid StudentId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public Guid ClassId { get; set; }
        public Class.ClassModel Class { get; set; }
        public Guid ClassRoleId { get; set; }
        public ClassRoleModel Role { get; set; }
    }

    public class StudentQueryFilterModel
    {
        public string TextSearch { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }
        public StudentQueryFilterModel()
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
    }

    public class ClassRoleModel
    {
        public Guid ClassRoleId { get; set; }
        public string Name { get; set; }

        public ClassRoleModel(scf_Class_Role role)
        {
            ClassRoleId = role.ClassRoleId;
            Name = role.Name;
        }
    }
}
