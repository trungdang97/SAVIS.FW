create table bbs_Gender(
	GenderId uniqueidentifier default(newid()) primary key,
	Name nvarchar(10) not null
)
go

create table bbs_Donor_Type(
	DonorTypeId uniqueidentifier default(newid()) primary key,
	Name nvarchar(20) not null
)
go

create table bbs_Blood_Type(
	BloodTypeId  uniqueidentifier default(newid()) primary key,
	Name varchar(2) not null
)
go

create table bbs_Rhd_Type(
	RhdTypeId  uniqueidentifier default(newid()) primary key,
	Name varchar(1) not null
)
go

create table bbs_Deferral_Type(
	DeferralTypeId  uniqueidentifier default(newid()) primary key,
	Name varchar(20) not null
)
go

create table bbs_Donor(
	DonorId uniqueidentifier default(newid()) primary key,
	Name nvarchar(50) not null,
	BirthYear int not null,
	PersonalIdentification varchar(20) not null unique,
	GenderId uniqueidentifier not null constraint FK_Dornor_Gender foreign key(GenderId) references bbs_Gender(GenderId),
	BloodTypeId uniqueidentifier constraint FK_Dornor_Blood_Type foreign key(BloodTypeId) references bbs_Blood_Type(BloodTypeId),
	RhdTypeId uniqueidentifier constraint FK_Dornor_Rhd_Type foreign key(RhdTypeId) references bbs_Rhd_Type(RhdTypeId)
)
go

create table bbs_Donor_Deferral_Type_Relationship(
	DonorId uniqueidentifier constraint FK_Dornor_Deferral foreign key(DonorId) references bbs_Donor(DonorId),
	DeferralTypeId uniqueidentifier,
	FromDate date,
	ToDate date,
	Reason nvarchar(200)
)
go

create table bbs_Donor_Sample(
	DornorSampleId uniqueidentifier default(newid()) primary key,
	DonorId uniqueidentifier,
	Finished bit,
	Bacteria bit,
	HIV bit,
	HBV bit,
	HCV bit,
	HTLV bit,
	Syphilis bit,
	WNV bit
)
go

create table bbs_Donor_History(
	DonorId uniqueidentifier,
	DonatedDate date,
	Volume int,
	DonorSampleId uniqueidentifier
)
go