using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAVIS.FW.Business.Logic.Teacher
{
    public class Teacher
    {
        public Guid TeacherId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public List<TeacherClassHistory> Classes { get; set; }
    }

    public class TeacherCreateRequestModel
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
    }

    public class TeacherUpdateRequestModel
    {
        public Guid TeacherId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
    }

    public class TeacherQueryFilter
    {
        public string TextSearch { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }
        public TeacherQueryFilter()
        {
            PageSize = 10;
            PageNumber = 1;
        }
    }

    public class TeacherClassHistory
    {
        public Class.Class Class { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
