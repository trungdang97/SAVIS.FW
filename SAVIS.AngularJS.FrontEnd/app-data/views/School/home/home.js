define(['jquery', 'app',
    'jquery-ui',
    'slimscroll',
    'components/factory/factory',
    'components/service/apiservice',
    'components/service/amdservice',
], function (jQuery, app) {
    app.controller('HomeCtrl', ['$scope', '$sce', '$timeout', '$log', '$http', '$uibModal', 'constantsFactory', 'constantsAMD', '$routeParams', 'HomeService',
        function ($scope, $sce, $timeout, $log, $http, $uibModal, constantsFactory, constantsAMD, $routeParams, HomeService) {
            //declare variable for API
            var api = {
                GetStudentQuantity: constantsFactory.ApiUrl + 'api/v1/summary/student/quantity',
                GetTeacherQuantity: constantsFactory.ApiUrl + 'api/v1/summary/teacher/quantity',
                GetClassQuantity: constantsFactory.ApiUrl + 'api/v1/summary/class/quantity'
            };

            var GetStudentQuantity = function () {
                $http({
                    method: 'GET',
                    url: api.GetStudentQuantity,
                    headers: {
                        'Content-type': ' application/json'
                    }
                }).success(function (data, status, headers, config) {
                    $scope.studentQuantity = data;
                }).error(function (data, status, headers, config) {
                    console.log(status);
                })
            }
            var GetTeacherQuantity = function () {
                $http({
                    method: 'GET',
                    url: api.GetTeacherQuantity,
                    headers: {
                        'Content-type': ' application/json'
                    }
                }).success(function (data, status, headers, config) {
                    $scope.teacherQuantity = data;
                }).error(function (data, status, headers, config) {
                    console.log(status);
                })
            }
            var GetClassQuantity = function () {
                $http({
                    method: 'GET',
                    url: api.GetClassQuantity,
                    headers: {
                        'Content-type': ' application/json'
                    }
                }).success(function (data, status, headers, config) {
                    $scope.classQuantity = data;
                }).error(function (data, status, headers, config) {
                    console.log(status);
                })
            }

            $scope.init = function () {
                GetStudentQuantity();
                GetTeacherQuantity();
                GetClassQuantity();
            };
        }
    ]);
});
