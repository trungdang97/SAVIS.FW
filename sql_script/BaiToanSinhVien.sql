use master
go

create database [SAVIS.FW.School]
go

use [SAVIS.FW.School]
go

create table sfs_Teacher(
	TeacherId uniqueidentifier default(newid()) primary key,
	Code varchar(10) not null,
	Name nvarchar(50) not null
)
go

create table sfs_Class(
	ClassId uniqueidentifier default(newid()) primary key,
	Code varchar(10) not null,
	Name nvarchar(50) not null,
	TeacherId uniqueidentifier
)
go

create table sfs_Student(
	StudentId uniqueidentifier default(newid()) primary key,
	Code varchar(10),
	Name nvarchar(50),
	Birth date,
	ClassId uniqueidentifier
)
go