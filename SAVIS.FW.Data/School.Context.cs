﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SchoolEntities : DbContext
    {
        public SchoolEntities()
            : base("name=SchoolEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<scf_Class> scf_Class { get; set; }
        public virtual DbSet<scf_Class_Role> scf_Class_Role { get; set; }
        public virtual DbSet<scf_Student> scf_Student { get; set; }
        public virtual DbSet<scf_Student_History> scf_Student_History { get; set; }
        public virtual DbSet<scf_Teacher> scf_Teacher { get; set; }
        public virtual DbSet<scf_Teacher_History> scf_Teacher_History { get; set; }
        public virtual DbSet<scf_Users> scf_Users { get; set; }
        public virtual DbSet<scf_Users_Role> scf_Users_Role { get; set; }
    }
}
