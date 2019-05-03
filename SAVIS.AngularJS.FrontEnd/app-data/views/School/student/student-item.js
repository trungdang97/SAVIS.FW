"use strict";
define(["app",
    'components/service/amdservice',
    'components/service/apiservice',
    'components/formly-template/formly-factory',
    'components/directive/datetime-picker',
], function (app) {
    app.controller("StudentItemCtrl", ["$scope", "$log", "$uibModalInstance", "item", "option", "$timeout",
        'FormlyFactory', 'StudentService', 'Notifications', 'constantsAMD', "ClassService",
        function ($scope, $log, $uibModalInstance, item, option, $timeout,
            FormlyFactory, StudentService, Notifications, constantsAMD, ClassService) {
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
            $scope.Cancel = function () {
                $uibModalInstance.close();
            };

            $scope.modalName = "Tạo mới";
            //init
            var Init = function () {
                $scope.modalName = "Sửa thông tin";
                $scope.Item = item;
                $scope.Birthday = item.Birthday;
                if (item.Class != null) {
                    $scope.Class = item.Class.ClassId;
                }
            }

            //Save
            $scope.Save = function () {
                var model = {};
                model.StudentId = $scope.Item.StudentId;
                model.Code = $scope.Item.Code;
                model.Name = $scope.Item.Name;

                //date
                var date = $scope.Item.Birthday;
                model.Birthday = date;
                console.log(model.Birthday);
                //
                if ($scope.Class != null) {
                    model.ClassId = $scope.Class;
                }

                if (model.StudentId != null) {
                    var promise = StudentService.Update(model);
                    promise.success(function (response) {
                        $log.debug(response);
                        $uibModalInstance.close();
                    });
                    return;
                }
                var promise = StudentService.Create(model);
                promise.success(function (response) {
                    $log.debug(response);
                    $uibModalInstance.close();
                });
            };

            //date time picker
            $scope.open1 = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened1 = true;
            };

            //class
            var loadData = function () {
                if (item != null) {
                    Init();
                }
                var promise = ClassService.GetAll();
                promise.success(function (data) {
                    $log.debug(data);
                    $scope.Classes = data.Data;
                }).error(function (response) {
                    $log.debug(response);
                });
            };
            loadData();
        }
    ])
});