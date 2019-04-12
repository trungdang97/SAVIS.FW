'use strict';
define(['app'], function (app) {
    app.service('FormlyFactory', function () {
        var factory = {};

        // Return factory
        factory.InputTextControl = {
            "data": {
                "type": 0,
                "name": "Input text",
                "key": "InputTextControl",
                "group": "input",

                "isSearch": true,
                "columnName": "",
                "dbType": "nvarchar(256)",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "type": "savis-input",
            "key": "InputTextControl",
            "defaultValue": null,
            "className": "col-md-12",
            "wrapper": ["validation", "loader"],
            "templateOptions": {
                "type": "text",
                "label": "InputTextControl",
                "required": false,
                "disabled": false,
                "placeholder": "Nhập vào text",
                "isValidateByApi": false,
                "apiValidate": "http://localhost:9800/api/cmsstoryline/$viewValue%",
                "apiValidateCondition": "if($response){return true;}else{return false;}",
                "apiValidateError": "Error Api Validate",

                "isValidateByParttern": false,
                "partternValidate": "",
                "partternValidateError": "Error Parttern Validate",

                "isValidateByCustom": false,
                "customValidate": "",
                "customValidateError": "Error Custom Validate",

                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,

                "disabledExpression": "",

                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",
            },
        };

        factory.InputEmailControl = {
            "data": {
                "type": 0,
                "name": "Input email",
                "key": "InputEmailControl",
                "group": "input",

                "isSearch": true,
                "columnName": "",
                "dbType": "nvarchar(256)",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "type": "savis-input",
            "wrapper": ["validation", "loader"],
            "key": "InputEmailControl",
            "defaultValue": null,
            "className": "col-md-12",
            "templateOptions": {
                "type": "text",
                "label": "InputEmailControl",
                "required": false,
                "disabled": false,
                "placeholder": "Nhập vào email",
                "addonRight": {
                    "class": "fa fa-envelope"
                },

                "isValidateByApi": false,
                "apiValidate": "http://localhost:9800/api/cmsstoryline/$viewValue",
                "apiValidateCondition": "if($response){return true;}else{return false;}",
                "apiValidateError": "Error Api Validate",


                "isValidateByParttern": true,
                "partternValidate": "^(([^<>()\\[\\]\\.,;:\\s@\\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@(([^<>()[\\]\\.,;:\\s@\\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\\"]{2,})$",
                "partternValidateError": "Bạn đã nhập sai định dang email",
                "isValidateByCustom": false,
                "customValidate": "",
                "customValidateError": "Error Custom Validate",

                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",

                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",



            }
        };

        factory.InputUrlControl = {
            "data": {
                "type": 0,
                "name": "Input url",
                "key": "InputUrlControl",
                "group": "input",

                "isSearch": true,
                "columnName": "",
                "dbType": "varchar(256)",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "type": "savis-input",
            "wrapper": ["validation", "loader"],
            "key": "InputUrlControl",
            "defaultValue": null,
            "className": "col-md-12",
            "templateOptions": {
                "type": "text",
                "label": "InputUrlControl",
                "required": false,
                "disabled": false,
                "placeholder": "Nhập vào đường dẫn",
                "addonRight": {
                    "class": "fa fa-link"
                },

                "isValidateByApi": false,
                "apiValidate": "http://localhost:9800/api/cmsstoryline/$viewValue",
                "apiValidateCondition": "if($response){return true;}else{return false;}",
                "apiValidateError": "Error Api Validate",

                "isValidateByParttern": true,
                "partternValidate": "^http\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(/\S*)?$",
                "partternValidateError": "Bạn đã nhập sai định dang đường dẫn",

                "isValidateByCustom": false,
                "customValidate": "",
                "customValidateError": "Error Custom Validate",


                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",

                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",




            }
        };

        factory.InputNumberControl = {
            "data": {
                "type": 0,
                "name": "Input number",
                "key": "InputNumberControl",
                "group": "input",


                "isSearch": true,
                "columnName": "",
                "dbType": "int",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "type": "savis-input",
            "wrapper": ["validation", "loader"],
            "key": "InputNumberControl",
            "defaultValue": null,
            "className": "col-md-12",
            "templateOptions": {
                "type": "number",
                "label": "InputNumberControl",
                "required": false,
                "disabled": false,
                "min": 0,
                "max": 100,
                "step": 1,
                "placeholder": "Nhập vào số....",

                "isValidateByParttern": false,
                "partternValidate": "",
                "partternValidateError": "Error Parttern Validate",

                "isValidateByCustom": false,
                "customValidate": "",
                "customValidateError": "Error Custom Validate",



                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",

                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",
            },
            "modelOptions": {
                "updateOn": 'default',
            },
        };

        factory.InputRangeControl = {
            "data": {
                "type": 0,
                "name": "Input range",
                "key": "InputRangeControl",
                "group": "input",

                "isSearch": true,
                "columnName": "",
                "dbType": "int",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "type": "savis-input",
            "wrapper": ["validation", "loader", "range"],
            "key": "range-Input",
            "defaultValue": null,
            "className": "col-md-12",
            "templateOptions": {
                "type": "range",
                "label": "InputRangeControl",
                "required": false,
                "disabled": false,
                "min": 0,
                "max": 100,
                "step": 1,

                "isValidateByParttern": false,
                "partternValidate": "",
                "partternValidateError": "Error Parttern Validate",

                "isValidateByCustom": false,
                "customValidate": "",
                "customValidateError": "Error Custom Validate",

                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",

                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",
            },
            "modelOptions": {
                "updateOn": 'default',
            },
        };

        factory.InputDateControl = {
            "data": {
                "type": 0,
                "name": "Input DatePicker",
                "key": "InputDateControl",
                "group": "input",

                "isSearch": true,
                "columnName": "",
                "dbType": "datetime",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "className": "col-md-12",
            "key": 'datepicker',
            "type": 'datepicker',
            "wrapper": ["validation", "loader"],
            "templateOptions": {
                "label": 'InputDateControl',
                "type": 'text',
                "datepickerPopup": 'dd-MM-yyyy',
                "datepickerOptions": {
                    "format": 'dd-MM-yyyy'
                },

                "isValidateByApi": false,
                "apiValidate": "http://localhost:9800/api/cmsstoryline/$viewValue",
                "apiValidateCondition": "if($response){return true;}else{return false;}",
                "apiValidateError": "Error Api Validate",



                "isValidateByParttern": false,
                "partternValidate": "",
                "partternValidateError": "Error Parttern Validate",

                "isValidateByCustom": false,
                "customValidate": "",
                "customValidateError": "Error Custom Validate",

                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",
                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",
            }
        };

        factory.InputPasswordControl = {
            "data": {
                "type": 0,
                "name": "Input password",
                "key": "InputPasswordControl",
                "group": "input",

                "isSearch": true,
                "columnName": "",
                "dbType": "varchar(256)",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "type": "savis-input",
            "wrapper": ["validation", "loader"],
            "key": "InputPasswordControl",
            "defaultValue": null,
            "className": "col-md-12",
            "templateOptions": {
                "type": "password",
                "label": "InputPasswordControl",
                "required": false,
                "disabled": false,
                "placeholder": "Nhập vào password",

                "isValidateByApi": false,
                "apiValidate": "http://localhost:9800/api/cmsstoryline/$viewValue",
                "apiValidateCondition": "if($response){return true;}else{return false;}",
                "apiValidateError": "Error Api Validate",


                "isValidateByParttern": false,
                "partternValidate": "",
                "partternValidateError": "Error Parttern Validate",

                "isValidateByCustom": false,
                "customValidate": "",
                "customValidateError": "Error Custom Validate",

                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",


                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",
            },
        };

        factory.InputColorControl = {
            "data": {
                "type": 0,
                "name": "Input color",
                "key": "InputColorControl",
                "group": "input",

                "isSearch": true,
                "columnName": "",
                "dbType": "varchar(256)",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "type": "savis-input",
            "wrapper": ["color"],
            "key": "InputColorControl",
            "defaultValue": null,
            "className": "col-md-12",
            "templateOptions": {
                "type": "color",
                "label": "InputColorControl",
                "required": false,
                "disabled": false,

                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",

                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",
            },
            "modelOptions": {
                "updateOn": 'default',
            },

        };


        factory.TextAreaControl = {
            "data": {
                "type": 0,
                "name": "Input textarea",
                "key": "TextAreaControl",

                "isSearch": true,
                "columnName": "",
                "dbType": "nvarchar(max)",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "type": "savis-textarea",
            "wrapper": [],
            "key": "textAreaControl",
            "className": "col-md-12",
            "templateOptions": {
                "placeholder": "TextAreaControl",
                "label": "TextAreaControl",
                "line": 5,
                //hideExpression
                "isUseHideExpression": false, //lựa chọn validate custom
                "hideExpression": "", //câu điều kiện
                //hideExpression
                "isUseDisabledExpression": false, //lựa chọn validate custom
                "disabledExpression": "", //câu điều kiện
                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",
            }
        };

        factory.CkeditorControl = {
            "data": {
                "type": 0,
                "name": "CK-editor",
                "key": "CkeditorControl",

                "isSearch": true,
                "columnName": "",
                "dbType": "nvarchar(max)",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "type": "ckeditor",
            "wrapper": [],
            "key": "ckeditorControl",
            "className": "col-md-12",
            "templateOptions": {
                "placeholder": "Nhập vào textarea",
                "label": "CkeditorControl",
                "line": 5,
                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",

                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",
            }
        };


        factory.SelectControl = {
            "data": {
                "type": 0,
                "name": "UI-Select",
                "key": "SelectControl",
                "group": "dropdown",

                "isSearch": true,
                "columnName": "",
                "dbType": "nvarchar(256)",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "className": "col-md-12",
            "key": 'SelectControl',
            "type": 'ui-select',
            "templateOptions": {
                "label": "SelectControl",
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
                "isGetOptionByApi": false,
                "apiGetOption": 'https://jsonplaceholder.typicode.com/comments?postId=$references',
                "apiResponseData": '$response',

                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",
                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",
            }
        };

        factory.SelectMultiControl = {
            "data": {
                "type": 0,
                "name": "UI-Select-Multiple",
                "key": "SelectMultiControl",
                "group": "dropdown",

                "isSearch": true,
                "columnName": "",
                "dbType": "nvarchar(512)",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "className": "col-md-12",
            "key": 'uiSelectMultiControl',
            "type": 'ui-select-multiple',
            "templateOptions": {
                "label": "SelectMultiControl",
                "valueProp": "name",
                "labelProp": "value",
                "groupProp": "group",

                "options": [{
                    name: 1,
                    value: "Option1"
                }, {
                    name: 2,
                    value: "Option2"
                }],
                "isGetOptionByApi": false,
                "apiGetOption": 'https://jsonplaceholder.typicode.com/comments?postId=$references',
                "apiResponseData": '$response',



                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",
                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",
            }
        };

        factory.RadioButtonControl = {
            "data": {
                "type": 0,
                "name": "Radio Button",
                "key": "RadioButtonControl",
                "group": "checkbox",

                "isSearch": true,
                "columnName": "",
                "dbType": "",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "className": "col-md-12",
            "key": "radio",
            "type": "savis-radioBtn",
            "templateOptions": {
                "label": "RadioButtonControl",
                "valueProp": "name",
                "labelProp": "value",
                "inline": true,
                "options": [{
                    name: 1,
                    value: "Option1"
                }, {
                    name: 2,
                    value: "Option2"
                }],
                "isGetOptionByApi": false,
                "apiGetOption": 'https://jsonplaceholder.typicode.com/comments?postId=$references',
                "apiResponseData": '$response',


                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",
                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",
            }
        };

        factory.CheckboxMultiControl = {
            "data": {
                "type": 0,
                "name": "Checkbox Multi",
                "key": "CheckboxMultiControl",
                "group": "checkbox",

                "isSearch": true,
                "columnName": "",
                "dbType": "nvarchar(256)",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "className": "col-md-12",
            "key": "checkboxMultiControl",
            "type": "savis-checkboxMulti",
            "templateOptions": {
                "label": "CheckboxMultiControl",
                "valueProp": "name",
                "labelProp": "value",
                "inline": true,
                "options": [{
                    name: 1,
                    value: "Option1"
                }, {
                    name: 2,
                    value: "Option2"
                }],
                "isGetOptionByApi": false,
                "apiGetOption": 'https://jsonplaceholder.typicode.com/comments?postId=$references',
                "apiResponseData": '$response',


                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",
                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",
            }
        };

        factory.CheckboxControl = {
            "data": {
                "type": 0,
                "name": "Checkbox",
                "key": "CheckboxControl",
                "group": "checkbox",

                "isSearch": true,
                "columnName": "",
                "dbType": "bit",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "className": "col-md-12",
            "type": "savis-checkbox",
            "key": "checkboxControl",
            "templateOptions": {
                "label": "CheckboxControl",

                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",
                "horizontalLabel": true,
                "labelSize": "30%",
                "controlSize": "70%",
            }
        };

        factory.ToggleControl = {
            "data": {
                "type": 0,
                "name": "Toggle",
                "key": "ToggleControl",

                "isSearch": true,
                "columnName": "",
                "dbType": "bit",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "className": "col-md-12",
            "type": "toggle",
            "key": "toggleControl",
            "templateOptions": {
                "label": "ToggleControl",
                "trueLabel": "ON",
                "falseLabel": "OFF",
                //hideExpression
                "isUseHideExpression": false, //lựa chọn validate custom
                "hideExpression": "", //câu điều kiện
                //hideExpression
                "isUseDisabledExpression": false, //lựa chọn validate custom
                "disabledExpression": "", //câu điều kiện
            }, 
        };

        factory.UploadControl = {
            "data": {
                "type": 0,
                "name": "Upload",
                "key": "UploadControl",
                "group": "upload",

                "isSearch": true,
                "columnName": "",
                "dbType": "",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "className": "col-md-12",
            "type": "savis-upload",
            "key": "upload",
            "templateOptions": {
                "apiUrl": "https://angular-file-upload-cors-srv.appspot.com/upload",
                "returnProp": "data",
                "uploadText": '<i class="fa fa-upload" aria-hidden="true"></i>',
                "accept": "image/*,audio/*",
                "maxsize": "2GB",

                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",
            }
        };

        factory.UploadMultiControl = {
            "data": {
                "type": 0,
                "name": "Upload Multi",
                "key": "UploadMultiControl",
                "group": "upload",

                "isSearch": true,
                "columnName": "",
                "dbType": "",
                "required": false,
                "defaultValue": "",
                "isIndex": true
            },
            "className": "col-md-12",
            "type": "savis-uploadmulti",
            "key": "uploadmulti",
            "templateOptions": {
                "apiUrl": "https://angular-file-upload-cors-srv.appspot.com/upload",
                "returnProp": "data",
                "accept": "image/*,audio/*",
                "maxsize": "2GB",

                "isUseHideExpression": false,
                "hideExpression": "",

                "isUseDisabledExpression": false,
                "disabledExpression": "",
            }
        };


        factory.ListAvailAbleControl = [];
        factory.ListAvailAbleControl.push({ Name: "InputTextControl", "Group": "Input", Value: factory.InputTextControl });
        factory.ListAvailAbleControl.push({ Name: "InputEmailControl", "Group": "Input", Value: factory.InputEmailControl });
        factory.ListAvailAbleControl.push({ Name: "InputUrlControl", "Group": "Input", Value: factory.InputUrlControl });
        factory.ListAvailAbleControl.push({ Name: "InputNumberControl", "Group": "Input", Value: factory.InputNumberControl });
        factory.ListAvailAbleControl.push({ Name: "InputRangeControl", "Group": "Input", Value: factory.InputRangeControl });
        factory.ListAvailAbleControl.push({ Name: "InputDateControl", "Group": "Input", Value: factory.InputDateControl });
        factory.ListAvailAbleControl.push({ Name: "InputPasswordControl", "Group": "Input", Value: factory.InputPasswordControl });
        factory.ListAvailAbleControl.push({ Name: "InputColorControl", "Group": "Input", Value: factory.InputColorControl });
        /*Bind level------------------------------------------------------------*/
        factory.ListAvailAbleControl.push({ Name: "TextAreaControl", "Group": "TextArea", Value: factory.TextAreaControl });
        factory.ListAvailAbleControl.push({ Name: "CkeditorControl", "Group": "TextArea", Value: factory.CkeditorControl });
        /*Bind level------------------------------------------------------------*/
        factory.ListAvailAbleControl.push({ Name: "SelectControl", "Group": "Dropdown", Value: factory.SelectControl });
        factory.ListAvailAbleControl.push({ Name: "SelectMultiControl", "Group": "Dropdown", Value: factory.SelectMultiControl });
        /*Bind level------------------------------------------------------------*/
        factory.ListAvailAbleControl.push({ Name: "RadioButtonControl", "Group": "CheckBox", Value: factory.RadioButtonControl });
        factory.ListAvailAbleControl.push({ Name: "CheckboxMultiControl", "Group": "CheckBox", Value: factory.CheckboxMultiControl });
        factory.ListAvailAbleControl.push({ Name: "CheckboxControl", "Group": "CheckBox", Value: factory.CheckboxControl });
        factory.ListAvailAbleControl.push({ Name: "ToggleControl", "Group": "CheckBox", Value: factory.ToggleControl });
        /*Bind level------------------------------------------------------------*/
        factory.ListAvailAbleControl.push({ Name: "UploadControl", "Group": "Upload", Value: factory.UploadControl });
        factory.ListAvailAbleControl.push({ Name: "UploadMultiControl", "Group": "Upload", Value: factory.UploadMultiControl });
        factory.ListAvailAbleDbType = [
               "int",
               "bit",
               "nvarchar(512)",
               "varchar(512)",
               "datetime",
               "uniqueidentifier"
        ];
        factory.ListAvailAbleClass = [
               "col-md-1",
               "col-md-2",
               "col-md-3",
               "col-md-4",
               "col-md-5",
               "col-md-6",
               "col-md-7",
               "col-md-8",
               "col-md-9",
               "col-md-10",
               "col-md-11",
               "col-md-12",
        ];

		return factory;

    });
    app.service('FormlyService', function () {
        var factory = {};
        factory.NewGuid = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };

        factory.SerializeJSON = function (jsonObj) {
            return JSON.stringify(jsonObj, function (key, value) {
                if (typeof value === "function") {
                    return value.toString();;
                }
                return value;
            }, 4);
        };

        factory.DeSerializeJSON = function (jsonString) {
            return JSON.parse(jsonString, function (key, value) {
                if (value &&
                    typeof value === "string" &&
                    value.substr(0, 8) == "function") {
                    var startBody = value.indexOf('{') + 1;
                    var endBody = value.lastIndexOf('}');
                    var startArgs = value.indexOf('(') + 1;
                    var endArgs = value.indexOf(')');
                    var param = value.substring(startArgs, endArgs);
                    var body = value.substring(startBody, endBody);
                    return eval("(" + value + ")");
                }
                return value;
            });
        };
         
        return factory;

    });
});


