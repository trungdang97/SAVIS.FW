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
    
    public partial class scf_Class
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public scf_Class()
        {
            this.scf_Student = new HashSet<scf_Student>();
            this.scf_Student_History = new HashSet<scf_Student_History>();
            this.scf_Student_History1 = new HashSet<scf_Student_History>();
            this.scf_Teacher_History = new HashSet<scf_Teacher_History>();
        }
    
        public System.Guid ClassId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int StudentQuantity { get; set; }
        public Nullable<System.Guid> TeacherId { get; set; }
    
        public virtual scf_Teacher scf_Teacher { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<scf_Student> scf_Student { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<scf_Student_History> scf_Student_History { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<scf_Student_History> scf_Student_History1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<scf_Teacher_History> scf_Teacher_History { get; set; }
    }
}
