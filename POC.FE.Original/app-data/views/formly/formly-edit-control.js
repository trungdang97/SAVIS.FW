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

    'components/formly-template/formly-factory',
], function(app, CodeMirror) {
    app.controller("FormlyEditControl", ["$scope", "$log", "$uibModalInstance", "item", "option", "$timeout", "FormlyFactory",
        function ($scope, $log, $uibModalInstance, item, option, $timeout, FormlyFactory) {

            $scope.ListAvailAbleDbType = FormlyFactory.ListAvailAbleDbType;
            $scope.ListAvailAbleControl = FormlyFactory.ListAvailAbleControl;
            $scope.ListAvailAbleClass = FormlyFactory.ListAvailAbleClass;

            
            $scope.ListKey = option.listkey;
            var index = $scope.ListKey.indexOf(item.key);
            if (index >= 0) {
                $scope.ListKey.splice(index, 1);
            }


            $scope.Mode=1;
            $scope.Item = angular.copy(item);
            $scope.PreviewSheme = [];
            $scope.PreviewSheme.push(angular.copy($scope.Item));
            $scope.PreviewData = {};

            $scope.$watch('Item', function () {

                $scope.Item.data.columnName = $scope.Item.key;
                $scope.Item.data.required = $scope.Item.templateOptions.required;
                $scope.Item.data.defaultValue = $scope.Item.defaultValue;
                $scope.PreviewSheme = [];
                $scope.PreviewSheme.push(angular.copy($scope.Item));
            }, true);


            $scope.ChangeAddonRight = function() {
                if ($scope.Item.templateOptions.addonRight.class == '' || $scope.Item.templateOptions.addonRight.class == null || typeof($scope.Item.templateOptions.addonRight.class) == "undefined") {
                    delete $scope.Item.templateOptions.addonRight;
                }
            };
            $scope.ChangeAddonLeft = function() {
                if ($scope.Item.templateOptions.addonLeft.class == '' || $scope.Item.templateOptions.addonLeft.class == null || typeof($scope.Item.templateOptions.addonLeft.class) == "undefined") {
                    delete $scope.Item.templateOptions.addonLeft;
                }
            };

            if ($scope.Item.data.group == "input") {
            var editorCustomValidate;
            $timeout(function() {
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
                    //autoCloseBrackets: true,
                    autoCloseTags: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
                    extraKeys: {
                        "Ctrl-J": "toMatchingTag",
                        "Ctrl-Space": "autocomplete",
                        "Alt-F": "findPersistent",
                        "F11": function(cm) {
                            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                        },
                        "Esc": function(cm) {
                            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                        },
                        "Ctrl-Q": function(cm) {
                            cm.foldCode(cm.getCursor());
                        }
                    }
                });
                CodeMirror.modeURL = "codemirror/mode/%N/%N";

                editorCustomValidate.on("change", function(cm, change) {
                    $scope.Item.templateOptions.customValidate = cm.getValue();
                });
            });
            var editorApiValidateCondition;
            $timeout(function() {
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
                        "F11": function(cm) {
                            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                        },
                        "Esc": function(cm) {
                            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                        },
                        "Ctrl-Q": function(cm) {
                            cm.foldCode(cm.getCursor());
                        }
                    }
                });
                CodeMirror.modeURL = "codemirror/mode/%N/%N";

                editorApiValidateCondition.on("change", function(cm, change) {
                    $scope.Item.templateOptions.apiValidateCondition = cm.getValue();
                });
            });
            }

            if ($scope.Item.data.group == "checkbox" || $scope.Item.data.group == "dropdown") {
                $scope.DeleteOptions =function(options){
                    var index = $scope.Item.templateOptions.options.indexOf(options);
                    if(index>=0){
                        $scope.Item.templateOptions.options.splice(index,1);
                    }
                };
                $scope.AddOptions =function(index){
                    if(typeof(index)=="undefined"){
                        index =-1;
                    }
                    $scope.Item.templateOptions.options.splice(index+1, 0, {});
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