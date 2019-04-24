define(['jquery', 'app', 'angular-sanitize',
    'components/factory/factory',
    'components/service/apiservice',
    'components/service/amdservice',
    'views/School/class/class-item',
    'components/formly-template/formly-factory',
], function (jQuery, app) {
    app.controller('TeacherDetailCtrl', ['$scope', '$sce', '$timeout', '$location', '$log', '$http', '$uibModal', 'constantsFactory',
        'constantsAMD', '$routeParams', 'Notifications', 'TeacherService', 'FormlyFactory',
        function ($scope, $sce, $timeout, $location, $log, $http, $uibModal, constantsFactory,
            constantsAMD, $routeParams, Notifications, TeacherService, FormlyFactory) {
            $scope.code = $routeParams.code;
            
            var promise = TeacherService.GetById($scope.code);
            promise.success(function (data) {
                $log.debug(data)
                if (data.Status != null) {
                    $scope.model = data.Data;
                    $scope.FormattedDate = new Date($scope.model.Birthday);
                    //console.log($scope.model);
                }
            }).error(function (response) {
                $log.debug(response);
            });

            
        }
    ]);
});