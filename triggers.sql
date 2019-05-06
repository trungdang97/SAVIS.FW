-- Student Quantity Triggers
drop trigger if exists scf_Student_Incremental_Trigger
go
create trigger scf_Student_Incremental_Trigger on scf_Student
after insert
as
begin
	declare @tbl_Quantity table(StudentQuantity int, ClassId uniqueidentifier)

	insert into @tbl_Quantity (StudentQuantity, ClassId)
	select count(inserted.StudentId), ClassId
	from inserted
	where inserted.ClassId is not null
	group by inserted.ClassId

	update scf_Class
	set StudentQuantity = A.StudentQuantity + B.StudentQuantity
	from scf_Class as A
	inner join @tbl_Quantity as B on B.ClassId = A.ClassId
end
go

drop trigger if exists scf_Student_Decremental_Trigger
go
create trigger scf_Student_Decremental_Trigger on scf_Student
after delete
as
begin
	declare @tbl_Quantity table(StudentQuantity int, ClassId uniqueidentifier)

	insert into @tbl_Quantity (StudentQuantity, ClassId)
	select count(deleted.StudentId), ClassId
	from deleted
	where deleted.ClassId is not null
	group by deleted.ClassId

	update scf_Class
	set StudentQuantity = A.StudentQuantity - B.StudentQuantity
	from scf_Class as A
	inner join @tbl_Quantity as B on B.ClassId = A.ClassId
end
go

drop trigger if exists scf_Student_Update_Trigger
go
create trigger scf_Student_Update_Trigger on scf_Student
after update
as
begin
	declare @tbl_Add table(StudentQuantity int, ClassId uniqueidentifier)
	declare @tbl_Subtract table(StudentQuantity int, ClassId uniqueidentifier)

	insert into @tbl_Add (StudentQuantity, ClassId)
	select count(inserted.StudentId), ClassId
	from inserted
	where inserted.ClassId is not null
	group by inserted.ClassId

	insert into @tbl_Subtract (StudentQuantity, ClassId)
	select count(deleted.StudentId), ClassId
	from deleted
	where deleted.ClassId is not null
	group by deleted.ClassId

	update scf_Class
	set StudentQuantity = A.StudentQuantity + B.StudentQuantity
	from scf_Class as A
	inner join @tbl_Add as B on B.ClassId = A.ClassId

	update scf_Class
	set StudentQuantity = A.StudentQuantity - B.StudentQuantity
	from scf_Class as A
	inner join @tbl_Subtract as B on B.ClassId = A.ClassId
end
go
-------------------------------

--Teacher Log Triggers
drop trigger if exists scf_Class_Insert_Trigger
go
create trigger scf_Class_Insert_Trigger on scf_Class
after insert
as
begin
	--declare @tbl_TeacherHistory as table(TeacherId uniqueidentifier, ClassId uniqueidentifier, StartDate date, EndDate date)
	insert into scf_Teacher_History(TeacherId,ClassId,StartDate)
	select A.TeacherId, A.ClassId, getdate()
	from inserted as A
	where A.TeacherId is not null
end
go

drop trigger if exists scf_Class_Update_Trigger
go
create trigger scf_Class_Update_Trigger on scf_Class
after update
as
begin
	update scf_Teacher_History
	set EndDate = getdate()
	from deleted as A
	inner join scf_Teacher_History as B on B.ClassId = A.ClassId and B.TeacherId = A.TeacherId
	
	insert into scf_Teacher_History(TeacherHistoryId,ClassId,TeacherId,StartDate)
	select newid() ,ClassId, TeacherId, getdate()
	from inserted
	where TeacherId is not null
end
go
