"use strict";
define(["app",
    'components/formly-template/formly-factory',
], function(app) {
    app.controller("FormlyEditLabel", ["$scope", "$log", "item", "$uibModalInstance", "$timeout","FormlyFactory",
        function ($scope, $log, item, $uibModalInstance, $timeout, FormlyFactory) {
            $scope.ListAvailAbleClass = FormlyFactory.ListAvailAbleClass;
            $scope.Item = angular.copy(item);
            $scope.PreviewSheme = [];
            $scope.PreviewSheme.push(angular.copy($scope.Item));
            $scope.PreviewData = {};
            $scope.$watch('Item', function() {
                $scope.PreviewSheme = [];
                $scope.PreviewSheme.push(angular.copy($scope.Item));
            }, true);
            /* Button close Popup Form */
            $scope.Cancel = function() {

                $uibModalInstance.dismiss();
            };
            $scope.Save = function() {
                $uibModalInstance.close($scope.Item);
            };


        }
    ]);
});