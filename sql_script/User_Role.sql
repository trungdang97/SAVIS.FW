use BloodBankSystem
go
create table bbs_Role(RoleId int identity(1,1) primary key, RoleName nvarchar(50) not null, PermissionId int) 
go
create table bbs_User(UserId uniqueidentifier default newid() primary key, UserName varchar(128) not null, HashString varchar(64) not null, 
	RoleId int not null constraint FK_User_Role foreign key(RoleId) references bbs_Role(RoleId))
go