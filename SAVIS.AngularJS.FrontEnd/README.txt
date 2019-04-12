- app-data: phần chính của ứng dụng
	+ config:
		= routeconfig: routing application mà không cần load trang
				(kiểu Single Page Application)
	+ directive: chứa các custom directives (?)
	+ factory: chứa file giống một dạng DatabaseFactory
	+ formly-template:
		= control: chứa các component mang chức năng riêng giống component trong WinForm
		= wrapper: chứa các những component hỗ trợ (lỗi, cảnh báo, bảng...)
		= service: chứa các thao tác với API, session (amdservice, permissionservice??)
	+ template-dialog: chứa các dialog thông báo

- view: chứa các thành phần hợp thành giao diện, sau đó include vào như php

- assets: các tài nguyên cho ứng dụng ???

- assets-frontend: ???

- libs: chứa các thư viện JS và CSS