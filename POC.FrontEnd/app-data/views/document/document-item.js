"use strict";
define(["app",
    'components/service/amdservice',
    'components/service/apiservice',
    'components/formly-template/formly-factory',
], function (app) {
    app.controller("DocumentItemCtrl", ["$scope", "$log", "$uibModalInstance", "item", "option", "$timeout",
        'FormlyFactory', 'DocumentService', 'FieldService', 'Notifications', 'constantsAMD', "ArchiveTypeService", "FormlyService",
        function ($scope, $log, $uibModalInstance, item, option, $timeout,
            FormlyFactory, DocumentService, FieldService, Notifications, constantsAMD, ArchiveTypeService, FormlyService) {
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
            $scope.ListArchiveType = [];
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
            $scope.ListDocumentField = [];
            $scope.Data = {};
            $scope.DataPreview = {};
            $scope.PreviewSheme = [];
            var initDocumentField = function (id) {
                $scope.ListDocumentField = [];
                var promise = ArchiveTypeService.GetFieldByArchiveTypeId(id, 1);
                promise.success(function (data) {
                    $log.debug(data)
                    if (data.Status != null) {
                        $scope.ListDocumentField = data.Data;
                        delete $scope.PreviewSheme;
                        $scope.PreviewSheme = [];
                        angular.forEach($scope.ListDocumentField, function (item) {
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

            var initDocumentFieldData = function (id) {

                $scope.Data = {};
                var promise = DocumentService.GetAtributeById(id);
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
                    initDocumentField($scope.Item.ArchiveTypeId);
                    initDocumentFieldData($scope.Item.DocumentId);
                }
            }

            initFormMode();
            initArchiveType();
            $scope.Save = function () {
                if (option.Mode === "add") {
                    var postData = $scope.Item;
                    postData.DataAtribute = [];

                    for (var data in $scope.Data) {
                        if ($scope.Data.hasOwnProperty(data)) {
                            //alert("Key is " + k + ", value is" + target[k]);
                            var key = data;
                            var value = $scope.Data[data];

                            for (var i = 0; i < $scope.ListDocumentField.length; i++) {
                                var field = $scope.ListDocumentField[i];
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
                    var promise = DocumentService.Create(postData);
                    promise.success(function (data) {
                        $log.debug(data)
                        if (data.Status === 1) {
                            $scope.success("tạo document thành công!");
                            $uibModalInstance.close(data.Data);
                        } else {
                            $scope.error("tạo document thất bại!");
                        }
                    })
                           .error(function (response) {
                               $log.debug(response);
                               $scope.error("tạo document thất bại!");
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

                            for (var i = 0; i < $scope.ListDocumentField.length; i++) {
                                var field = $scope.ListDocumentField[i];
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
                    var promise = DocumentService.Update(item.DocumentId, putData);
                    promise.success(function (data) {
                        $log.debug(data)
                        if (data.Status === 1) {
                            $scope.success("cập nhật document thành công!");
                            $uibModalInstance.close(data.Data);
                        } else {
                            $scope.error("cập nhật document thất bại!");
                        }
                    })
                           .error(function (response) {
                               $log.debug(response);
                               $scope.error("cập nhật document thất bại!");
                           });
                }
            };
            $scope.Cancel = function () {
                $uibModalInstance.dismiss();
            };
            $scope.ChangeArchive = function () {
                initDocumentField($scope.Item.ArchiveTypeId);
            }
        }
    ]);
});