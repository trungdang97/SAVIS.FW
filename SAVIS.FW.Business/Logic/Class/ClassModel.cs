using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAVIS.FW.Business.Logic.Class
{
    public class ClassModel
    {
        public Guid ClassId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int StudentQuantity { get; set; }
        public Guid? TeacherId { get; set; }
        public Teacher.TeacherModel Teacher { get; set; }
        public List<Student.StudentModel> Students { get; set; }
        public ClassModel()
        {
            StudentQuantity = 0;
        }
    }

    public class ClassQueryFilterModel
    {
        public string TextSearch { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }
        //public int? DisplayStatus { get; set; }
        public ClassQueryFilterModel()
        {
            PageSize = 10;
            PageNumber = 1;
        }
    }

    public class ClassCreateRequestModel
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public int StudentQuantity { get; set; }

        public ClassCreateRequestModel()
        {
            StudentQuantity = 0;
        }
    }

    public class ClassUpdateRequestModel
    {
        public Guid ClassId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public Guid TeacherId { get; set; }
    }

    public class ClassDeleteResponseModel
    {
        public Guid ClassId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
    }
}
