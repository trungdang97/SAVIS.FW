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

            $scope.ListSelected = [];
            $scope.SelectAll = false;

            
        }
    ]);
});
