define(['jquery', 'app',
    'jquery-ui',
    'slimscroll',
    'components/factory/factory',
    'components/service/apiservice',
    'components/service/amdservice',
], function (jQuery, app) {
    app.controller('StudentCtrl', ['$scope', '$sce', '$timeout', '$log', '$http', '$uibModal', 'constantsFactory', 'constantsAMD', '$routeParams', 'StudentService',
        function ($scope, $sce, $timeout, $log, $http, $uibModal, constantsFactory, constantsAMD, $routeParams, StudentService) {
            //declare variable for API
            var api = {
                //GetStudentQuantity: constantsFactory.ApiUrl + 'api/v1/summary/student/quantity',
                
            };

            $scope.init = function () {
                
            };
        }
    ]);
});
