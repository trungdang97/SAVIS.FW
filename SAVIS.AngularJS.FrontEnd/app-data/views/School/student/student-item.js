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

            //Save
            $scope.Save = function () {
                var model = {};
                model.Code = $scope.Item.Code;
                model.Name = $scope.Item.Name;
                model.Birthday = $scope.Birthday;
                model.ClassId = $scope.Class.ClassId;

                console.log(model);
                return;

                var promise = StudentService.Create(model);
                promise.success(function (response) {
                    $log.debug(response);
                    $uibModalInstance.close();
                    
                    //loadData();
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