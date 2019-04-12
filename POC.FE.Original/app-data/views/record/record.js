define(['jquery', 'app', 'angular-sanitize',
    'components/factory/factory',
    'components/service/apiservice',
    'components/service/amdservice',
    'views/record/record-item',

    'components/formly-template/formly-factory',
], function (jQuery, app) {
    app.controller('RecordCtrl', ['$scope', '$sce', '$timeout', '$location', '$log', '$http', '$uibModal', 'constantsFactory',
        'constantsAMD', '$routeParams', 'Notifications', 'RecordService', 'FormlyFactory','ArchiveTypeService','FormlyService',
    function ($scope, $sce, $timeout, $location, $log, $http, $uibModal, constantsFactory,
        constantsAMD, $routeParams, Notifications, RecordService, FormlyFactory, ArchiveTypeService, FormlyService) {
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
        
        var itemDialogUrl = '/app-data/views/record/record-item.html';
        $scope.ListSelected = [];
        $scope.SelectAll = false;

        /* Header grid datatable */
        $scope.Headers = [
        { Key: '#', Value: "Thông tin cơ bản", Width: 'auto', Align:'left' }, 
        { Key: 'Handler', Value: "Xử Lý", Width: '15%', Align: 'left' },
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
            var postData = {};
            if (typeof (qs["as"]) !== 'undefined') {
                var advandSearch = qs["as"];
                $scope.IsAdvancedSearch = true;
                try { 
                    $scope.ListSearch = angular.fromJson(advandSearch);
                    var listSearch = []; 
                    for (var i = 0; i < $scope.ListSearch.length; i++) {

                        var item = $scope.ListSearch[i];

                        for (var j = 0; j < $scope.ListField.length; j++) {
                            if ($scope.ListField[j].FieldId == item.FieldId) {
                                item.Field = $scope.ListField[j];
                            }
                        } 

                        var model = {};
                        model.Key = item.Field.FormlyContentObj[0].key;
                        model.CompareExpression = item.CompareExpression;
                        model.DataType = item.Field.FormlyContentObj[0].data.dbType;
                        if (item.LinkOperator === 0) {
                            model.IsAndClause = false;
                        } else {
                            model.IsAndClause = true;
                        } 
                        switch (model.DataType) {
                            case "nvarchar(512)":
                                {
                                    model.NvarcharValue = item.PreviewData[model.Key];
                                    break;
                                }
                            case "int":
                                {
                                    model.IntValue = parseInt(item.PreviewData[model.Key]);
                                    break;
                                }
                            case "varchar(512)":
                                {
                                    model.VarcharValue = item.PreviewData[model.Key];
                                    break;
                                }
                            case "uniqueidentifier":
                                {
                                    model.GuidValue = item.PreviewData[model.Key];
                                    break;
                                }
                            case "datetime":
                                {
                                    model.DatetimeValue = new Date(item.PreviewData[model.Key]);
                                    break;
                                }
                            case "bit":
                                {
                                    if (item.PreviewData[model.Key] == true) {
                                        model.BitValue = true;
                                    } else { model.BitValue = false; }
                                    break;
                                }
                            default:
                                break;
                        };
                        listSearch.push(model);
                    }
                } catch (e) {  }
            } else {
                $scope.ListSearch = [{
                    "LinkOperator": 0,
                    "CompareExpression": 0,
                }];
                $scope.IsAdvancedSearch = false;
            }
            
           
         
            postData.SearchList = listSearch;
            postData.PageNumber = $scope.PageNumber;
            postData.PageSize = $scope.PageSize;
            postData.TextSearch = $scope.TextSearch;
            console.log($scope.ListSearch);

            //angular.forEach($scope.ListField, function (field) {
            //    if(field.FieldId == )
            
            //})

            var promise = RecordService.GetFilter(postData);
            promise.success(function (data) {
                $log.debug(data)
                if (data.Status != null) {
                    $scope.ListData = data.Data;


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
                    controller: 'RecordItemCtrl',
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
                controller: 'RecordItemCtrl',
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
                    var promise = RecordService.Delete(item.RecordId);
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
                    listDeleteting.push(item.RecordId);
                }
            });
            var infoResult = constantsAMD.OpenDialog('Bạn có chắc chắn muốn xóa những chủ đề  này !', 'Chú ý', 'Đồng ý', 'Đóng', 'sm');
            infoResult.result.then(function (modalResult) {
                if (modalResult == 'confirm') {
                    var promise = RecordService.DeleteMany(listDeleteting);
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


        $scope.Button.Search = {};
        $scope.Button.Search.Click = function () {
            $location.search("search", $scope.TextSearch);
            $location.search("pn", "1");
            $location.search("isRecord", "0");
            $location.search("isDocument", "0");
            loadData();
        }
        $scope.Button.SearchAdvance ={};
        $scope.Button.SearchAdvance.Click = function () {
            if ($scope.IsAdvancedSearch) {
               
                $location.search("search", "");
                $location.search("pn", "1");
                $location.search("isRecord", "0");
                $location.search("isDocument", "0");
                var searchString = angular.toJson($scope.ListSearch);
                $location.search("as", searchString);
                loadData();
            }
        }

        $scope.Button.ResetSearchAdvance = {};
        $scope.Button.ResetSearchAdvance.Click = function () {
            $scope.ListSearch = [{
                "LinkOperator": 0,
                "CompareExpression": 0, 
            }];
        }
        //Advance Search
        $scope.ListCompareExpression = [
            {
                Key: "lớn hơn hoặc bằng",
                Value: 11
            }, {
                Key: "lớn hơn",
                Value: 10
            }, {
                Key: "bằng",
                Value: 0
            }, {
                Key: "khác",
                Value: 1
            }, {
                Key: "nhỏ hơn",
                Value: -10
            }, {
                Key: "nhở hơn hoặc bằng",
                Value: -11
            },
        ];
        $scope.ListLinkOperator = [
           {
               Key: "Và",
               Value: 1
           },
           {
               Key: "Hoặc",
               Value: 0
           }
        ];
        $scope.ListField = [];
        var initAllFieldInArchive = function () {
            $scope.ListField = [];
            var promise = ArchiveTypeService.GetFieldByArchiveTypeId("all",0);
            promise.success(function (data) {
                $log.debug(data)
                if (data.Status != null) {
                    $scope.ListField = data.Data;
                    angular.forEach($scope.ListField, function (item) {
                        item.FormlyContentObj = [];
                        try {
                            var obj = FormlyService.DeSerializeJSON(item.FormlyContent);
                            obj.templateOptions.label = "",
                            obj.templateOptions.horizontalLabel = false,

                            item.FormlyContentObj.push(obj); 
                        } catch (e) { console.log(e); }
                    }); 
                }
            }).error(function (response) {
                $log.debug(response);
            });
            return promise;
        }
        $scope.ListSearch = [{
            "LinkOperator": 0,
            "CompareExpression": 0,

        }];
        $scope.Button.DeleteOperator = {};
        $scope.Button.DeleteOperator.Click = function (index) { 
            $scope.ListSearch.splice(index,1);
        };
        $scope.Button.AddOperator = {};
        $scope.Button.AddOperator.Click = function (index) {
            if ($scope.ListSearch.length > 1) {
                $scope.ListSearch.push({
                    "LinkOperator": $scope.ListSearch[1].LinkOperator,
                    "CompareExpression": 0,
                });
            } else {
                $scope.ListSearch.push({
                    "LinkOperator": 0,
                    "CompareExpression": 0,
                });
            }
       
        };

        $scope.onChangeFieldItem = function (data) {
            angular.forEach($scope.ListField, function (field) {
                if (field.FieldId == data.FieldId) {
                    data.Field = field;
                }
            });
        } 

        $scope.onChangeLinkOperator = function (data) {
            angular.forEach($scope.ListSearch, function (search) { 
                search.LinkOperator = data.LinkOperator;
            });
        }

        var cmd = initAllFieldInArchive();
        cmd.then(function () {
            loadData();
        }); 
    }
    ]);
});
