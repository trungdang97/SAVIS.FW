"use strict";
define(["app",
    'components/service/amdservice',
    'components/service/apiservice',
    'components/formly-template/formly-factory',
], function (app) {
    app.controller("ClassItemCtrl", ["$scope", "$log", "$uibModalInstance", "item", "option", "$timeout",
        'FormlyFactory', 'ClassService', 'Notifications', 'constantsAMD',
        function ($scope, $log, $uibModalInstance, item, option, $timeout,
            FormlyFactory, ClassService, Notifications, constantsAMD) {
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
            $scope.modalName = "Tạo mới";
            var Init = function(){
                $scope.modalName = "Sửa thông tin";
            };

            //Save
            $scope.Save = function () {
                var model = {};
                model.Code = $scope.Item.Code;
                model.Name = $scope.Item.Name;

                if ($scope.Item.ClassId != null) {
                    model.ClassId = $scope.Item.ClassId;
                    var promise = ClassService.Update(model);
                    promise.success(function (response) {
                        $log.debug(response);
                        $uibModalInstance.close();
                    });
                }
                else {
                    var promise = ClassService.Create(model);
                    promise.success(function (response) {
                        $log.debug(response);
                        $uibModalInstance.close();
                        //loadData();
                    });
                }
            };

            var loadData = function(){
                if(item != null){
                    Init();
                }
            };
            loadData();


            ///////// TABLES 
            /* Header grid datatable */
            $scope.Headers = [
                { Key: '#', Value: "Mã sinh viên", Width: 'auto', Align: 'text-center' },
                { Key: '#', Value: "Tên sinh viên", Width: 'auto', Align: 'text-center' },
                { Key: '#', Value: "Ngày sinh", Width: '15%', Align: 'text-center' },
            ];
            ////////////////
        }
    ])
});