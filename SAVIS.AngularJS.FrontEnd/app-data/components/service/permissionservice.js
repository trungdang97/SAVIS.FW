
define(['app', 'components/factory/factory'], function (app) {
    'use strict';
    app.service('PermissionApiService', ['$http', 'constantsFactory', function ($http, constantsFactory) {

		var service = {};

		var apiUrl = constantsFactory.ApiUrl;
		var apiRightUrl = "api/system/rights";
		var apiRoleUrl = "api/system/roles";
		var apiUserUrl = "api/system/users";
		//Right contoller
		service.GetAllRights = function () {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRightUrl,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};

		service.EnableRight = function (RIGHT_CODE) {
		    var promise = $http({
		        method: 'PUT',
		        url: apiUrl + apiRightUrl + "/" + RIGHT_CODE + "/enable",
		        headers: {
		            'Content-type': ' application/json'
		        }
		    });
		    return promise;
		};


		service.DisableRight = function (RIGHT_CODE) {
		    var promise = $http({
		        method: 'PUT',
		        url: apiUrl + apiRightUrl + "/" + RIGHT_CODE + "/disable",
		        headers: {
		            'Content-type': ' application/json'
		        }
		    });
		    return promise;
		};
	
		service.UpdateRight = function (rightData) {
		    var promise = $http({
		        method: 'PUT',
		        url: apiUrl + apiRightUrl +"/"+ rightData.RightCode,
		        data : rightData,
		        headers: {
		            'Content-type': ' application/json'
		        }
		    });
		    return promise;
		};
		service.AddRight = function (rightData) {
		    var promise = $http({
		        method: 'POST',
		        url: apiUrl + apiRightUrl + "/" + rightData.RightCode,
		        data: rightData,
		        headers: {
		            'Content-type': ' application/json'
		        }
		    });
		    return promise;
		};

		service.CheckRightCodeName = function (RightCode) {
		    var promise = $http({
		        method: 'GET',
		        url: apiUrl + apiRightUrl + "/checkname/" + RightCode,
		        headers: {
		            'Content-type': ' application/json'
		        }
		    });
		    return promise;
		};

		service.GetQueryRight = function (pageNumber, pageSize, textSearch) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRightUrl + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&textSearch=" + textSearch,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.GetRightByCode = function (rightCode) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRightUrl + "/" + rightCode,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.GetRightsOfRole = function (roleId) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRightUrl + "?roleId=" + roleId,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.GetRightsOfUser = function (userId,applicationId) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRightUrl + "?userId=" + userId+"&applicationId="+applicationId,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};

		service.CheckRightOfUserById = function (userId, rightCode) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRightUrl + "/check?userId=" + userId + "&rightCode=" + rightCode,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};

		service.CheckRightOfUserInApplication = function (rightCode, userId, applicationId) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRightUrl + "/check?userId=" + userId + "&rightCode=" + rightCode + "&applicationId=" + applicationId,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};

		service.CheckRightOfRole = function (roleId, rightCode) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRightUrl + "/check?roleId=" + roleId + "&rightCode=" + rightCode,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.GetAllowedApplicationByRightAndUser = function (userId, rightCode) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRightUrl + "/site?userId=" + userId + "&rightCode=" + rightCode,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.GetAllowedApplicationByUser = function (userId) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRightUrl + "/site?userId=" + userId,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.ChangeAllowedApplication = function (userId, rightCode, listApplications) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRightUrl + "/site?userId=" + userId + "&rightCode=" + rightCode + "&applicationId=" + applicationId,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		///Role controler
		service.GetRoleByCode = function (roleId) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRoleUrl + "/" + roleId,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.GetAllRole = function () {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRoleUrl,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.GetQueryRole = function (pageNumber, pageSize, textSearch) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRoleUrl + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&textSearch=" + textSearch,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.UpdateRole = function (roleId, roleModel) {
			var putData = {};
			putData = roleModel;


			var promise = $http({
				method: 'PUT',
				url: apiUrl + apiRoleUrl + "/" + roleId,
				headers: {
					'Content-type': ' application/json'
				},
				data: putData,
			});
			return promise;
		};

		service.AddRole = function (roleId, roleModel) {
			var postData = {};
			postData = roleModel;


			var promise = $http({
				method: 'POST',
				url: apiUrl + apiRoleUrl + "/" + roleId,
				headers: {
					'Content-type': ' application/json'
				},
				data: putData,
			});
			return promise;
		};

		service.DeleteRole = function (roleId) {

			var promise = $http({
				method: 'DELETE',
				url: apiUrl + apiRoleUrl + "/" + roleId,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.DeleteRoles = function (deletesRoleModel) {
			var deleteData = {};
			deleteData = deletesRoleModel;
			var promise = $http({
				method: 'DELETE',
				url: apiUrl + apiRoleUrl + "/" + roleId,
				headers: {
					'Content-type': ' application/json'
				},
				data: deleteData
			});
			return promise;
		};
		service.GetUsersOfRole = function (roleId,applicationId) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRoleUrl + "/" + roleId + "/users?applicationId="+applicationId,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.GetRolesByRightCode = function (rightCode) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiRoleUrl + "?rightcode=" + rightCode,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.DeleteRightsOfRole = function (roleId, rightModel) {
			var deleteData = {};
			deleteData = rightModel;
			var promise = $http({
				method: 'DELETE',
				url: apiUrl + apiRoleUrl + "/" + roleId + "rights",
				headers: {
					'Content-type': ' application/json'
				},
				data: deleteData
			});
			return promise;
		};
		service.AddRightsOfRole = function (roleId, rightModel) {
			var postData = {};
			postData = rightModel;
			var promise = $http({
				method: 'POST',
				url: apiUrl + apiRoleUrl + "/" + roleId + "rights",
				headers: {
					'Content-type': ' application/json'
				},
				data: postData
			});
			return promise;
		};

		///User controler
		service.GetUserById = function (userId,applicationId) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiUserUrl+"/"+userId+"?applicationId="+applicationId,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.GetAllUser = function () {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiUserUrl,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.GetQueryUser = function (pageNumber, pageSize, textSearch) {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiUserUrl + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&textSearch=" + textSearch,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.GetQueryUserFilter = function (filterModel) {
			var postData = {};
			postData =filterModel;
			var promise = $http({
				method: 'POST',
				url: apiUrl + apiUserUrl + "/query",
				headers: {
					'Content-type': ' application/json'
				},
				data:postData
				
			});
			return promise;
		};
		
		service.GetActiveUsers = function () {
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiUserUrl+"/active",
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		
		service.EnableRightOfUser = function (userId,rightCode,applicationId) {
			var promise = $http({
				method: 'PUT',
				url: apiUrl + apiUserUrl+"/"+userId+"/rights/enable/"+rightCode+"?applicationId="+applicationId,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.DisableRightOfUser = function (userId, rightCode, applicationId) {
			var promise = $http({
				method: 'PUT',
				url: apiUrl + apiUserUrl + "/" + userId + "/rights/disable/" + rightCode + "?applicationId=" + applicationId,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		
		service.DeleteRightsOfUser = function (userId,rightModel,applicationId) {
		var deleteData = {};
		deleteData = rightModel;
			var promise = $http({
				method: 'DELETE',
				url: apiUrl + apiUserUrl+"/"+userId+"/rights?applicationId="+applicationId,
				headers: {
					'Content-type': ' application/json'
				},
				data:deleteData
			});
			return promise;
		};
		
		service.AddRightsOfUser = function (userId,rightModel,applicationId) {
		var postData = {};
		postData = rightModel;
			var promise = $http({
				method: 'POST',
				url: apiUrl + apiUserUrl+"/"+userId+"/rights?applicationId="+applicationId,
				headers: {
					'Content-type': ' application/json'
				},
				data:postData
			});
			return promise;
		};
		
		service.DeleteRolesOfUser = function (userId,roleModel,applicationId) {
		var deleteData = {};
		deleteData = roleModel;
			var promise = $http({
				method: 'DELETE',
				url: apiUrl + apiUserUrl+"/"+userId+"/roles?applicationId="+applicationId,
				headers: {
					'Content-type': ' application/json'
				},
				data:deleteData
			});
			return promise;
		};
		
		service.AddRolesOfUser = function (userId,roleModel,applicationId) {
		var postData = {};
		postData = roleModel;
			var promise = $http({
				method: 'POST',
				url: apiUrl + apiUserUrl+"/"+userId+"/roles?applicationId="+applicationId,
				headers: {
					'Content-type': ' application/json'
				},
				data:postData
			});
			return promise;
		};
		service.GetRolesOfUser = function (userId,applicationId) {
		
			var promise = $http({
				method: 'GET',
				url: apiUrl + apiUserUrl+"/"+userId+"/roles?applicationId="+applicationId,
				headers: {
					'Content-type': ' application/json'
				}
			});
			return promise;
		};
		service.CheckRoleofUser = function (userId,roleId,applicationId) {
		    var promise = $http({
		        method: 'GET',
		        url: apiUrl + apiUserUrl + "/check?userId=" + userId + "&roleId=" + roleId + "&applicationId=" + applicationId,
		        headers: {
		            'Content-type': ' application/json'
		        }
		    });
		    return promise;
		};
		// Return service
		return service;
    }]);


});

