"use strict";
define(["app",
    'jquery-ui',
    'slimscroll',
    'components/service/amdservice',
    'components/service/apiservice',
    'components/formly-template/formly-factory',
    'views/field/field-item',
    'views/archivetype/field-select',
], function (app) {
    app.controller("ArchiveTypeItemCtrl", ["$scope", "$log", "$uibModalInstance",'$uibModal', "item", "option", "$timeout", 'FormlyService', 'ArchiveTypeService', 'FieldService', 'Notifications', 'constantsAMD',
        function ($scope, $log, $uibModalInstance, $uibModal, item, option, $timeout, FormlyService, ArchiveTypeService, FieldService, Notifications, constantsAMD) {
            /* Notification -----------------------------------------------------*/
            var addFieldUrl = '/app-data/views/field/field-item.html';
            var selectFieldUrl = '/app-data/views/archivetype/field-select.html';
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
            $scope.Mode = 1;
            $scope.ListField = [];
            //
            var initField = function () {
                var postData = {};
                postData.PageNumber = $scope.PageNumber;
                postData.PageSize = $scope.PageSize;
                postData.TextSearch = $scope.TextSearch;
                var promise = FieldService.GetFilter(postData);
                promise.success(function (data) {
                    $log.debug(data)
                    if (data.Status != null) {
                        $scope.ListField = data.Data;


                        angular.forEach($scope.ListField, function (item) {
                            item.FormlyContentObj = [];
                            try {
                                var obj = FormlyService.DeSerializeJSON(item.FormlyContent);
                                item.FormlyContentObj.push(obj);
                            } catch (e) { console.log(e); }
                        });

                        $scope.TotalCount = data.TotalCount;
                        $scope.MaxSizePage = 7;
                        $scope.FromArchiveType = 0;
                        $scope.ToArchiveType = 0;
                        if ($scope.TotalCount !== 0) {
                            $scope.FromArchiveType = parseInt(($scope.PageNumber - 1) * $scope.PageSize + 1);
                            $scope.ToArchiveType = $scope.FromArchiveType + $scope.ListField.length - 1;
                        }
                         
                    }
                }).error(function (response) {
                    $log.debug(response);
                });
                return promise;
            }
            var initRecordCommonField = function () {
                var postData = {};
                postData.IsRecordCommonField = true;

                var promise = FieldService.GetFilter(postData);
                promise.success(function (data) {
                    $log.debug(data)
                    if (data.Status != null) {
                        $scope.ListRecordCommonField = data.Data;

                        angular.forEach($scope.ListRecordCommonField, function (item) {
                            item.FormlyContentObj = [];
                            try {
                                var obj = FormlyService.DeSerializeJSON(item.FormlyContent);
                                item.FormlyContentObj.push(obj);
                            } catch (e) { console.log(e); }
                        });
                    }
                }).error(function (response) {
                    $log.debug(response);
                });
                return promise;
            }
            //
            $scope.ListDocumentCommonField = [];
            var initDocumentCommonField = function () {
                var postData = {};
                postData.IsDocumentCommonField = true;

                var promise = FieldService.GetFilter(postData);
                promise.success(function (data) {
                    $log.debug(data)
                    if (data.Status != null) {
                        $scope.ListDocumentCommonField = data.Data;


                        angular.forEach($scope.ListDocumentCommonField, function (item) {
                            item.FormlyContentObj = [];
                            try {
                                var obj = FormlyService.DeSerializeJSON(item.FormlyContent);
                                item.FormlyContentObj.push(obj);
                            } catch (e) { console.log(e); }
                        });
                    }
                }).error(function (response) {
                    $log.debug(response);
                });
                return promise;
            }
            //
            $scope.ListDocumentField = [];
            var initDocumentField = function (id) {
                var promise = ArchiveTypeService.GetFieldByArchiveTypeId(id, 1);
                promise.success(function (data) {
                    $log.debug(data)
                    
                    if (data.Status != null) {
                        $scope.ListDocumentField = data.Data;
                        angular.forEach($scope.ListDocumentField, function (item) {
                            item.FormlyContentObj = [];
                            try {
                                var obj = FormlyService.DeSerializeJSON(item.FormlyContent);
                                item.FormlyContentObj.push(obj);
                            } catch (e) { console.log(e); }
                        });
                    }
                }).error(function (response) {
                    $log.debug(response);
                });
                return promise;
            }
            //
            $scope.ListRecordField = [];
            var initRecordField = function (id) {
                var promise = ArchiveTypeService.GetFieldByArchiveTypeId(id, 0);

                promise.success(function (data) {
                    $log.debug(data)
                    if (data.Status != null) {
                        $scope.ListRecordField = data.Data;

                        angular.forEach($scope.ListRecordField, function (item) {
                            item.FormlyContentObj = [];
                            try {
                                var obj = FormlyService.DeSerializeJSON(item.FormlyContent);
                                item.FormlyContentObj.push(obj);
                            } catch (e) { console.log(e); }
                        });
                    }
                }).error(function (response) {
                    $log.debug(response);
                });
                return promise;
            }

            var initFormMode = function () {
                $scope.Item = {};
                if (option.Mode === "add") {
                    $scope.Item = {};
                    $scope.Item.Status = 1;
                } else {
                    try { 
                        $scope.Item = angular.copy(item);
                        initDocumentField(item.ArchiveTypeId);
                        initRecordField(item.ArchiveTypeId);
                    } catch (e) {

                    }
                }
                console.log($scope.Item);
            }

            initFormMode();
            initField();
            initRecordCommonField();
            initDocumentCommonField();

            $scope.Document = {};

            $scope.Document.PreviewSheme = [];
            $scope.Document.ChageMode = function (mode) {
                $scope.Document.Mode = mode;
                //build
                delete $scope.Document.PreviewSheme;
                if (mode == 2) {
                    $scope.Document.PreviewSheme = [];
                    angular.forEach($scope.ListDocumentField, function (field) {
                        $scope.Document.PreviewSheme.push(field.FormlyContentObj[0]);
                    });
                }
            };

            $scope.Document.AddCommonField = function () {
                for (var i = 0; i < $scope.ListDocumentCommonField.length; i++) {
                    var field = $scope.ListDocumentCommonField[i];
                    var check = false;
                    for (var j = 0; j < $scope.ListDocumentField.length; j++) {
                        if ($scope.ListDocumentField[j].FieldId === field.FieldId) {
                            check = true;
                        }
                    }
                    if (check) continue;

                    field.DisplayCategory = true;
                    field.DisplaySearchCategory = true;
                    field.DisplayReport = true;
                    field.DisplaySearchReport = true;
                    $scope.ListDocumentField.push(field);
                } 
            }; 
            $scope.Document.AddField = function () {
                var modalInstance;
                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: addFieldUrl,
                    controller: 'FieldItemCtrl',
                    size: 'lg',
                    //windowClass: "modal-full",
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

                modalInstance.result.then(function (field) {
                    try {
                        field.FormlyContentObj = [];
                        var obj = FormlyService.DeSerializeJSON(field.FormlyContent);
                        field.FormlyContentObj.push(obj);
                    } catch (e) { console.log(e); }

                    field.DisplayCategory = true;
                    field.DisplaySearchCategory = true;
                    field.DisplayReport = true;
                    field.DisplaySearchReport = true;
                    $scope.ListDocumentField.push(field);
                }, function (response) { });
            };
            $scope.Document.SelectField = function () {
                var modalInstance;
                modalInstance = $uibModal.open({
                    //animation: true,
                    templateUrl: selectFieldUrl,
                    controller: 'FieldSelectCtrl',
                    size: 'lg', 
                    windowClass: "modal-full",
                    backdrop: 'static',
                    // Set parameter to chidform (popup form)
                    resolve: {
                       
                    }
                });

                modalInstance.result.then(function (response) {
                   
                    for (var i = 0; i < response.length; i++) {
                        var field = response[i];
                        var check = false;
                        for (var j = 0; j < $scope.ListDocumentField.length; j++) {
                            if ($scope.ListDocumentField[j].FieldId === field.FieldId) {
                                check= true;
                            }
                        }
                        if (check) continue;

                        field.DisplayCategory = true;
                        field.DisplaySearchCategory = true;
                        field.DisplayReport = true;
                        field.DisplaySearchReport = true;
                        $scope.ListDocumentField.push(field); 
                    }


                }, function (response) { });
            }; 
            $scope.Document.Delete = function (file) {
                var index = $scope.ListDocumentField.indexOf(file);
                if (index >= 0) {
                    $scope.ListDocumentField.splice(index, 1);
                }
            };
            //Đổi vị trí dòng
            $scope.Document.RowSelecting = null;
            $scope.Document.CheckSwapRow = function (compoment) {
                if ($scope.ListDocumentField.length <= 1) {
                    return "hidden";
                }
                if (compoment === $scope.Document.RowSelecting) {
                    return "btn-danger";
                } else {
                    if ($scope.Document.RowSelecting === null) {
                        return "";
                    } else {
                        return "btn-primary";
                    }
                }
            };
            $scope.Document.SwapRow = function (compoment) {

                if ($scope.Document.RowSelecting === null) {
                    $scope.Document.RowSelecting = compoment;

                } else {
                    if (compoment === $scope.Document.RowSelecting) {
                        $scope.Document.RowSelecting = null;
                    } else {
                        var indexA = $scope.ListDocumentField.indexOf(compoment);
                        var indexB = $scope.ListDocumentField.indexOf($scope.Document.RowSelecting);

                        var temp = $scope.ListDocumentField[indexA];
                        $scope.ListDocumentField[indexA] = $scope.ListDocumentField[indexB];
                        $scope.ListDocumentField[indexB] = temp;
                        $scope.Document.RowSelecting = null;

                        var item = angular.copy($scope.ListDocumentField);
                        delete $scope.ListDocumentField;
                        $scope.ListDocumentField = item;
                    }
                }

            };



            $scope.Record = {};
            $scope.Record.PreviewSheme = [];
            $scope.Record.ChageMode = function (mode) {
                debugger
                $scope.Record.Mode = mode;
                //build
                delete $scope.Record.PreviewSheme;
                if (mode == 2) {
                    $scope.Record.PreviewSheme = [];
                    angular.forEach($scope.ListRecordField, function (field) {
                        $scope.Record.PreviewSheme.push(angular.copy(field.FormlyContentObj[0]));
                    });
                }
            };
            $scope.Record.AddCommonField = function () {
                for (var i = 0; i < $scope.ListRecordCommonField.length; i++) {
                    var field = $scope.ListRecordCommonField[i];
                    var check = false;
                    for (var j = 0; j < $scope.ListRecordField.length; j++) {
                        if ($scope.ListRecordField[j].FieldId === field.FieldId) {
                            check = true;
                        }
                    }
                    if (check) continue;

                    field.DisplayCategory = true;
                    field.DisplaySearchCategory = true;
                    field.DisplayReport = true;
                    field.DisplaySearchReport = true;
                    $scope.ListRecordField.push(field);
                } 
            };
            $scope.Record.AddField = function () {
                var modalInstance;
                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: addFieldUrl,
                    controller: 'FieldItemCtrl',
                    size: 'lg',
                    //windowClass: "modal-full",
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

                modalInstance.result.then(function (field) {
                    try {
                        field.FormlyContentObj = [];
                        var obj = FormlyService.DeSerializeJSON(field.FormlyContent);
                        field.FormlyContentObj.push(obj);
                    } catch (e) { console.log(e); }
                    field.DisplayCategory = true;
                    field.DisplaySearchCategory = true;
                    field.DisplayReport = true;
                    field.DisplaySearchReport = true;
                    $scope.ListRecordField.push(field);
                }, function (response) { });
            };
            $scope.Record.SelectField = function () {
                var modalInstance;
                modalInstance = $uibModal.open({
                    //animation: true,
                    templateUrl: selectFieldUrl,
                    controller: 'FieldSelectCtrl',
                    size: 'lg',
                    windowClass: "modal-full",
                    backdrop: 'static',
                    // Set parameter to chidform (popup form)
                    resolve: {

                    }
                });

                modalInstance.result.then(function (response) {

                    for (var i = 0; i < response.length; i++) {
                        var field = response[i];
                        var check = false;
                        for (var j = 0; j < $scope.ListRecordField.length; j++) {
                            if ($scope.ListRecordField[j].FieldId === field.FieldId) {
                                check = true;
                            }
                        }
                        if (check) continue;
                        field.DisplayCategory = true;
                        field.DisplaySearchCategory = true;
                        field.DisplayReport = true;
                        field.DisplaySearchReport = true;
                        $scope.ListRecordField.push(field);
                    }


                }, function (response) { });
            };
            $scope.Record.Delete = function (file) {
                var index = $scope.ListRecordField.indexOf(file);
                if (index >= 0) {
                    $scope.ListRecordField.splice(index, 1);
                }
            };
            //Đổi vị trí dòng
            $scope.Record.RowSelecting = null;
            $scope.Record.CheckSwapRow = function (compoment) {
                if ($scope.ListRecordField.length <= 1) {
                    return "hidden";
                }
                if (compoment === $scope.Record.RowSelecting) {
                    return "btn-danger";
                } else {
                    if ($scope.Record.RowSelecting === null) {
                        return "";
                    } else {
                        return "btn-primary";
                    }
                }
            };
            $scope.Record.SwapRow = function (compoment) {

                if ($scope.Record.RowSelecting === null) {
                    $scope.Record.RowSelecting = compoment;

                } else {
                    if (compoment === $scope.Record.RowSelecting) {
                        $scope.Record.RowSelecting = null;
                    } else {
                        var indexA = $scope.ListRecordField.indexOf(compoment);
                        var indexB = $scope.ListRecordField.indexOf($scope.Record.RowSelecting);

                        var temp = $scope.ListRecordField[indexA];
                        $scope.ListRecordField[indexA] = $scope.ListRecordField[indexB];
                        $scope.ListRecordField[indexB] = temp;
                        $scope.Record.RowSelecting = null;

                        var item = angular.copy($scope.ListRecordField);
                        delete $scope.ListRecordField;
                        $scope.ListRecordField = item;
                    }
                }

            };
            $scope.Save = function () {
                if (option.Mode === "add") {
                    var postData = $scope.Item;
                    postData.ListField = [];
                    for (var i = 0; i < $scope.ListRecordField.length; i++) {
                        var item = $scope.ListRecordField[i];
                        postData.ListField.push({
                            "FieldId": item.FieldId,
                            "Order": 0,
                            "Type": 0,//0|1
                            "DisplayCategory": item.DisplayCategory,
                            "DisplaySearchCategory": item.DisplaySearchCategory,
                            "DisplayReport": item.DisplayReport,
                            "DisplaySearchReport": item.DisplaySearchReport
                        });
                    }
                    for (var i = 0; i < $scope.ListDocumentField.length; i++) {
                        var item = $scope.ListDocumentField[i];
                        postData.ListField.push({
                            "FieldId": item.FieldId,
                            "Order": 0,
                            "Type": 1,//0|1
                            "DisplayCategory": item.DisplayCategory,
                            "DisplaySearchCategory": item.DisplaySearchCategory,
                            "DisplayReport": item.DisplayReport,
                            "DisplaySearchReport": item.DisplaySearchReport
                        });
                    }
                   
                    var promise = ArchiveTypeService.Create(postData);
                    promise.success(function (data) {
                        $log.debug(data)
                        if (data.Status === 1) {
                            $scope.success("tạo archivetype thành công!");
                            $uibModalInstance.close(data.Data);
                        } else {
                            $scope.error("tạo archivetype thất bại!");
                        }
                    })
                           .error(function (response) {
                               $log.debug(response);
                               $scope.error("tạo archivetype thất bại!");
                           });
                } else {
                    var putData = {};
                    var putData = $scope.Item;
                    putData.ListField = [];
                    for (var i = 0; i < $scope.ListRecordField.length; i++) {
                        var item = $scope.ListRecordField[i];
                        putData.ListField.push({
                            "FieldId": item.FieldId,
                            "Order": 0,
                            "Type": 0,//0|1
                            "DisplayCategory": item.DisplayCategory,
                            "DisplaySearchCategory": item.DisplaySearchCategory,
                            "DisplayReport": item.DisplayReport,
                            "DisplaySearchReport": item.DisplaySearchReport
                        });
                    }
                    for (var i = 0; i < $scope.ListDocumentField.length; i++) {
                        var item = $scope.ListDocumentField[i];
                        putData.ListField.push({
                            "FieldId": item.FieldId,
                            "Order": 0,
                            "Type": 1,//0|1
                            "DisplayCategory": item.DisplayCategory,
                            "DisplaySearchCategory": item.DisplaySearchCategory,
                            "DisplayReport": item.DisplayReport,
                            "DisplaySearchReport": item.DisplaySearchReport
                        });
                    }
                    var promise = ArchiveTypeService.Update($scope.Item.ArchiveTypeId, putData);
                    promise.success(function (data) {
                        $log.debug(data)
                        if (data.Status === 1) {
                            $scope.success("cập nhật archivetype thành công!");
                            $uibModalInstance.close(data.Data);
                        } else {
                            $scope.error("cập nhật archivetype thất bại!");
                        }
                    })
                           .error(function (response) {
                               $log.debug(response);
                               $scope.error("cập nhật archivetype thất bại!");
                           });
                }
            };
            $scope.Cancel = function () {
                $uibModalInstance.dismiss();
            }; 
            $scope.ChangeName = function () { 
                $scope.Item.Code = constantsAMD.RemoveVietNamSign($scope.Item.Name); 
            };
        }
    ]);
});