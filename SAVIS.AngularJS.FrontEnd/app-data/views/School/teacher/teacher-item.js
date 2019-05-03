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

            $scope.Item = item;
            //Save

            var loadData = function () {
                var promise = TeacherService.TeacherDetail(item.TeacherId);
                promise.success(function (response) {
                    $log.debug(response);
                    $scope.Detail = response.Data;
                });
            };
            loadData();

            $scope.Save = function () {
                var model = {};
                model.Code = $scope.Item.Code;
                model.Name = $scope.Item.Name;
                var promise = TeacherService.Create(model);
                promise.success(function (response) {
                    $log.debug(response);
                    $uibModalInstance.close();
                    //loadData();
                });
            };
        }
    ])
});