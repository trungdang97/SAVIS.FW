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
    app.controller("FormlyEditRow", ["$scope", "$log", "item", "$uibModalInstance", "$timeout","FormlyFactory",
        function ($scope, $log, item, $uibModalInstance, $timeout, FormlyFactory) {
            $scope.ListAvailAbleClass = FormlyFactory.ListAvailAbleClass;
            $scope.Mode=1;
            $scope.Item = angular.copy(item);
            if (typeof ($scope.Item.templateOptions) === "undefined") {
                $scope.Item.templateOptions = {};
            }
            /* Button close Popup Form */
            $scope.Cancel = function() {
                $uibModalInstance.dismiss();
            };
            $scope.Save = function() {
                $uibModalInstance.close($scope.Item);
            };

            var editorStyle;
            $timeout(function () {
                editorStyle = CodeMirror.fromTextArea(document.getElementById("txtStyle"), {
                    lineNumbers: true,
                    mode: 'text/css',
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

                editorStyle.on("change", function (cm, change) {
                    $scope.Item.templateOptions.style = cm.getValue();
                });
            });
        }
    ]);
});