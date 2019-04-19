"use strict";
define(["app",
    'components/service/amdservice',
    'components/service/apiservice',
    'components/formly-template/formly-factory',
], function (app) {
    app.controller("ClassItemCtrl", ["$scope", "$log", "$uibModalInstance", "item", "option", "$timeout",
        'FormlyFactory', 'ClassService', 'Notifications', 'constantsAMD', "FormlyService",
        function ($scope, $log, $uibModalInstance, item, option, $timeout,
            FormlyFactory, DocumentService, Notifications, constantsAMD, FormlyService) {
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
                $uibModalInstance.dismiss();
            };

            //Save
            var model = {};
            //model.Code = $scope.Item.Code;
            //model.Name = $scope.Item.Name;
            
            $scope.Save = function () {
                
            };
        }
    ])
});