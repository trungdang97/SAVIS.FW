define(['jquery', 'app', 'angular-sanitize',
    'components/factory/factory',
    'components/service/apiservice',
    'components/service/amdservice',
    'views/field/field-item',

    'components/formly-template/formly-factory',
], function (jQuery, app) {
    app.controller('FieldSelectCtrl', ['$scope', '$sce', '$timeout', '$location', '$log', '$http', '$uibModal', 'constantsFactory',
        'constantsAMD', '$routeParams', 'Notifications', 'FieldService','FormlyFactory','FormlyService','$uibModalInstance',
    function ($scope, $sce, $timeout, $location, $log, $http, $uibModal, constantsFactory,
        constantsAMD, $routeParams, Notifications, FieldService, FormlyFactory,FormlyService, $uibModalInstance) {
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

        var itemDialogUrl = '/app-data/views/field/field-item.html';
        $scope.ListSelected = [];
        $scope.SelectAll = false;

        /* Header grid datatable */
        $scope.Headers = [
        { Key: '#', Value: "Thông tin cơ bản", Width: 'auto', Align:'left' },
        { Key: '#', Value: "Xem trước", Width: '40%', Align: 'center' },
        //{ Key: 'Handler', Value: "Xử Lý", Width: '8%', Align: 'left' },
        ];


        $scope.PageNumber = 1;
        $scope.TextSearch = "";
        $scope.PageSize = 4;
        var loadData = function () {
            var qs = $location.search(); 
             
            var postData = {};
            postData.PageNumber = $scope.PageNumber;
            postData.PageSize = $scope.PageSize;
            postData.TextSearch = $scope.TextSearch;
            postData.IsRecordCommonField = $scope.IsRecordCommonField;
            postData.IsDocumentCommonField = $scope.IsDocumentCommonField;

            var promise = FieldService.GetFilter(postData);
            promise.success(function (data) {
                $log.debug(data)
                if (data.Status != null) {
                    $scope.ListData = data.Data;

                    angular.forEach($scope.ListData, function (item) {
                        item.FormlyContentObj = [];
                        try {
                            var obj = FormlyService.DeSerializeJSON(item.FormlyContent);
                            item.FormlyContentObj.push(obj);
                        } catch (e) { console.log(e);}

                       
                    });


                    $scope.TotalCount = data.TotalCount;
                    $scope.MaxSizePage = 7;
                    $scope.FromRecord = 0;
                    $scope.ToRecord = 0;
                    if ($scope.TotalCount !== 0) {
                        $scope.FromRecord = parseInt(($scope.PageNumber - 1) * $scope.PageSize + 1);
                        $scope.ToRecord = $scope.FromRecord + $scope.ListData.length - 1;
                    }
                    console.log("FromRecord", $scope.FromRecord);
                    console.log("ToRecord", $scope.ToRecord);
                }
            }).error(function (response) {
                $log.debug(response);
            });
        };
        loadData();

        $scope.SelectItem = function (item) {
            if (!item.Selecting) {
                var index = $scope.ListSelected.indexOf(item);
                if (index >= 0) {
                    $scope.ListSelected.splice(index, 1);
                }
            } else {
                $scope.ListSelected.push(item);
            }
            if ($scope.ListSelected.length === $scope.ListData.length) {
                $scope.SelectAll = true;
            } else {
                $scope.SelectAll = false;
            }
        }

        $scope.SelectAllItem = function () {
            if ($scope.ListSelected.length === $scope.ListData.length) {
                $scope.ListSelected = [];
                angular.forEach($scope.ListData, function (file) {
                    file.Selecting = false;
                });
                $scope.SelectAll = false;
            } else {
                $scope.ListSelected = [];
                angular.forEach($scope.ListData, function (file) {
                    file.Selecting = true;
                    $scope.ListSelected.push(file);
                });
                $scope.SelectAll = true;
            }
        }

        $scope.Button = {};  

        $scope.Button.Reload = {};
        $scope.Button.Reload.Click = function () { 
            $scope.PageNumber = 1;
            $scope.TextSearch = "";
            $scope.IsRecordCommonField = true;
            $scope.IsDocumentCommonField = true; 
            loadData();
        };
        $scope.Button.GoToPageNumber = {};
        $scope.Button.GoToPageNumber.Click = function () { 
            loadData();
        };
        $scope.Button.Search = {};
        $scope.Button.Search.Click = function () {
            loadData();
        };
        //$scope.$watch('IsRecordCommonField', function () {
        //    if ($scope.IsRecordCommonField) { loadData(); }
        //}, false);
        //$scope.$watch('IsDocumentCommonField', function () {
        //    if ($scope.IsDocumentCommonField) { loadData(); }
        //}, false);

        $scope.Save = function () {
            $uibModalInstance.close($scope.ListSelected);
        };
        $scope.Cancel = function () {
            $uibModalInstance.dismiss();
        };
    }
    ]);
});
