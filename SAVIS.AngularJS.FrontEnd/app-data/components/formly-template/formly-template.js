/// <reference path="wraper/table-tr.html" />
/* SAVIS Vietnam Corporation
 *
 * This module is to separate configuration of authentication to app.js
 * NguyenBv - Jan 2017
 */

define(["angularAMD", "jquery", "components/service/amdservice",
    "ngfileupload"
], function(angularAMD, jQuery) {
    "use strict";
    /* Init the auth config, interceptor, and runtime modules */


    var factory = {};


    factory.init = function(app) {
        app.run(function(formlyConfig, formlyValidationMessages) {
            //tạo message validate
            formlyConfig.setWrapper({
                name: "validation",
                templateUrl: "app-data/components/formly-template/wraper/error-message.html"
            });
            formlyConfig.setWrapper({
                name: "loader",
                templateUrl: "app-data/components/formly-template/wraper/loader.html"
            });
            formlyConfig.setWrapper({
                name: "range",
                templateUrl: "app-data/components/formly-template/wraper/range.html"
            });
            formlyConfig.setWrapper({
                name: "color",
                templateUrl: "app-data/components/formly-template/wraper/color.html"
            });
            //horizontal stuff
            formlyConfig.setWrapper({
                name: "horizontalLabel",
                templateUrl: "app-data/components/formly-template/wraper/horizontalLabel.html"
            });

            //layout
            formlyConfig.setWrapper({
                name: "layout",
                templateUrl: "app-data/components/formly-template/wraper/layout.html"
            });
            //layout
            formlyConfig.setWrapper({
                name: "table",
                templateUrl: "app-data/components/formly-template/wraper/table.html"
            });

            //Cấu hình in message lỗi
            formlyValidationMessages.addTemplateOptionValueMessage("minlength", "minlength", "Tối thiểu có :", " ký tự", "");
            formlyValidationMessages.addTemplateOptionValueMessage("maxlength", "maxlength", "Tối đa có :", " ký tự", "");
            formlyValidationMessages.addTemplateOptionValueMessage("min", "min", "Giá trị tối thiểu là :", "", "");
            formlyValidationMessages.addTemplateOptionValueMessage("max", "max", "Giá trị tối đa là :", "", "");


            formlyValidationMessages.messages.required = "\"Trường bắt buộc\"";
        });
        /*Wraper---------------------------------*/
        app.run(function (formlyConfig) { 

            


        });


        /*Control---------------------------------------------------------------------*/
        app.run(function (formlyConfig, $timeout,$http) {
            //reset all control



            //Savis Input
            formlyConfig.setType({
                "name": "savis-input",
                "extends": "input",
                "wrapper": ["bootstrapHasError"],
                "defaultOptions": {
                    "className": "col-md-12",
                    "templateOptions": {
                        "type": "text",
                        "label": "text",
                        "labelSize": "20%",
                        "controlSize":"80%",
                        "required": true,
                        "disabled": false,
                        "placeholder": "Nhập vào text",
                        //Validate stuff-----------------------------------------------------------------------------//
                        "isValidateByApi": false, //lựa chọn validate bằng api
                        "apiValidate": "http://localhost:9800/api/cmsstoryline/$viewValue%", //api sử dụng validate| với $viewValue là dữ liệu ô nhập| option $model.key là giá trị dữ liệu liên quan
                        "apiValidateCondition": "if($response){return true;}else{return false;}", //điều kiện check validate với $response là dữ liệu trả về
                        "apiValidateError": "Error Api Validate", //message thông báo lỗi
                        //Phục vụ validate asyn
                        "loading": false,
                        "onKeydown": function (value, options) {
                            options.validation.show = false;
                        },
                        "onBlur": function (value, options) {
                            options.validation.show = null;
                        },
                        //Parttern
                        "isValidateByParttern": false, //lựa chọn validate bằng Parttern
                        "partternValidate": "", //chuỗi Partern vd /validate/
                        "partternValidateError": "Error Parttern Validate", //message thông báo lỗi
                        //Custom Validate
                        "isValidateByCustom": false, //lựa chọn validate custom
                        "customValidate": "", //câu điều kiện
                        "customValidateError": "Error Custom Validate", //message báo lỗi
                        //Expresstion stuff---------------------------------------------------------------//

                        //hideExpression
                        "isUseHideExpression": false, //lựa chọn validate custom
                        "hideExpression": "", //câu điều kiện
                        //hideExpression
                        "isUseDisabledExpression": false, //lựa chọn validate custom
                        "disabledExpression": "", //câu điều kiện
                    },

                    "asyncValidators": {
                        "apiValidate": {
                            "expression": function ($viewValue, $modelValue, $scope) {
                                if ($scope.options.templateOptions.isValidateByApi) {

                                    $scope.options.templateOptions.loading = true;

                                    var promise = $http({
                                        method: "GET",
                                        url: $scope.options.templateOptions.apiValidate.replace("$viewValue%", $viewValue),
                                    });
                                    return promise.then(function (response) {
                                        var customFunction = Function("$response", "$viewValue", "$modelValue", "$scope",
                                            $scope.options.templateOptions.apiValidateCondition);
                                        var result = customFunction(response, $viewValue, $viewValue, $scope);
                                        if (!result) {
                                            throw new Error("SU go here");
                                        }
                                    });
                                } else {
                                    return $timeout(function () { });
                                }
                            },
                            "message": "to.apiValidateError",
                        },

                    },
                    "validators": {
                        "partternValidate": {
                            "expression": function ($viewValue, $modelValue, $scope) {
                                if ($scope.options.templateOptions.isValidateByParttern) {
                                    var value = $modelValue || $viewValue;
                                    var patt = new RegExp($scope.options.templateOptions.partternValidate);
                                    return patt.test(value);
                                } else {
                                    return true;
                                }

                            },
                            "message": "to.partternValidateError",
                        },
                        "customValidate": {
                            "expression": function ($viewValue, $modelValue, $scope) {
                                if ($scope.options.templateOptions.isValidateByCustom) {
                                    var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.customValidate);
                                    return customFunction($viewValue, $viewValue, $scope);
                                } else {
                                    return true;
                                }
                            },
                            "message": "to.customValidateError",
                        }
                    },
                    "modelOptions": {
                        "updateOn": "blur"
                    },
                    "expressionProperties": {
                        "templateOptions.disabled": function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseDisabledExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.disabledExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                        "hide": function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseHideExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.hideExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                    },


                },
                "controller": ["$scope", "$timeout", function ($scope, $timeout) {
                    if (!Array.isArray($scope.options.wrapper)) {
                        $scope.options.wrapper = [];
                    }
                    if ($scope.options.templateOptions.horizontalLabel) {
                        $scope.options.wrapper.push("horizontalLabel");
                    } else {
                        $scope.options.wrapper.push("bootstrapLabel");
                    }
                    if ($scope.options.templateOptions.type == "date") {
                        $timeout(function () { 
                            $scope.model[$scope.options.key] = new Date($scope.model[$scope.options.key]);
                        });

                    }


                }] 
            });
            //Savis textarea
            formlyConfig.setType({
                "name": "savis-textarea",
                "extends": "textarea",
                "wrapper": ["bootstrapHasError"],
                "defaultOptions": {
                    "className": "col-md-12",
                    "templateOptions": {
                        "type": "text",
                        "label": "text",
                        "labelSize": "20%",
                        "controlSize": "80%",
                        "placeholder": "",
                        "label": "",
                        "line": 5,
                        //hideExpression
                        "isUseHideExpression": false, //lựa chọn validate custom
                        "hideExpression": "", //câu điều kiện
                        //hideExpression
                        "isUseDisabledExpression": false, //lựa chọn validate custom
                        "disabledExpression": "", //câu điều kiện
                    },
                    "expressionProperties": {
                        'templateOptions.disabled': function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseDisabledExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.disabledExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                        'hide': function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseHideExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.hideExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                    },
                    "controller": ["$scope", "$timeout", function ($scope, $timeout) {
                        if (!Array.isArray($scope.options.wrapper)) {
                            $scope.options.wrapper = [];
                        }
                        if ($scope.options.templateOptions.horizontalLabel) {
                            $scope.options.wrapper.push("horizontalLabel");
                        } else {
                            $scope.options.wrapper.push("bootstrapLabel");
                        }
                    }]
                }

            });
            //ck-editer
            formlyConfig.setType({
                "name": "ckeditor",
                "extends": "savis-textarea",
                "template": "<textarea id=\"{{::id}}\" name=\"{{::id}}\" ckeditor ng-model=\"model[options.key]\"></textarea>",
            });
            //Savis dropdown
            formlyConfig.setType({
                "name": "savis-dropdown",
                "extends": "select",
                "wrapper": ["bootstrapHasError"],
                "defaultOptions": {
                    "className": "col-md-12",
                    "templateOptions": {  
                        "labelSize": "20%",
                        "controlSize": "80%",
                        "required": true,
                        "addNullOption": true,
                        "disabled": false,
                        "placeholder": "Nhập vào text",
                        "label": "select",
                        "valueProp": "name",
                        "labelProp": "name",
                        "groupProp": "", 
                        "options": [{
                            value: 1,
                            name: "Option1"
                        }, {
                            value: 2,
                            name: "Option2"
                        }],
                        //Lấy các option từ api
                        "isGetOptionByApi": false,
                        "apiGetOption": "https://jsonplaceholder.typicode.com/comments?postId=$references",
                        "apiResponseData": '$response',
                       
                       
                        //hideExpression
                        "isUseHideExpression": false, 
                        "hideExpression": "",  
                        //hideExpression
                        "isUseDisabledExpression": false, 
                        "disabledExpression": "",  
                    },

                    "expressionProperties": {
                        "templateOptions.disabled": function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseDisabledExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.disabledExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                        "hide": function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseHideExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.hideExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                    },
                },
                "controller": ["$scope", "$timeout", function ($scope, $timeout) {
                    if (!Array.isArray($scope.options.wrapper)) {
                        $scope.options.wrapper = [];
                    }
                    if ($scope.options.templateOptions.horizontalLabel) {
                        $scope.options.wrapper.push("horizontalLabel");
                    } else {
                        $scope.options.wrapper.push("bootstrapLabel");
                    }
                    
                    if ($scope.options.templateOptions.addNullOption) {
                        $timeout(function () {
                            var defaultValue = {};
                            defaultValue[$scope.to.valueProp] = null;
                            defaultValue[$scope.to.labelProp] = "-- " + $scope.to.placeholder + " --";
                            $scope.to.options.unshift(defaultValue);
                        });
                    }
                    //hàm load động dữ liệu
                    var getOptionByApi = function (apiUrl, selectPropResponse) {
                        $scope.to.options = [];
                        var promise = $http({
                            method: 'GET',
                            url: apiUrl,
                        });
                        promise.success(function (response) {
                            $scope.to.options = [];

                            if ($scope.options.templateOptions.addNullOption) {
                                var defaultValue = {};
                                defaultValue[$scope.to.valueProp] = null;
                                defaultValue[$scope.to.labelProp] = "-- " + $scope.to.placeholder + " --";
                                $scope.to.options.unshift(defaultValue);
                            }

                            if (selectPropResponse === "$response") {
                                if (Array.isArray(response)) {
                                    $scope.to.options = response;
                                    if ($scope.options.templateOptions.addNullOption) {
                                        $timeout(function () {
                                            var defaultValue = {};
                                            defaultValue[$scope.to.valueProp] = null;
                                            defaultValue[$scope.to.labelProp] = "-- " + $scope.to.placeholder + " --";
                                            $scope.to.options.unshift(defaultValue);
                                        });
                                    }
                                }
                            } else {
                                var atribute = selectPropResponse.replace("$response.", "");
                                if (Array.isArray(response[atribute])) {
                                    $scope.to.options = response[atribute];
                                    if ($scope.options.templateOptions.addNullOption) {
                                        $timeout(function () {
                                            var defaultValue = {};
                                            defaultValue[$scope.to.valueProp] = null;
                                            defaultValue[$scope.to.labelProp] = "-- " + $scope.to.placeholder + " --";
                                            $scope.to.options.unshift(defaultValue);
                                        });
                                    }
                                }
                            }


                        });
                        return promise;
                    };

                    if ($scope.to.isGetOptionByApi) {
                         
                            //Solution  | watch all :)) but not this 
                            //lấy ra danh sách key
                            var re = /\$([^\%])+\%/g;
                            var s = $scope.to.apiGetOption;
                            var listWatcher = [];
                            var listWatcherModel = [];
                            var m;
                            do {
                                m = re.exec(s);
                                if (m) {
                                    var key = m[0].replace("$", "");
                                    key = key.replace("%", "");
                                    listWatcher.push(key);
                                    listWatcherModel.push("model." + key);
                                }
                            } while (m);

                            //end---lấy ra danh sách key
                            if (listWatcherModel.length > 0) { 
                                var a = angular.toJson(listWatcherModel)
                                a = a.replace(/\"/g, ''); 
                                $scope.$watchCollection(a, function (newValue, oldValue) {
                                    if (newValue !== oldValue) {
                                        var apiUrl = $scope.to.apiGetOption;
                                        if ($scope.model[$scope.options.key] && oldValue) {
                                            $scope.model[$scope.options.key] = '';
                                        }
                                        for (var i = 0; i < listWatcher.length; i++) {
                                            apiUrl = apiUrl.replace("$" + listWatcher[i] + "%", $scope.model[listWatcher[i]]);
                                        }
                                        var selectPropResponse = $scope.to.apiResponseData;
                                        getOptionByApi(apiUrl, selectPropResponse);
                                    }
                                });
                            } else {
                                var apiUrl = $scope.to.apiGetOption;
                                var selectPropResponse = $scope.to.apiResponseData;
                                getOptionByApi(apiUrl, selectPropResponse);
                            }
                        
                    }
                }]
            });
            //savis-uiselect
            formlyConfig.setType({
                "name": "savis-uiselect", 
                "wrapper": ["bootstrapHasError"],
                "defaultOptions": {
                    "className": "col-md-12",
                    "templateOptions": {
                        "labelSize": "20%",
                        "controlSize": "80%",
                        "required": true,
                        "addNullOption": true,
                        "disabled": false,
                        "placeholder": "Nhập vào text",
                        "label": "select",
                        "valueProp": "name",
                        "labelProp": "name",
                        "groupProp": "",
                        "options": [{
                            value: 1,
                            name: "Option1"
                        }, {
                            value: 2,
                            name: "Option2"
                        }],
                        //Lấy các option từ api
                        "isGetOptionByApi": false,
                        "apiGetOption": "https://jsonplaceholder.typicode.com/comments?postId=$references",
                        "apiResponseData": '$response',


                        //hideExpression
                        "isUseHideExpression": false,
                        "hideExpression": "",
                        //hideExpression
                        "isUseDisabledExpression": false,
                        "disabledExpression": "",
                    },

                    "expressionProperties": {
                        "templateOptions.disabled": function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseDisabledExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.disabledExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                        "hide": function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseHideExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.hideExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                    },
                },
                "controller": ["$scope", "$timeout", function ($scope, $timeout) {
                    if (!Array.isArray($scope.options.wrapper)) {
                        $scope.options.wrapper = [];
                    }
                    if ($scope.options.templateOptions.horizontalLabel) {
                        $scope.options.wrapper.push("horizontalLabel");
                    } else {
                        $scope.options.wrapper.push("bootstrapLabel");
                    }

                    if ($scope.options.templateOptions.addNullOption) {
                        $timeout(function () {
                            var defaultValue = {};
                            defaultValue[$scope.to.valueProp] = null;
                            defaultValue[$scope.to.labelProp] = "-- " + $scope.to.placeholder + " --";
                            $scope.to.options.unshift(defaultValue);
                        });
                    }
                    //hàm load động dữ liệu
                    var getOptionByApi = function (apiUrl, selectPropResponse) {
                        $scope.to.options = [];
                        var promise = $http({
                            method: 'GET',
                            url: apiUrl,
                        });
                        promise.success(function (response) {
                            $scope.to.options = [];

                            if ($scope.options.templateOptions.addNullOption) {
                                var defaultValue = {};
                                defaultValue[$scope.to.valueProp] = null;
                                defaultValue[$scope.to.labelProp] = "-- " + $scope.to.placeholder + " --";
                                $scope.to.options.unshift(defaultValue);
                            }

                            if (selectPropResponse === "$response") {
                                if (Array.isArray(response)) {
                                    $scope.to.options = response;
                                    if ($scope.options.templateOptions.addNullOption) {
                                        $timeout(function () {
                                            var defaultValue = {};
                                            defaultValue[$scope.to.valueProp] = null;
                                            defaultValue[$scope.to.labelProp] = "-- " + $scope.to.placeholder + " --";
                                            $scope.to.options.unshift(defaultValue);
                                        });
                                    }
                                }
                            } else {
                                var atribute = selectPropResponse.replace("$response.", "");
                                if (Array.isArray(response[atribute])) {
                                    $scope.to.options = response[atribute];
                                    if ($scope.options.templateOptions.addNullOption) {
                                        $timeout(function () {
                                            var defaultValue = {};
                                            defaultValue[$scope.to.valueProp] = null;
                                            defaultValue[$scope.to.labelProp] = "-- " + $scope.to.placeholder + " --";
                                            $scope.to.options.unshift(defaultValue);
                                        });
                                    }
                                }
                            }


                        });
                        return promise;
                    };

                    if ($scope.to.isGetOptionByApi) {

                        //Solution  | watch all :)) but not this 
                        //lấy ra danh sách key
                        var re = /\$([^\%])+\%/g;
                        var s = $scope.to.apiGetOption;
                        var listWatcher = [];
                        var listWatcherModel = [];
                        var m;
                        do {
                            m = re.exec(s);
                            if (m) {
                                var key = m[0].replace("$", "");
                                key = key.replace("%", "");
                                listWatcher.push(key);
                                listWatcherModel.push("model." + key);
                            }
                        } while (m);

                        //end---lấy ra danh sách key
                        if (listWatcherModel.length > 0) {
                            var a = angular.toJson(listWatcherModel)
                            a = a.replace(/\"/g, '');
                            $scope.$watchCollection(a, function (newValue, oldValue) {
                                if (newValue !== oldValue) {
                                    var apiUrl = $scope.to.apiGetOption;
                                    if ($scope.model[$scope.options.key] && oldValue) {
                                        $scope.model[$scope.options.key] = '';
                                    }
                                    for (var i = 0; i < listWatcher.length; i++) {
                                        apiUrl = apiUrl.replace("$" + listWatcher[i] + "%", $scope.model[listWatcher[i]]);
                                    }
                                    var selectPropResponse = $scope.to.apiResponseData;
                                    getOptionByApi(apiUrl, selectPropResponse);
                                }
                            });
                        } else {
                            var apiUrl = $scope.to.apiGetOption;
                            var selectPropResponse = $scope.to.apiResponseData;
                            getOptionByApi(apiUrl, selectPropResponse);
                        }

                    }
                }]
            });
            //ui-select
            formlyConfig.setType({
                "name": "ui-select",
                "extends": "savis-uiselect",
                "templateUrl": "app-data/components/formly-template/control/ui-select.html",
                "wrapper": ["bootstrapHasError"],
                "defaultOptions": {
                    "templateOptions": {

                        "addNullOption": true,

                    },
                },
            });
            //ui-select-multiple
            formlyConfig.setType({
                "name": "ui-select-multiple",
                "extends": "savis-uiselect",
                "templateUrl": "app-data/components/formly-template/control/ui-select-multiple.html",
                "wrapper": ["bootstrapHasError"],
                "defaultOptions": {
                    "templateOptions": {
                        "addNullOption": false,
                    }
                },
            });
            //Savis radioBtn
            formlyConfig.setType({
                "name": "savis-radioBtn",
                "extends": "radio",
                "wrapper": ["bootstrapHasError"],
                "defaultOptions": {
                    "className": "col-md-12",
                    "templateOptions": {
                        "labelSize": "20%",
                        "controlSize": "80%",
                        "required": true, 
                        "disabled": false,
                        "placeholder": "Nhập vào text",
                        "label": "select",
                        "valueProp": "name",
                        "labelProp": "name", 
                        "options": [{
                            value: 1,
                            name: "Option1"
                        }, {
                            value: 2,
                            name: "Option2"
                        }],
                        //Lấy các option từ api
                        "isGetOptionByApi": false,
                        "apiGetOption": "https://jsonplaceholder.typicode.com/comments?postId=$references",
                        "apiResponseData": '$response',


                        //hideExpression
                        "isUseHideExpression": false,
                        "hideExpression": "",
                        //hideExpression
                        "isUseDisabledExpression": false,
                        "disabledExpression": "",
                    },

                    "expressionProperties": {
                        "templateOptions.disabled": function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseDisabledExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.disabledExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                        "hide": function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseHideExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.hideExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                    },
                },
                "controller": ["$scope", "$timeout", function ($scope, $timeout) {
                    if (!Array.isArray($scope.options.wrapper)) {
                        $scope.options.wrapper = [];
                    }
                    if ($scope.options.templateOptions.horizontalLabel) {
                        $scope.options.wrapper.push("horizontalLabel");
                    } else {
                        $scope.options.wrapper.push("bootstrapLabel");
                    } 

                    //hàm load động dữ liệu
                    var getOptionByApi = function (apiUrl, selectPropResponse) {
                        $scope.to.options = [];
                        var promise = $http({
                            method: 'GET',
                            url: apiUrl,
                        });
                        promise.success(function (response) {
                            $scope.to.options = [];
                             

                            if (selectPropResponse === "$response") {
                                if (Array.isArray(response)) {
                                    $scope.to.options = response;
                                }
                            } else {
                                var atribute = selectPropResponse.replace("$response.", "");
                                if (Array.isArray(response[atribute])) {
                                    $scope.to.options = response[atribute];
                                }
                            }
                        });
                        return promise;
                    };

                    if ($scope.to.isGetOptionByApi) {

                        //Solution  | watch all :)) but not this 
                        //lấy ra danh sách key
                        var re = /\$([^\%])+\%/g;
                        var s = $scope.to.apiGetOption;
                        var listWatcher = [];
                        var listWatcherModel = [];
                        var m;
                        do {
                            m = re.exec(s);
                            if (m) {
                                var key = m[0].replace("$", "");
                                key = key.replace("%", "");
                                listWatcher.push(key);
                                listWatcherModel.push("model." + key);
                            }
                        } while (m);

                        //end---lấy ra danh sách key
                        if (listWatcherModel.length > 0) {
                            var a = angular.toJson(listWatcherModel)
                            a = a.replace(/\"/g, '');
                            $scope.$watchCollection(a, function (newValue, oldValue) {
                                if (newValue !== oldValue) {
                                    var apiUrl = $scope.to.apiGetOption;
                                    if ($scope.model[$scope.options.key] && oldValue) {
                                        $scope.model[$scope.options.key] = '';
                                    }
                                    for (var i = 0; i < listWatcher.length; i++) {
                                        apiUrl = apiUrl.replace("$" + listWatcher[i] + "%", $scope.model[listWatcher[i]]);
                                    }
                                    var selectPropResponse = $scope.to.apiResponseData;
                                    getOptionByApi(apiUrl, selectPropResponse);
                                }
                            });
                        } else {
                            var apiUrl = $scope.to.apiGetOption;
                            var selectPropResponse = $scope.to.apiResponseData;
                            getOptionByApi(apiUrl, selectPropResponse);
                        }

                    }
                }]
            });


            //Savis checkbox-multi
            formlyConfig.setType({
                "name": "savis-checkboxMulti",
                "extends": "multiCheckbox",
                "wrapper": ["bootstrapHasError"],
                "defaultOptions": {
                    "className": "col-md-12",
                    "templateOptions": {
                        "labelSize": "20%",
                        "controlSize": "80%",
                        "required": true, 
                        "disabled": false,
                        "placeholder": "Nhập vào text",
                        "label": "select",
                        "valueProp": "name",
                        "labelProp": "name",
                        "options": [{
                            value: 1,
                            name: "Option1"
                        }, {
                            value: 2,
                            name: "Option2"
                        }],
                        //Lấy các option từ api
                        "isGetOptionByApi": false,
                        "apiGetOption": "https://jsonplaceholder.typicode.com/comments?postId=$references",
                        "apiResponseData": '$response',


                        //hideExpression
                        "isUseHideExpression": false,
                        "hideExpression": "",
                        //hideExpression
                        "isUseDisabledExpression": false,
                        "disabledExpression": "",
                    },

                    "expressionProperties": {
                        "templateOptions.disabled": function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseDisabledExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.disabledExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                        "hide": function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseHideExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.hideExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                    },
                },
                "controller": ["$scope", "$timeout", function ($scope, $timeout) {
                    if (!Array.isArray($scope.options.wrapper)) {
                        $scope.options.wrapper = [];
                    }
                    if ($scope.options.templateOptions.horizontalLabel) {
                        $scope.options.wrapper.push("horizontalLabel");
                    } else {
                        $scope.options.wrapper.push("bootstrapLabel");
                    } 

                    //hàm load động dữ liệu
                    var getOptionByApi = function (apiUrl, selectPropResponse) {
                        $scope.to.options = [];
                        var promise = $http({
                            method: 'GET',
                            url: apiUrl,
                        });
                        promise.success(function (response) {
                            $scope.to.options = [];
                             

                            if (selectPropResponse === "$response") {
                                if (Array.isArray(response)) {
                                    $scope.to.options = response;
                                }
                            } else {
                                var atribute = selectPropResponse.replace("$response.", "");
                                if (Array.isArray(response[atribute])) {
                                    $scope.to.options = response[atribute];
                                }
                            }
                        });
                        return promise;
                    };

                    if ($scope.to.isGetOptionByApi) {

                        //Solution  | watch all :)) but not this 
                        //lấy ra danh sách key
                        var re = /\$([^\%])+\%/g;
                        var s = $scope.to.apiGetOption;
                        var listWatcher = [];
                        var listWatcherModel = [];
                        var m;
                        do {
                            m = re.exec(s);
                            if (m) {
                                var key = m[0].replace("$", "");
                                key = key.replace("%", "");
                                listWatcher.push(key);
                                listWatcherModel.push("model." + key);
                            }
                        } while (m);

                        //end---lấy ra danh sách key
                        if (listWatcherModel.length > 0) {
                            var a = angular.toJson(listWatcherModel)
                            a = a.replace(/\"/g, '');
                            $scope.$watchCollection(a, function (newValue, oldValue) {
                                if (newValue !== oldValue) {
                                    var apiUrl = $scope.to.apiGetOption;
                                    if ($scope.model[$scope.options.key] && oldValue) {
                                        $scope.model[$scope.options.key] = '';
                                    }
                                    for (var i = 0; i < listWatcher.length; i++) {
                                        apiUrl = apiUrl.replace("$" + listWatcher[i] + "%", $scope.model[listWatcher[i]]);
                                    }
                                    var selectPropResponse = $scope.to.apiResponseData;
                                    getOptionByApi(apiUrl, selectPropResponse);
                                }
                            });
                        } else {
                            var apiUrl = $scope.to.apiGetOption;
                            var selectPropResponse = $scope.to.apiResponseData;
                            getOptionByApi(apiUrl, selectPropResponse);
                        }

                    }
                }]
            });
            //Savis checkbox
            formlyConfig.setType({
                "name": "savis-checkbox",
                "extends": "checkbox",
                "wrapper": ["bootstrapHasError"],
                "defaultOptions": {
                    "className": "col-md-12",
                    "templateOptions": {
                        "labelSize": "30%",
                        "controlSize": "70%",
                        "required": true,

                    },
                    "expressionProperties": {
                        "templateOptions.disabled": function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseDisabledExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.disabledExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                        "hide": function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseHideExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.hideExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                    },
                }
            });
            //uploadsingle
            formlyConfig.setType({
                "name": "savis-upload",
                "templateUrl": "app-data/components/formly-template/control/upload.html",
                "wrapper": ["bootstrapLabel", "bootstrapHasError"],
                "defaultOptions": {
                    "templateOptions": {
                        "apiUrl": "",
                        "returnProp": "data",
                        "optionalData": "",
                        "accept": "image/*,audio/*",
                        "maxsize": "2GB",
                        "uploadText": "Tải file lên",
                        "labelSize": "20%",
                        "controlSize": "80%",
                    },
                    "expressionProperties": {
                        'templateOptions.disabled': function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseDisabledExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.disabledExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                        'hide': function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseHideExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.hideExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                    },


                },
                "controller": ["$scope", "$timeout", "Upload", function ($scope, $timeout, Upload) {
                    if (!Array.isArray($scope.options.wrapper)) {
                        $scope.options.wrapper = [];
                    }
                    if ($scope.options.templateOptions.horizontalLabel) {
                        $scope.options.wrapper.push("horizontalLabel");
                    } else {
                        $scope.options.wrapper.push("bootstrapLabel");
                    }

                    $scope.upload = {};
                    $scope.upload.UploadControl = {};
                    $scope.upload.UploadFiles = function(files, errFiles) {

                        $scope.data = {
                            file: "",
                            sectionName: "",
                        };

                        $scope.upload.UploadControl.files = files;
                        $scope.upload.UploadControl.errFiles = errFiles;
                        angular.forEach(files, function(fileitem) {
                            fileitem.IsUpLoadDone = false;
                            $scope.data.file = fileitem;
                            var apiUrl = $scope.to.apiUrl;
                            console.log("apiUrl", apiUrl);
                            fileitem.upload = Upload.upload({
                                url: apiUrl,
                                data: $scope.data
                            });

                            fileitem.upload.then(function(response) {
                                $timeout(function() {
                                    console.log("response", response);
                                    $scope.model[$scope.options.key] = response[$scope.to.returnProp];
                                    fileitem.IsUpLoadDone = true;
                                });
                            }, function(response) {
                                if (response.status > 0) {

                                    fileitem.IsUpLoadDone = true;
                                    $scope.upload.UploadControl.errFiles.push(fileitem);
                                }
                            }, function(evt) {
                                fileitem.progress = parseInt(100.0 * evt.loaded / evt.total);
                            });
                        });
                    }
                }]


            });
            //uploadmulti
            formlyConfig.setType({
                "name": "savis-uploadmulti",
                "templateUrl": "app-data/components/formly-template/control/upload-multi.html",
                "wrapper": ["bootstrapLabel", "bootstrapHasError"],
                "defaultOptions": {
                    templateOptions: {
                        apiUrl: "",
                        returnProp: "data",
                        accept: "image/*,audio/*",
                        maxsize: "2GB",
                        uploadText: "Tải file lên",
                    },
                    "expressionProperties": {
                        'templateOptions.disabled': function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseDisabledExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.disabledExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                        'hide': function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseHideExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.hideExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                    },


                },
                "controller": ["$scope", "$timeout", "Upload", function ($scope, $timeout, Upload) {
                    $scope.upload = {};
                    $scope.upload.UploadControl = {};

                    $scope.model[$scope.options.key] = [];

                    $scope.upload.Remove = function (item) {
                        var index = $scope.model[$scope.options.key].indexOf(item);
                        if (index >= 0) {
                            $scope.model[$scope.options.key].splice(index, 1);
                        }
                    }
                    $scope.upload.UploadFiles = function (files, errFiles) {

                        $scope.data = {
                            file: "",
                            sectionName: "",
                        };

                        $scope.upload.UploadControl.files = files;
                        $scope.upload.UploadControl.errFiles = errFiles;
                        angular.forEach(files, function (fileitem) {
                            fileitem.IsUpLoadDone = false;
                            $scope.data = fileitem;
                            var apiUrl = $scope.to.apiUrl;
                            console.log("apiUrl", apiUrl);
                            fileitem.upload = Upload.upload({
                                url: apiUrl,
                                data: $scope.data
                            });

                            fileitem.upload.then(function (response) {
                                $timeout(function () {
                                    console.log("response", response);

                                    $scope.model[$scope.options.key].push(response[$scope.to.returnProp]);
                                    fileitem.IsUpLoadDone = true;
                                });
                            }, function (response) {
                                if (response.status > 0) {

                                    fileitem.IsUpLoadDone = true;
                                    $scope.upload.UploadControl.errFiles.push(fileitem);
                                }
                            }, function (evt) {
                                fileitem.progress = parseInt(100.0 * evt.loaded / evt.total);
                            });
                        });
                    }
                }]


            });
            
           
            //toggle
            formlyConfig.setType({
                name: "toggle",
                templateUrl: "app-data/components/formly-template/control/toggle.html",
                wrapper: ["bootstrapLabel", "bootstrapHasError"],
                defaultOptions: {
                    templateOptions: {
                            trueLabel: "ON",
                            flaseLabel: "OFF"
                    },
                    "expressionProperties": {
                        'templateOptions.disabled': function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseDisabledExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.disabledExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                        'hide': function ($viewValue, $modelValue, $scope) {
                            if ($scope.options.templateOptions.isUseHideExpression) {
                                var customFunction = Function("$viewValue", "$modelValue", "$scope", $scope.options.templateOptions.hideExpression);
                                return customFunction($viewValue, $viewValue, $scope);
                            } else {
                                return false;
                            }
                        },
                    },
                },
            });
        });
     
        //DatePicker
        app.run(function(formlyConfig) {

            formlyConfig.setType({
                "name": "datepicker",
                "templateUrl": "app-data/components/formly-template/control/datepicker.html",
               "extends": "savis-input",
                "wrapper": [ ],
                "defaultOptions": {
                    "templateOptions": {
                        "datepickerOptions": {
                            "format": ""
                        }
                    }
                },
                "controller": ["$scope","$timeout", function ($scope, $timeout) {
                    $scope.datepicker = {};
                    $timeout(function () {
                        $scope.model[$scope.options.key] = new Date($scope.model[$scope.options.key]);
                    });

                    $scope.datepicker.opened = false;

                    $scope.datepicker.open = function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.datepicker.opened = !$scope.datepicker.opened;
                    };
                }]
            });
        });
    };

    return factory;
});
