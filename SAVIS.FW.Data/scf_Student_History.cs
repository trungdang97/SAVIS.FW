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
    
    public partial class scf_Student_History
    {
        public System.Guid StudentId { get; set; }
        public System.DateTime StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public System.Guid FromClassId { get; set; }
        public Nullable<System.Guid> ToClassId { get; set; }
    
        public virtual scf_Class scf_Class { get; set; }
        public virtual scf_Class scf_Class1 { get; set; }
        public virtual scf_Student scf_Student { get; set; }
    }
}
