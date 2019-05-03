define(['jquery', 'app', 'angular-sanitize',
    'components/factory/factory',
    'components/service/apiservice',
    'components/service/amdservice',
    'views/School/class/class-item',
    'components/formly-template/formly-factory',
], function (jQuery, app) {
    app.controller('ClassDetailCtrl', ['$scope', '$sce', '$timeout', '$location', '$log', '$http', '$uibModal', 'constantsFactory',
        'constantsAMD', '$routeParams', 'Notifications', 'ClassService', 'FormlyFactory',
        function ($scope, $sce, $timeout, $location, $log, $http, $uibModal, constantsFactory,
            constantsAMD, $routeParams, Notifications, ClassService, FormlyFactory) {
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

            var classCode = $routeParams.ClassCode;

            var loadData = function () {
                var promise = ClassService.GetByCode(classCode);
                promise.success(function (response) {
                    $log.debug(response);
                    $scope.Class = response.Data;

                });
            };
            loadData();

            $scope.ListSelected = [];
            $scope.SelectAll = false;

            
        }
    ]);
});
