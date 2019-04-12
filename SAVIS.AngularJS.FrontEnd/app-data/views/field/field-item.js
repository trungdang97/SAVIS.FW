"use strict";
define(["app",
    //codemirror packages
    "codemirror",
    //add on
    "codemirror/addon/hint/show-hint", "codemirror/addon/hint/html-hint", "codemirror/addon/hint/css-hint", "codemirror/addon/hint/javascript-hint",
    "codemirror/addon/display/fullscreen",
    "codemirror/addon/edit/closetag", "codemirror/addon/edit/matchtags",
    //"codemirror/addon/edit/closebrackets", "codemirror/addon/edit/matchbrackets",
    "codemirror/addon/fold/foldcode", "codemirror/addon/fold/foldgutter", "codemirror/addon/fold/brace-fold", "codemirror/addon/fold/xml-fold", "codemirror/addon/fold/comment-fold", "codemirror/addon/fold/indent-fold",
    "codemirror/addon/dialog/dialog",
    "codemirror/addon/mode/multiplex",
    "codemirror/addon/search/search", "codemirror/addon/search/jump-to-line", "codemirror/addon/search/match-highlighter", "codemirror/addon/search/matchesonscrollbar", "codemirror/addon/search/searchcursor",
    "codemirror/addon/lint/lint", "codemirror/addon/lint/css-lint", "codemirror/addon/lint/javascript-lint", "codemirror/addon/lint/json-lint",
    //mode
    "codemirror/mode/xml/xml", "codemirror/mode/htmlmixed/htmlmixed", "codemirror/mode/css/css", "codemirror/mode/htmlembedded/htmlembedded", "codemirror/mode/clike/clike",
    //keymap
    "codemirror/keymap/sublime",
    //end codemirror packages

    'components/service/amdservice',
    'components/service/apiservice',
    'components/formly-template/formly-factory',
], function (app, CodeMirror) {
    app.controller("FieldItemCtrl", ["$scope", "$log", "$uibModalInstance", "item", "option", "$timeout", 'FormlyFactory', 'FieldService', 'Notifications', 'constantsAMD', 'FormlyService',
        function ($scope, $log, $uibModalInstance, item, option, $timeout, FormlyFactory, FieldService, Notifications, constantsAMD,FormlyService) {
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
            $scope.ListAvailAbleDbType = FormlyFactory.ListAvailAbleDbType;
            $scope.ListAvailAbleControl = FormlyFactory.ListAvailAbleControl;
            $scope.ListAvailAbleClass = FormlyFactory.ListAvailAbleClass;
            
            /*-----------------------------------------------------------*/
            

            $scope.Mode = 1;
            $scope.Item = {};
            $scope.Data = {};
            $scope.PreviewSheme = [];
            $scope.PreviewSheme.push(angular.copy($scope.Item));
            $scope.PreviewData = {};
            var initFormMode = function () {
                $scope.Item = {}; 
                if (option.Mode === "add") {
                    $scope.Item = $scope.ListAvailAbleControl[0].Value;  
                } else {
                    try {
                        $scope.Item = FormlyService.DeSerializeJSON(item.FormlyContent);
                        $scope.Data = {};
                        $scope.Data.Name = item.Name;
                        $scope.Data.Code = item.Code;
                        $scope.Data.Description = item.Description;
                        $scope.Data.IsDocumentCommonField = item.IsDocumentCommonField;
                        $scope.Data.IsRecordCommonField = item.IsRecordCommonField; 
                    } catch (e) {

                    } 
                }
            }



           

            $scope.$watch('Item', function () { 
                $scope.Item.data.columnName = $scope.Item.key;
                $scope.Item.data.required = $scope.Item.templateOptions.required;
                $scope.Item.data.defaultValue = $scope.Item.defaultValue;
                $scope.PreviewSheme = [];
                $scope.PreviewSheme.push(angular.copy($scope.Item));
            }, true);

            initFormMode();

            $scope.ChangeAddonRight = function () {
                if ($scope.Item.templateOptions.addonRight.class == '' || $scope.Item.templateOptions.addonRight.class == null || typeof ($scope.Item.templateOptions.addonRight.class) == "undefined") {
                    delete $scope.Item.templateOptions.addonRight;
                }
            };
            $scope.ChangeAddonLeft = function () {
                if ($scope.Item.templateOptions.addonLeft.class == '' || $scope.Item.templateOptions.addonLeft.class == null || typeof ($scope.Item.templateOptions.addonLeft.class) == "undefined") {
                    delete $scope.Item.templateOptions.addonLeft;
                }
            };

            if ($scope.Item.data.group == "input") {
                var editorCustomValidate;
                $timeout(function () {
                    editorCustomValidate = CodeMirror.fromTextArea(document.getElementById("txtCustomValidate"), {
                        lineNumbers: true,
                        mode: 'text/javascript',
                        viewportMargin: Infinity,
                        lineWrapping: true,
                        keyMap: "sublime",
                        theme: "twilight",
                        foldGutter: true,
                        height: "500px",
                        matchTags: {
                            bothTags: true
                        },
                        autoCloseBrackets: true,
                        autoCloseTags: true,
                        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                        extraKeys: {
                            "Ctrl-J": "toMatchingTag",
                            "Ctrl-Space": "autocomplete",
                            "Alt-F": "findPersistent",
                            "F11": function (cm) {
                                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                            },
                            "Esc": function (cm) {
                                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                            },
                            "Ctrl-Q": function (cm) {
                                cm.foldCode(cm.getCursor());
                            }
                        }
                    });
                    CodeMirror.modeURL = "codemirror/mode/%N/%N";

                    editorCustomValidate.on("change", function (cm, change) {
                        $scope.Item.templateOptions.customValidate = cm.getValue();
                    });
                });
                var editorApiValidateCondition;
                $timeout(function () {
                    editorApiValidateCondition = CodeMirror.fromTextArea(document.getElementById("txtapiValidateCondition"), {
                        lineNumbers: true,
                        mode: 'text/javascript',
                        viewportMargin: Infinity,
                        lineWrapping: true,
                        keyMap: "sublime",
                        theme: "twilight",
                        foldGutter: true,
                        height: "500px",
                        matchTags: {
                            bothTags: true
                        },
                        //autoCloseBrackets: true,
                        autoCloseTags: true,
                        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                        extraKeys: {
                            "Ctrl-J": "toMatchingTag",
                            "Ctrl-Space": "autocomplete",
                            "Alt-F": "findPersistent",
                            "F11": function (cm) {
                                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                            },
                            "Esc": function (cm) {
                                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                            },
                            "Ctrl-Q": function (cm) {
                                cm.foldCode(cm.getCursor());
                            }
                        }
                    });
                    CodeMirror.modeURL = "codemirror/mode/%N/%N";

                    editorApiValidateCondition.on("change", function (cm, change) {
                        $scope.Item.templateOptions.apiValidateCondition = cm.getValue();
                    });
                });
            }

            if ($scope.Item.data.group == "checkbox" || $scope.Item.data.group == "dropdown") {
                $scope.DeleteOptions = function (options) {
                    var index = $scope.Item.templateOptions.options.indexOf(options);
                    if (index >= 0) {
                        $scope.Item.templateOptions.options.splice(index, 1);
                    }
                };
                $scope.AddOptions = function (index) {
                    if (typeof (index) == "undefined") {
                        index = -1;
                    }
                    $scope.Item.templateOptions.options.splice(index + 1, 0, {});
                };
            }

            var editorHideExpression;
            $timeout(function () {
                editorHideExpression = CodeMirror.fromTextArea(document.getElementById("txtHideExpression"), {
                    lineNumbers: true,
                    mode: 'text/javascript',
                    viewportMargin: Infinity,
                    lineWrapping: true,
                    keyMap: "sublime",
                    theme: "twilight",
                    foldGutter: true,
                    height: "500px",
                    matchTags: {
                        bothTags: true
                    },
                    //autoCloseBrackets: true,
                    autoCloseTags: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                    extraKeys: {
                        "Ctrl-J": "toMatchingTag",
                        "Ctrl-Space": "autocomplete",
                        "Alt-F": "findPersistent",
                        "F11": function (cm) {
                            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                        },
                        "Esc": function (cm) {
                            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                        },
                        "Ctrl-Q": function (cm) {
                            cm.foldCode(cm.getCursor());
                        }
                    }
                });
                CodeMirror.modeURL = "codemirror/mode/%N/%N";

                editorHideExpression.on("change", function (cm, change) {
                    $scope.Item.templateOptions.hideExpression = cm.getValue();
                });
            });

            var editorDisabledExpression;
            $timeout(function () {
                editorDisabledExpression = CodeMirror.fromTextArea(document.getElementById("txtDisabledExpression"), {
                    lineNumbers: true,
                    mode: 'text/javascript',
                    viewportMargin: Infinity,
                    lineWrapping: true,
                    keyMap: "sublime",
                    theme: "twilight",
                    foldGutter: true,
                    height: "500px",
                    matchTags: {
                        bothTags: true
                    },
                    //autoCloseBrackets: true,
                    autoCloseTags: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                    extraKeys: {
                        "Ctrl-J": "toMatchingTag",
                        "Ctrl-Space": "autocomplete",
                        "Alt-F": "findPersistent",
                        "F11": function (cm) {
                            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                        },
                        "Esc": function (cm) {
                            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                        },
                        "Ctrl-Q": function (cm) {
                            cm.foldCode(cm.getCursor());
                        }
                    }
                });
                CodeMirror.modeURL = "codemirror/mode/%N/%N";

                editorDisabledExpression.on("change", function (cm, change) {
                    $scope.Item.templateOptions.disabledExpression = cm.getValue();
                });
            }); 
            

            $scope.ChangeControl = function () {
                for (var i = 0; i < $scope.ListAvailAbleControl.length; i++) {
                    var control = $scope.ListAvailAbleControl[i];
                    if (control.Name == $scope.Item.data.key) {
                        var obj = angular.copy(control.Value);
                        if (typeof ($scope.Item.data) === "undefined") {
                            $scope.Item.data = {};
                        }
                        if (typeof ($scope.Item.templateOptions) === "undefined") {
                            $scope.Item.templateOptions = {};
                        }

                        obj.key = $scope.Item.key;


                        obj.data.isSearch = $scope.Item.data.isSearch;
                        obj.data.columnName = $scope.Item.data.columnName;
                        obj.data.dbType = $scope.Item.data.dbType;
                        obj.data.defaultValue = $scope.Item.data.defaultValue;
                        obj.data.isIndex = $scope.Item.data.isIndex;

                        obj.templateOptions.required = $scope.Item.templateOptions.required;
                        obj.templateOptions.disabled = $scope.Item.templateOptions.disabled;
                        obj.templateOptions.label = $scope.Item.templateOptions.label;
                        obj.templateOptions.placeholder = $scope.Item.templateOptions.placeholder;
                        obj.templateOptions.horizontalLabel = $scope.Item.templateOptions.horizontalLabel;
                        obj.templateOptions.labelSize = $scope.Item.templateOptions.labelSize;
                        obj.templateOptions.controlSize = $scope.Item.templateOptions.controlSize;
                        obj.templateOptions.isUseHideExpression = $scope.Item.templateOptions.isUseHideExpression;
                        obj.templateOptions.hideExpression = $scope.Item.templateOptions.hideExpression;
                        obj.templateOptions.isUseDisabledExpression = $scope.Item.templateOptions.isUseDisabledExpression;
                        obj.templateOptions.disabledExpression = $scope.Item.templateOptions.disabledExpression;

                        $scope.Item = obj;
                    }
                }
            };

            $scope.ChangeFileName = function () {
                var randomStr = constantsAMD.NewRandomString(4);
             //   if (typeof ($scope.Data.Code) === "undefined") {
                    $scope.Data.Code = constantsAMD.RemoveVietNamSign($scope.Data.Name);
            //    }

            //    if (typeof ($scope.Item.key) === "undefined") {
                    $scope.Item.key = constantsAMD.RemoveVietNamSign($scope.Data.Name);
            //    }

            //    if (typeof ($scope.Item.templateOptions.label) === "undefined") {
                    $scope.Item.templateOptions.label =$scope.Data.Name;
            //    }
            };

            $scope.Save = function () {
                var sheme = FormlyService.SerializeJSON($scope.Item)
             //   console.log(sheme);
                if (option.Mode === "add") {
                    var postData = {};
                    postData.FormlyContent = sheme;
                    postData.Name = $scope.Data.Name;
                    postData.Code = $scope.Data.Code;
                    postData.Description = $scope.Data.Description;
                    if ($scope.Data.IsDocumentCommonField) { postData.IsDocumentCommonField = true; }
                    if ($scope.Data.IsRecordCommonField) { postData.IsRecordCommonField = true; }
                    var promise = FieldService.Create(postData);
                    promise.success(function (data) {
                        $log.debug(data)
                        if (data.Status === 1) {
                            $scope.success("tạo field thành công!");
                            $uibModalInstance.close(data.Data);
                        } else {
                            $scope.error("tạo field thất bại!");
                        }
                    })
                           .error(function (response) {
                               $log.debug(response);
                               $scope.error("tạo field thất bại!");
                           });
                } else {
                    var putData = {};
                    putData.FormlyContent = sheme;
                    putData.Name = $scope.Data.Name;
                    putData.Code = $scope.Data.Code;
                    putData.Description = $scope.Data.Description;
                    if ($scope.Data.IsDocumentCommonField) { putData.IsDocumentCommonField = true; }
                    if ($scope.Data.IsRecordCommonField) { putData.IsRecordCommonField = true; }
                    var promise = FieldService.Update(item.FieldId, putData);
                    promise.success(function (data) {
                        $log.debug(data)
                        if (data.Status === 1) {
                            $scope.success("cập nhật field thành công!");
                            $uibModalInstance.close(data.Data);
                        } else {
                            $scope.error("cập nhật field thất bại!");
                        }
                    })
                           .error(function (response) {
                               $log.debug(response);
                               $scope.error("cập nhật field thất bại!");
                           });
                }
            };
            $scope.Cancel = function () {
                $uibModalInstance.dismiss();
            };
        }
    ]);
});