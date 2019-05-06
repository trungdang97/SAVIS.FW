define(['jquery', 'app', 'angular-sanitize',
    'components/factory/factory',
    'components/service/apiservice',
    'components/service/amdservice',
    'views/School/class/class-item',
    'components/formly-template/formly-factory',
], function (jQuery, app) {
    app.controller('ClassDetailCtrl', ['$scope', '$sce', '$timeout', '$location', '$log', '$http', '$uibModal', 'constantsFactory',
        'constantsAMD', '$routeParams', 'Notifications', 'ClassService', 'StudentService', 'FormlyFactory',
        function ($scope, $sce, $timeout, $location, $log, $http, $uibModal, constantsFactory,
            constantsAMD, $routeParams, Notifications, ClassService, StudentService, FormlyFactory) {
            /* Notification -----------------------------------------------------*/
            $scope.Notifications = Notifications;
            $scope.closeAlert = function (item) {
                Notifications.pop(item);
            };
            $scope.success = function (message) {
                constantsAMD.setNotification(Notifications, 'info-default', 'Thông báo', message);
            };
            $scope.error = function (message) {
                constantsAMD.setNotification(Notifications, 'danger', 'Thông báo', message);
            };
            /*------------------------------------------------------------------**/

            //params
            /* Header grid datatable */
            $scope.Headers = [
                { Key: '#', Value: "Mã sinh viên", Width: 'auto', Align: 'text-center' },
                { Key: '#', Value: "Họ tên", Width: 'auto', Align: 'text-center' },
                { Key: '#', Value: "Ngày sinh", Width: 'auto', Align: 'text-center' },
            ];

            var classCode = $routeParams.ClassCode;

            var loadData = function () {
                var promise = ClassService.GetByCode(classCode);
                promise.success(function (response) {
                    //$log.debug(response);
                    $scope.Class = response.Data;
                });

                promise = StudentService.GetUnassignedStudents();
                promise.success(function (response) {
                    $log.debug(response);
                    $scope.UnassignedStudents = response.Data;
                });
            };
            loadData();

            $scope.InList = [];
            $scope.OutList = [];
            $scope.SelectAllIn = false;
            $scope.SelectAllOut = false;

            $scope.SelectInItem = function (item) {
                if (!item.Selecting) {
                    var index = $scope.InList.indexOf(item);
                    if (index >= 0) {
                        $scope.InList.splice(index, 1);
                    }
                } else {
                    $scope.InList.push(item);
                }
                if ($scope.InList.length === $scope.UnassignedStudents.length) {
                    $scope.SelectAllIn = true;
                } else {
                    $scope.SelectAllIn = false;
                }
            }

            $scope.SelectAllInItem = function () {
                if ($scope.InList.length === $scope.UnassignedStudents.length) {
                    $scope.InList = [];
                    angular.forEach($scope.UnassignedStudents, function (file) {
                        file.Selecting = false;
                    });
                    $scope.SelectAllIn = false;
                } else {
                    $scope.InList = [];
                    angular.forEach($scope.UnassignedStudents, function (file) {
                        file.Selecting = true;
                        $scope.InList.push(file);
                    });
                    $scope.SelectAllIn = true;
                }
            }

            $scope.SelectOutItem = function (item) {
                if (!item.Selecting) {
                    var index = $scope.OutList.indexOf(item);
                    if (index >= 0) {
                        $scope.OutList.splice(index, 1);
                    }
                } else {
                    $scope.OutList.push(item);
                }
                if ($scope.OutList.length === $scope.Class.Students.length) {
                    $scope.SelectAllOut = true;
                } else {
                    $scope.SelectAllOut = false;
                }
            }

            $scope.SelectAllOutItem = function () {
                if ($scope.OutList.length === $scope.Class.Students.length) {
                    $scope.OutList = [];
                    angular.forEach($scope.Class.Students, function (file) {
                        file.Selecting = false;
                    });
                    $scope.SelectAllOut = false;
                } else {
                    $scope.OutList = [];
                    angular.forEach($scope.Class.Students, function (file) {
                        file.Selecting = true;
                        $scope.OutList.push(file);
                    });
                    $scope.SelectAllOut = true;
                }
            }

            $scope.Reload = function () {
                //danh sach lop

            }

            $scope.MoveIn = function () {
                var ListModels = [];
                angular.forEach($scope.InList, function (value, key) {
                    ListModels.push(value.StudentId);
                    var promise = StudentService.InAndOut(ListModels, $scope.Class.ClassId);
                    promise.success(function (response) {
                        $log.debug(response);
                    });
                    promise = ClassService.GetByCode(classCode);
                    promise.success(function (response) {
                        $log.debug(response);
                        $scope.Class = response.Data;
                    });
                });
                console.log(ListModels);
            }

            $scope.MoveOut = function () {
                var ListModels = [];
                angular.forEach($scope.OutList, function (value, key) {
                    ListModels.push(value.StudentId);

                });
            }
        }
    ]);
});
