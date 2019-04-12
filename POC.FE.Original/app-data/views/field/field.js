define(['jquery', 'app', 'angular-sanitize',
    'components/factory/factory',
    'components/service/apiservice',
    'components/service/amdservice',
    'views/field/field-item',

    'components/formly-template/formly-factory',
], function (jQuery, app) {
    app.controller('FieldCtrl', ['$scope', '$filter', '$sce', '$timeout', '$location', '$log', '$http', '$uibModal', 'constantsFactory',
        'constantsAMD', '$routeParams', 'Notifications', 'FieldService','FormlyFactory','FormlyService',
    function ($scope, $filter, $sce, $timeout, $location, $log, $http, $uibModal, constantsFactory,
        constantsAMD, $routeParams, Notifications, FieldService, FormlyFactory,FormlyService) {
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
        { Key: 'Handler', Value: "Xử Lý", Width: '8%', Align: 'left' },
        ];  
        var loadData = function () {
            var qs = $location.search();
            if (typeof (qs["search"]) !== 'undefined') {
                $scope.TextSearch = qs["search"];
            } else {
                $location.search("search", "");
                $scope.TextSearch = "";
            }

            if (typeof (qs["pn"]) !== 'undefined') {
                $scope.PageNumber = qs["pn"];
            } else {
                $location.search("pn", "1");
                $scope.PageNumber = 1;
            }

            if (typeof (qs["ps"]) !== 'undefined') {
                $scope.PageSize = qs["ps"];
            } else {
                $location.search("ps", "10");
                $scope.PageSize = 10;
            }


            if (typeof (qs["isRecord"]) !== 'undefined') {
                if (qs["isRecord"] === "0") {
                    $scope.IsRecordCommonField = null;
                } else {
                    $scope.IsRecordCommonField = true;
                }
            } else {
                $location.search("isRecord", "0");
                $scope.IsRecordCommonField = null;
            }
            if (typeof (qs["isDocument"]) !== 'undefined') {
                if (qs["isDocument"] === "0") {
                    $scope.IsDocumentCommonField = null;
                } else {
                    $scope.IsDocumentCommonField = true;
                }
            } else {
                $location.search("isDocument", "0");
                $scope.IsDocumentCommonField = null;
            }
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
                    //$scope.ListData = $filter('orderBy')($scope.ListData, "IsDocumentCommonField", true);
                    //$scope.ListData = $filter('orderBy')($scope.ListData, "IsRecordCommonField", true);
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
        $scope.Button.Create = {};
        $scope.Button.Create.Click = function () {
            var modalInstance;   
                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: itemDialogUrl,
                    controller: 'FieldItemCtrl',
                    size: 'lg',
                    // windowClass :"modal-full",
                    backdrop: 'static',
                    // Set parameter to chidform (popup form)
                    resolve: {
                        item: function () {
                            return null;
                        },
                        option: function () {
                            var obj = {};
                            obj.Mode = "add";
                            return obj
                        },
                    }
                }); 

                modalInstance.result.then(function (response) {
                    loadData();
                }, function (response) { });
        };
         
        $scope.Button.Update = {};
        $scope.Button.Update.Click = function (item) {
            if (typeof (item) === "undefined") {
                item = $scope.ListSelected[0];
            }
            var modalInstance;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: itemDialogUrl,
                controller: 'FieldItemCtrl',
                size: 'lg',
                // windowClass :"modal-full",
                backdrop: 'static',
                // Set parameter to chidform (popup form)
                resolve: {
                    item: function () {
                        return item;
                    },
                    option: function () {
                        var obj = {};
                        obj.Mode = "update";
                        return obj
                    },
                }
            });

            modalInstance.result.then(function (response) {
                loadData();
            }, function (response) { });
        };

        $scope.Button.Delete = {};
        $scope.Button.Delete.Click = function (item) {
            var infoResult = constantsAMD.OpenDialog('Bạn có chắc chắn muốn xóa thông tin này !', 'Chú ý', 'Đồng ý', 'Đóng', 'sm');
            infoResult.result.then(function (modalResult) {
                if (modalResult == 'confirm') {
                    var promise = FieldService.Delete(item.FieldId);
                    promise.success(function (response) {
                        $log.debug(response);
                        loadData();
                    })

                };
            });
        };
        $scope.Button.DeleteMany = {};
        $scope.Button.DeleteMany.Click = function () {
            var listDeleteting = [];
            angular.forEach($scope.ListData, function (item) {
                if (item.Selecting) {
                    listDeleteting.push(item.FieldId);
                }
            });
            var infoResult = constantsAMD.OpenDialog('Bạn có chắc chắn muốn xóa những chủ đề  này !', 'Chú ý', 'Đồng ý', 'Đóng', 'sm');
            infoResult.result.then(function (modalResult) {
                if (modalResult == 'confirm') {
                    var promise = FieldService.DeleteMany(listDeleteting);
                    promise.success(function (response) {
                        $log.debug(response);
                        loadData();
                    })

                };
            });
        };

        $scope.Button.Reload = {};
        $scope.Button.Reload.Click = function () {
            $location.search("search", "");
            $location.search("pn", "1");
            $location.search("isRecord", "0");
            $location.search("isDocument", "0");
            loadData();
        };

        $scope.Button.GoToPageNumber = {};
        $scope.Button.GoToPageNumber.Click = function () { 
            $location.search("pn", $scope.PageNumber);
            loadData();
        };
        
        $scope.Button.Search = {};
        $scope.Button.Search.Click = function () { 
            loadData();
        };
        $scope.$watch('IsRecordCommonField', function () {
            if ($scope.IsRecordCommonField) { $location.search("isRecord", "1"); } else {
                $location.search("isRecord", "0");
            }
        }, false);
        $scope.$watch('IsDocumentCommonField', function () {
            if ($scope.IsDocumentCommonField) { $location.search("isDocument", "1"); } else {
                $location.search("isDocument", "0");
            }
        }, false);
    }
    ]);
});
