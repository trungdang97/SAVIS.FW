//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SAVIS.FW.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class scf_Student
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public scf_Student()
        {
            this.scf_Student_History = new HashSet<scf_Student_History>();
        }
    
        public System.Guid StudentId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public System.DateTime Birthday { get; set; }
        public Nullable<System.Guid> ClassRoleId { get; set; }
        public Nullable<System.Guid> ClassId { get; set; }
    
        public virtual scf_Class scf_Class { get; set; }
        public virtual scf_Class_Role scf_Class_Role { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<scf_Student_History> scf_Student_History { get; set; }
    }
}
