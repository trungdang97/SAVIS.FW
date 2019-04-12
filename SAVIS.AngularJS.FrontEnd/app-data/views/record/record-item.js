"use strict";
define(["app", 
    'components/service/amdservice',
    'components/service/apiservice',
    'components/formly-template/formly-factory',
], function (app) {
    app.controller("RecordItemCtrl", ["$scope", "$log", "$uibModalInstance", "item", "option", "$timeout",
        'FormlyFactory', 'RecordService', 'FieldService', 'Notifications', 'constantsAMD',"ArchiveTypeService","FormlyService", 
        function ($scope, $log, $uibModalInstance, item, option, $timeout,
            FormlyFactory, RecordService, FieldService, Notifications, constantsAMD, ArchiveTypeService, FormlyService) {
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
            //Init Archive_type
            $scope.ListArchiveType =[];
            var initArchiveType = function () {
                $scope.ListArchiveType = [];
                var postData = {};
                postData.Status = 1;
                var promise = ArchiveTypeService.GetFilter(postData);
                promise.success(function (data) {
                    if (data.Status == 1) {
                        $scope.ListArchiveType = data.Data;
                    }
                });
                return promise;
            };
            $scope.ListRecordField = [];
            $scope.Data = {};
            $scope.DataPreview = {};
            $scope.PreviewSheme = [];
            var initRecordField = function (id) {
                $scope.ListRecordField = [];
                var promise = ArchiveTypeService.GetFieldByArchiveTypeId(id, 0);
                promise.success(function (data) {
                    $log.debug(data)
                    if (data.Status != null) {
                        $scope.ListRecordField = data.Data;
                        delete $scope.PreviewSheme;
                        $scope.PreviewSheme = [];
                        angular.forEach($scope.ListRecordField, function (item) {
                            item.FormlyContentObj = [];
                            try {
                                var obj = FormlyService.DeSerializeJSON(item.FormlyContent);
                                item.FormlyContentObj.push(obj);
                                $scope.PreviewSheme.push(obj);
                            } catch (e) { console.log(e); }
                        });
                    }
                }).error(function (response) {
                    $log.debug(response);
                });
                return promise;
            }

            var initRecordFieldData = function (id) {

                $scope.Data = {};
                var promise = RecordService.GetAtributeById(id);
                promise.success(function (data) {
                    $log.debug(data)
                    if (data.Status != null) {
                        for (var i = 0; i < data.Data.length; i++) {
                            var item = data.Data[i]; 
                            
                            switch (item.DataType) {
                                case "nvarchar(512)":
                                    {
                                        $scope.Data[item.Key] = item.NvarcharValue; 
                                        break;
                                    }
                                case "int":
                                    {
                                        $scope.Data[item.Key] = item.IntValue;
                                        break;
                                    }
                                case "varchar(512)":
                                    {
                                        $scope.Data[item.Key] = item.VarcharValue; 
                                        break;
                                    }
                                case "uniqueidentifier":
                                    {
                                        $scope.Data[item.Key] = item.GuidValue; 
                                        break;
                                    }
                                case "datetime":
                                    {
                                        $scope.Data[item.Key] = item.DatetimeValue; 
                                        break;
                                    }
                                case "bit":
                                    {
                                        $scope.Data[item.Key] = item.BitValue; 
                                        break;
                                    }
                                default:
                                    break;



                            };
                        }
                    }
                }).error(function (response) {
                    $log.debug(response);
                });
                return promise;
            }

            var initFormMode = function () {
                $scope.Item = {}; 
                if (option.Mode === "add") {

                } else {
                    $scope.Item = angular.copy(item);
                    initRecordField($scope.Item.ArchiveTypeId);
                    initRecordFieldData($scope.Item.RecordId);
                }
            }
 
            initFormMode();
            initArchiveType();
            $scope.Save = function () {  
                if (option.Mode === "add") {
                    var postData = $scope.Item;
                    postData.DataAtribute = [];
                     
                    for (var data in $scope.Data) {
                        if ( $scope.Data.hasOwnProperty(data)) {
                            //alert("Key is " + k + ", value is" + target[k]);
                            var key = data;
                            var value = $scope.Data[data];

                            for (var i = 0; i < $scope.ListRecordField.length; i++) {
                                var field = $scope.ListRecordField[i];
                                if (field.FormlyContentObj[0].key === key) {
                                    var model = {
                                        "Key": key,
                                        "DataType": field.FormlyContentObj[0].data.dbType,
                                        "Vaule": value,
                                        "FieldId": field.FieldId,
                                    }; 
                                    switch (model.DataType) {
                                        case "nvarchar(512)":
                                            {
                                                model.NvarcharValue = value;
                                                break;
                                            }
                                        case "int":
                                            {
                                                model.IntValue = value;
                                                break;
                                            }
                                        case "varchar(512)":
                                            {
                                                model.VarcharValue = value;
                                                break;
                                            }
                                        case "uniqueidentifier":
                                            {
                                                model.GuidValue = value;
                                                break;
                                            }
                                        case "datetime":
                                            {
                                                model.DatetimeValue = value;
                                                break;
                                            }
                                        case "bit":
                                            {
                                                model.BitValue = value;
                                                break;
                                            }
                                        default:
                                            break;



                                    };
                                    //debugger
                                    postData.DataAtribute.push(model);
                                }
                            } 
                        }
                    } 
                    //debugger
                    var promise = RecordService.Create(postData);
                    promise.success(function (data) {
                        $log.debug(data)
                        if (data.Status === 1) {
                            $scope.success("tạo record thành công!");
                            $uibModalInstance.close(data.Data);
                        } else {
                            $scope.error("tạo record thất bại!");
                        }
                    })
                           .error(function (response) {
                               $log.debug(response);
                               $scope.error("tạo record thất bại!");
                           });
                } else {
                    var putData = {};
                    var putData = $scope.Item;

                    putData.DataAtribute = [];

                    for (var data in $scope.Data) {
                        if ($scope.Data.hasOwnProperty(data)) {
                            //alert("Key is " + k + ", value is" + target[k]);
                            var key = data;
                            var value = $scope.Data[data];

                            for (var i = 0; i < $scope.ListRecordField.length; i++) {
                                var field = $scope.ListRecordField[i];
                                if (field.FormlyContentObj[0].key === key) {
                                    var model = {
                                        "Key": key,
                                        "DataType": field.FormlyContentObj[0].data.dbType,
                                        "Vaule": value,
                                        "FieldId": field.FieldId,
                                    };
                                    switch (model.DataType) {
                                        case "nvarchar(512)":
                                            {
                                                model.NvarcharValue = value;
                                                break;
                                            }
                                        case "int":
                                            {
                                                model.IntValue = value;
                                                break;
                                            }
                                        case "varchar(512)":
                                            {
                                                model.VarcharValue = value;
                                                break;
                                            }
                                        case "uniqueidentifier":
                                            {
                                                model.GuidValue = value;
                                                break;
                                            }
                                        case "datetime":
                                            {
                                                model.DatetimeValue = value;
                                                break;
                                            }
                                        case "bit":
                                            {
                                                model.BitValue = value;
                                                break;
                                            }
                                        default:
                                            break;



                                    };
                                    //debugger
                                    putData.DataAtribute.push(model);
                                }
                            }
                        }
                    }
                    var promise = RecordService.Update(item.RecordId, putData);
                    promise.success(function (data) {
                        $log.debug(data)
                        if (data.Status === 1) {
                            $scope.success("cập nhật record thành công!");
                            $uibModalInstance.close(data.Data);
                        } else {
                            $scope.error("cập nhật record thất bại!");
                        }
                    })
                           .error(function (response) {
                               $log.debug(response);
                               $scope.error("cập nhật record thất bại!");
                           });
                }
            };
            $scope.Cancel = function () {
                $uibModalInstance.dismiss();
            };
            $scope.ChangeArchive = function(){
                initRecordField($scope.Item.ArchiveTypeId);
            }
        }
    ]);
});