define(['jquery', 'app',
    'jquery-ui',
    'slimscroll',
    'components/factory/factory',
    'components/service/apiservice',
    'components/service/amdservice',
], function (jQuery, app) {
    app.controller('TeacherCtrl', ['$scope', '$sce', '$timeout', '$log', '$http', '$uibModal', 'constantsFactory', 'constantsAMD', '$routeParams', 'TeacherService',
        function ($scope, $sce, $timeout, $log, $http, $uibModal, constantsFactory, constantsAMD, $routeParams, TeacherService) {
            //declare variable for API
            var api = {
                //GetStudentQuantity: constantsFactory.ApiUrl + 'api/v1/summary/student/quantity',

            };

            $scope.init = function () {

            };
        }
    ]);
});
