"use strict";
define(["app",
    'components/service/amdservice',
    'components/service/apiservice',
    'components/formly-template/formly-factory',
], function (app) {
    app.controller("TeacherItemCtrl", ["$scope", "$log", "$uibModalInstance", "item", "option", "$timeout",
        'FormlyFactory', 'TeacherService', 'Notifications', 'constantsAMD', "FormlyService",
        function ($scope, $log, $uibModalInstance, item, option, $timeout,
            FormlyFactory, TeacherService, Notifications, constantsAMD, FormlyService) {
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

            //Headers
            $scope.Headers = [
                { Key: '#', Value: "Mã lớp", Width: 'auto', Align: 'text-center' },
                { Key: '#', Value: "Tên lớp", Width: 'auto', Align: 'text-center' },
                { Key: '#', Value: "Từ ngày", Width: 'auto', Align: 'text-center' },
                { Key: '#', Value: "Đến ngày", Width: 'auto', Align: 'text-center' },
            ];

            $scope.UpdatingStatus = false;
            $scope.Action = "Tạo mới";
            if (option.Mode == "update") {
                $scope.UpdatingStatus = true;
                $scope.Action = "Chi tiết/cập nhật";
            }
            
            var loadData = function () {
                if (item != null) {
                    $scope.Item = item;

                    var promise = TeacherService.TeacherDetail(item.TeacherId);
                    promise.success(function (response) {
                        $log.debug(response);
                        $scope.Details = response.Data.Classes;
                    });
                }
            };
            loadData();

            $scope.Save = function () {
                var model = {};
                model.Code = $scope.Item.Code;
                model.Name = $scope.Item.Name;
                if (item.TeacherId != null) {
                    model.TeacherId = $scope.Item.TeacherId;
                    var promise = TeacherService.Update(model);
                    promise.success(function (response) {
                        $log.debug(response);
                        $uibModalInstance.close();
                        //loadData();
                    });
                }
                else {
                    var promise = TeacherService.Create(model);
                    promise.success(function (response) {
                        $log.debug(response);
                        $uibModalInstance.close();
                        //loadData();
                    });
                }
            };
        }
    ])
});