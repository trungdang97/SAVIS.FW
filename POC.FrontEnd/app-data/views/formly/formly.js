define(['jquery', 'app',
    'jquery-ui',
    'slimscroll',
    'components/factory/factory',

    'components/formly-template/formly-factory',

    'angular-sanitize',
    'views/formly/formly-edit-label',
    'views/formly/formly-edit-control',
    'views/formly/formly-edit-row',
], function(jQuery, app) {
    app.controller('FormlyCtrl', ['$scope', '$sce', '$timeout', '$log', '$http', '$uibModal', 'constantsFactory', 'constantsAMD', '$routeParams', 'FormlyFactory', 'FormlyService',
    function ($scope, $sce, $timeout, $log, $http, $uibModal, constantsFactory, constantsAMD, $routeParams, FormlyFactory, FormlyService) {
        /* START Declare variable and constant */

        //declare variable for API
        var api = {
            GetData: constantsFactory.ApiUrl + 'api/formlymaster',
            GetListData: constantsFactory.ApiUrl + 'api/formlymaster/getlist',
            CheckFormCode: constantsFactory.ApiUrl + 'api/formlymaster/checkFormCode',
            UpdateForm: constantsFactory.ApiUrl + 'api/formlymaster/update',
            CreateForm: constantsFactory.ApiUrl + 'api/formlymaster/add',
            DeleteForm : constantsFactory.ApiUrl + "api/formlymaster/delete/"
        };

        //khai báo các template
        var template = {
            editLabelUrl: '/app-data/views/formly/formly-edit-label.html',
            editControlUrl: '/app-data/views/formly/formly-edit-control.html',
            editRowUrl: '/app-data/views/formly/formly-edit-row.html'
        };

        //khai báo các controller
        var controller = {
            editLabelCtr : 'FormlyEditLabel',
            editControlCtr: 'FormlyEditControl',
            editRowCtr:'FormlyEditRow'
        };
        //declare variable for Create Form or Update Form
        $scope.action = {
            add: 'Add', // create form
            edit: 'Edit' // update form
        }
        //variable for form valid
        $scope.FormValid = {
            FormName: true,
            FormCode: true,
            StartDate: true,
            EndDate: true
        };

        //variable check formcode Exist
        $scope.FormExist = {
            FormCode: true,
        };
          
        //init default Action is Create Form
        $scope.ActionName = $scope.action.add;
        $scope.activeClass = '';

        /* END Declare variable and constant */


        /*START common function-----------------------------------------------------------*/ 
        $scope.deliberatelyTrustDangerousSnippet = function(html) {
            return $sce.trustAsHtml(html);
        };
        /*END common function-----------------------------------------------------------*/
        /*START declare variable..........................................................*/
        $scope.IsShowInfo = false;
        var selectingItem = {
            data: {}
        };
        $scope.FormMode = 'config';
        $scope.vm = {};
        $scope.vm.Data = {};
        $scope.vm.Model = [];
        $scope.vm.Scheme = [];
        $scope.component = [];


        /*Định danh level 1------------------------------------------------------------*/
        var label = {
            "data": {
                "child": [{
                    "className": "col-md-12",
                    "data": {
                        "name": "Cộng hòa xã hội chủ nghĩa...",
                        "type": 2
                    },
                    "template": "<p style='text-align: center;'><span><strong style=''>Cộng h&ograve;a x&atilde; hội chủ nghĩa việt nam</strong></span><br /><u><span><span style=''>Độc lập tự do hạnh ph&uacute;c</span></span></u></p>"
                }, {
                    "className": "col-md-12  text-center",
                    "data": {
                        "name": "Custom block text",
                        "type": 2
                    },
                    "template": "Please edit text"
                }],
                "hasChild": true,
                "level": 0,
                "name": "Label",
                "imageSrc": "/assets/image/block-text.svg"
            }
        };
        var control = {
            "data": {
                "child": [],
                "hasChild": true,
                "level": 0,
                "name": "Control",
                "imageSrc": "/assets/image/control.svg"
            }
        };
        /*Định danh level 2------------------------------------------------------------*/
        var input = {
            "data": {
                "child": [],
                "hasChild": true,
                "level": 1,
                "name": "Input",
                "imageSrc": "/assets/image/input.svg"
            }
        };
        var textArea = {
            "data": {
                "child": [],
                "hasChild": true,
                "level": 1,
                "name": "Text-Area",
                "imageSrc": "/assets/image/text-area.svg"
            }
        };
        var dropdown = {
            "data": {
                "child": [],
                "hasChild": true,
                "level": 1,
                "name": "Dropdown",
                "imageSrc": "/assets/image/dropdown.svg"
            }
        };
        var checkbox = {
            "data": {
                "child": [],
                "hasChild": true,
                "level": 1,
                "name": "Checkbox",
                "imageSrc": "/assets/image/radio.svg"
            }
        };
        var upload = {
            "data": {
                "child": [],
                "hasChild": true,
                "level": 1,
                "name": "Upload",
                "imageSrc": "/assets/image/upload.svg"
            }
        };
        var custom = {
            "data": {
                "child": [],
                "hasChild": true,
                "level": 1,
                "name": "Custom",
                "imageSrc": "/assets/image/custom.svg"
            }
        };
       
        /*Bind level------------------------------------------------------------*/
        input.data.child.push(FormlyFactory.InputTextControl);
        input.data.child.push(FormlyFactory.InputEmailControl);
        input.data.child.push(FormlyFactory.InputUrlControl);
        input.data.child.push(FormlyFactory.InputNumberControl);
        input.data.child.push(FormlyFactory.InputRangeControl);
        input.data.child.push(FormlyFactory.InputDateControl);
        input.data.child.push(FormlyFactory.InputPasswordControl);
        input.data.child.push(FormlyFactory.InputColorControl);
        /*Bind level------------------------------------------------------------*/
        textArea.data.child.push(FormlyFactory.TextAreaControl);
        textArea.data.child.push(FormlyFactory.CkeditorControl);
        /*Bind level------------------------------------------------------------*/
        dropdown.data.child.push(FormlyFactory.SelectControl);
        dropdown.data.child.push(FormlyFactory.SelectMultiControl); 
        /*Bind level------------------------------------------------------------*/
        checkbox.data.child.push(FormlyFactory.RadioButtonControl);
        checkbox.data.child.push(FormlyFactory.CheckboxMultiControl);
        checkbox.data.child.push(FormlyFactory.CheckboxControl);
        checkbox.data.child.push(FormlyFactory.ToggleControl); 
        /*Bind level------------------------------------------------------------*/
        upload.data.child.push(FormlyFactory.UploadControl);
        upload.data.child.push(FormlyFactory.UploadMultiControl);
        /*Bind level------------------------------------------------------------*/
        control.data.child.push(input);
        control.data.child.push(textArea);
        control.data.child.push(dropdown);
        control.data.child.push(checkbox);
        control.data.child.push(upload);
        control.data.child.push(custom);
        /*Bind level------------------------------------------------------------*/
        $scope.component.push(label);
        $scope.component.push(control);

        /*END declare variable..........................................................*/

        /*START do amination..........................................................*/
        $timeout(function() {
            $("#formly-toolbox").slimScroll({
                height: "470px",
            });
            $("#formly-mainscreen").slimScroll({
                height: "470px",
            });
        });

        $scope.ClickToCategory = function(item) {

            selectingItem.data.Selected = false;
            selectingItem = item;
            selectingItem.data.Selected = true;
            selectingItem.data.IsExpand = !selectingItem.data.IsExpand;
        };
        var initSortableAndDropable = function() {
            $timeout(function() {
                var startposRow;
                var endposRow;
                try {
                    $(".sortablerow").sortable("destroy");
                } catch (e) {
                    // console.log(e);
                }
                $(".sortablerow").sortable({
                    placeholder: "ui-state-highlight",
                    tolerance: "pointer",
                    forcePlaceholderSize: true,
                    stop: function(event, ui) {
                        endposRow = ui.item.index();
                        var b = $scope.vm.Model[endposRow];
                        $scope.vm.Model[endposRow] = $scope.vm.Model[startposRow]
                        $scope.vm.Model[startposRow] = b;
                    },
                    start: function(event, ui) {
                        startposRow = ui.item.index();
                    },
                });
                $(".sortablerow").disableSelection();
                var currentSortListId;
                var startpos;
                var endpos;
                try {
                    $(".sortable").sortable("destroy");
                } catch (e) {
                    // console.log(e);
                }
                $(".sortable").sortable({
                    placeholder: "ui-state-highlight",
                    tolerance: "pointer",
                    forcePlaceholderSize: true,
                    stop: function(event, ui) {
                        currentSortListId = ui.item.parent().attr("id");
                        endpos = ui.item.index();
                        angular.forEach($scope.vm.Model, function(component) {
                            if (component.data.index == currentSortListId) {
                                var b = component.fieldGroup[endpos];
                                component.fieldGroup[endpos] = component.fieldGroup[startpos];
                                component.fieldGroup[startpos] = b;
                            }
                        });
                    },
                    start: function(event, ui) {
                        startpos = ui.item.index();
                    },
                });
                $(".sortable").disableSelection();
                try {
                    $(".droppable").droppable("destroy");
                } catch (e) {
                    //console.log(e);
                }
                $(".droppable").droppable({
                    accept: ".draggable",
                    tolerance: "pointer",
                    over: function(event, ui) {
                        $(this).addClass("hover");
                    },
                    out: function(event, ui) {
                        $(this).removeClass("hover");
                    },
                    drop: function(event, ui) {
                        $(this).removeClass("hover");
                        var index = $(this).attr("id");

                        var putitem = angular.copy(selectingItem);
                        putitem.key = FormlyService.NewGuid();
                        angular.forEach($scope.vm.Model, function(row) {
                            if (row.data.index == index) {

                                row.fieldGroup.push(putitem);
                            }
                        });

                        $scope.$apply();
                    }
                });
            });
        };
        var reloadJqueryObj = function() {
            var item = angular.copy($scope.vm.Model);
            delete $scope.vm.Model;
            $scope.vm.Model = item;
            initSortableAndDropable();
        };
        var getAllKey = function () {
            var listkey = [];
            //2 lớp only
            for (var i = 0; i < $scope.vm.Model.length; i++) {
                var row = $scope.vm.Model[i];
                for (var j = 0; j < row.fieldGroup.length; j++) {
                    var compoment = row.fieldGroup[j];
                    listkey.push(compoment.key);
                }
            }
            return listkey;
        }

        var initDraggable = function() {
            $timeout(function() {
                try {
                    $(".draggable").draggable("destroy");
                } catch (e) {
                    // console.log(e);
                }
                $(".draggable").draggable({
                    revert: "invalid", // when not dropped, the item will revert back to its initial position
                    appendTo: "body",
                    cursorAt: {
                        top: 0,
                        left: 0
                    },
                    cursor: "-webkit-grabbing",
                    //delay: 300,
                    distance: 5, //khoang cach pixel chuot bat buoc phai di truoc khi muon dragg
                    //refreshPositions: true,
                    helper: function() {
                        return '<span class="alert alert-success" > <i class="fa fa-lg fa-plus-circle"></i> </span>'
                            // var item = $(this).clone();
                            // return item;
                    }
                });
            });
        };
        //Thêm một dòng
        $scope.AddRow = function () {
            var fieldGroup = [];
            //fieldGroup.push(FormlyFactory.InputTextControl);
            //fieldGroup.push(FormlyFactory.InputEmailControl);
            //fieldGroup.push(FormlyFactory.InputUrlControl);
            //fieldGroup.push(FormlyFactory.InputNumberControl);
            //fieldGroup.push(FormlyFactory.InputRangeControl);
            //fieldGroup.push(FormlyFactory.InputDateControl);
            //fieldGroup.push(FormlyFactory.InputPasswordControl);
            //fieldGroup.push(textAreaControl);
            //fieldGroup.push(FormlyFactory.InputColorControl);
                $scope.vm.Model.push({
                    "data": {
                        "type": 1,
                        "index": FormlyService.NewGuid(),
                        "name": "Hàng"
                    },
                    "wrapper":"layout",
                    "className": "row",
                    "fieldGroup": fieldGroup,
                });
                var item = angular.copy($scope.vm.Model);
                delete $scope.vm.Model;
                $scope.vm.Model = item;
                initSortableAndDropable();
        }
        //Thêm một dòng
        $scope.AddTable = function () {
                var fieldGroup = []; 
                $scope.vm.Model.push({
                    "data": {
                        "type": 1,
                        "index": FormlyService.NewGuid(),
                        "name": "Bảng"
                    }, 
                    "wrapper": "table",
                    "className": "row",
                    "fieldGroup": fieldGroup,
                });
                var item = angular.copy($scope.vm.Model);
                delete $scope.vm.Model;
                $scope.vm.Model = item;
                initSortableAndDropable();
            }
         
        //Sửa một row
        $scope.EditRow = function (compoment) {
            var modalInstance;
                modalInstance = $uibModal.open({
                    templateUrl: template.editRowUrl,
                    controller: controller.editRowCtr,
                    size: 'lg',
                    // windowClass :"modal-full",
                    backdrop: 'static',
                    // Set parameter to chidform (popup form)
                    resolve: {
                        item: function () {
                            return compoment;
                        },

                    }
                });
            modalInstance.result.then(function (response) {
                //2 lớp only
                var index = $scope.vm.Model.indexOf(compoment);
                if (index >= 0) {
                    $scope.vm.Model[index] = response;

                    reloadJqueryObj();
                }
            }, function (response) { });
        };
        //Xóa một dòng
        $scope.DeleteRow = function(compoment) {
                var index = $scope.vm.Model.indexOf(compoment);
                if (index >= 0) {
                    $scope.vm.Model.splice(index, 1);
                }
                var item = angular.copy($scope.vm.Model);
                delete $scope.vm.Model;
                $scope.vm.Model = item;
                initSortableAndDropable();
            }
        //sao chép dòng một dòng
        $scope.CloneRow = function(compoment) {
                var index = $scope.vm.Model.indexOf(compoment);
                if (index >= 0) {
                    var clone = angular.copy(compoment);
                    clone.data.index = FormlyService.NewGuid();
                    $scope.vm.Model.splice(index, 0, clone);
                }
                reloadJqueryObj();
        }
        $scope.RowSelecting = null;
        //Đổi vị trí dòng
        $scope.CheckSwapRow = function (compoment) {
            if (compoment === $scope.RowSelecting) {
                return "btn-danger";
            } else {
                if ($scope.RowSelecting === null) {
                    return "";
                } else {
                    return "btn-primary";
                }
            }
        };
        $scope.SwapRow = function (compoment) {

            if ($scope.RowSelecting === null) {
                $scope.RowSelecting = compoment;

            } else {
                if (compoment === $scope.RowSelecting) {
                    $scope.RowSelecting = null;
                } else {
                    var indexA = $scope.vm.Model.indexOf(compoment);
                    var indexB = $scope.vm.Model.indexOf($scope.RowSelecting);
                    var temp = $scope.vm.Model[indexA];
                    $scope.vm.Model[indexA] = $scope.vm.Model[indexB];
                    $scope.vm.Model[indexB] = temp;
                    $scope.RowSelecting = null;
                    var item = angular.copy($scope.vm.Model);
                    delete $scope.vm.Model;
                    $scope.vm.Model = item; 
                }
            }

        }; 
        $scope.OldColumnName = "";
        $scope.OldDbType = "";
        
        //Sửa một item
        $scope.EditItem = function (compoment, type) {
            if ($scope.ActionName == $scope.action.edit) {
                $scope.OldColumnName = compoment.data.columnName;
                $scope.OldDbType = compoment.data.dbType;
            }
            var modalInstance;
            var listkey = getAllKey(); 
            if (type == "label") {
                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: template.editLabelUrl,
                    controller: controller.editLabelCtr,
                    size: 'lg',
                    // windowClass :"modal-full",
                    backdrop: 'static',
                    // Set parameter to chidform (popup form)
                    resolve: {
                        item:  function(){
                            return compoment
                        },                        

                    }
                });
            }  else {
                modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: template.editControlUrl,
                    controller: controller.editControlCtr,
                    size: 'lg',
                    // windowClass :"modal-full",
                    backdrop: 'static',
                    // Set parameter to chidform (popup form)
                    resolve: {
                        item: function(){
                            return compoment
                        },
                        option: function () {
                            var obj = {};
                            obj.listkey = listkey;
                            return obj
                        },
                    }
                });
            }

            modalInstance.result.then(function(response) {
                //2 lớp only
                angular.forEach($scope.vm.Model, function(row) {
                    var index = row.fieldGroup.indexOf(compoment);
                    if (index >= 0) {
                        if ($scope.ActionName == $scope.action.edit 
                            && $scope.OldColumnName == response.data.columnName 
                            && $scope.OldDbType != response.data.dbType) {
                            response.key = response.key + 'V' + $scope.Version
                            response.data.columnName = response.data.columnName + 'V' + $scope.Version
                        }
                        row.fieldGroup[index] = response;

                        reloadJqueryObj();
                    }
                });
            }, function(response) {});
        };
        //Clone một item
        $scope.CloneItem = function(compoment) {
            //2 lớp only
            angular.forEach($scope.vm.Model, function(row) {
                var index = row.fieldGroup.indexOf(compoment);
                if (index >= 0) {

                    var clone = angular.copy(compoment);
                    clone.key = FormlyService.NewGuid();
                    row.fieldGroup.splice(index, 0, clone);


                    reloadJqueryObj();


                }
            });
        };
        //Xóa một item
        $scope.DeleteItem = function(compoment) {
            //2 lớp only
            angular.forEach($scope.vm.Model, function(row) {
                var index = row.fieldGroup.indexOf(compoment);
                if (index >= 0) {
                    row.fieldGroup.splice(index, 1);


                    reloadJqueryObj();
                }
            });
        };
        $scope.$watch("filterText", function() {
            initDraggable();
        });
         
        //Chuyển form config <=> preview
        $scope.ChangeForm = function (type) {
            $scope.vm.Scheme = [];
            $scope.vm.Data = {};
            $scope.FormMode = type;
            if ($scope.FormMode == "preview") {
                    
                $scope.vm.Scheme = angular.copy($scope.vm.Model);
            }
        }

        //Hành động commitform
        $scope.vm.onSubmit = onSubmit;

        function onSubmit() {
            // console.log('form submitted:', $scope.vm.user);
        }

        initDraggable();

        $scope.getNumber = function (num) {
            return new Array(num);
        }

        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(FormlyFactory.I);
            }
            return input;
        };

        $scope.getIndexFielGroup = function (row, col, numberCol) {
            return (row + 1) * numberCol + col;
        }


        //function for check form valid
        var checkFormValid = function () {
            if($scope.FormName == null 
                || $scope.FormName.trim() == ""
                || $scope.FormName.length > 255) {
                $scope.FormValid.FormName = false;
            }

            if ($scope.FormCode == null
                || $scope.FormCode.trim() == ""
                || $scope.FormCode.length > 16) {
                $scope.FormValid.FormCode = false;
            }


            if ($scope.StartDate == null) {
                $scope.FormValid.StartDate = false;
            }
            //if ($scope.EndDate == null) {
            //    $scope.FormValid.EndDate = false;
            //}
            return ($scope.FormValid.FormCode || $scope.FormValid.FormName || $scope.FormValid.EndDate || $scope.FormValid.StartDate);
        }

        //save form
        $scope.SaveBieu = function () {

            //validate form
            if (!checkFormValid()) {
                return;
            }
            //if edit form
            if ($scope.ActionName == $scope.action.edit) {
                UpdateForm();
            }
            //if create form
            if ($scope.ActionName == $scope.action.add) {
                CheckFormCode();
            }
        }

        //check code success callback
        var checkCodeSuccess = function (response) {
            if (response.Data != null) {
                $scope.FormExist.FormCode = false;
                return;
            }
            CreateForm();
        }

        //check code error callback. If request with exception
        var checkCodeError = function (response) {
            var infoResult = constantsAMD.OpenDialog("Xảy ra lỗi trong quá trình kiểm tra mã form", 'Thông báo', 'Đồng ý', 'Đóng', 'sm', null);
        }


        //create form success callback. Notification for create form success or failed
        var CreateFormSuccess = function (response) {
            if (response.Data != null) {
                var infoResult = constantsAMD.OpenDialog("Tạo Form thành công", 'Thông báo', 'Đồng ý', 'Đóng', 'sm', null);
                infoResult.result.then(function (modalResult) {
                    init();
                });
            } else {
                var infoResult = constantsAMD.OpenDialog("Tạo Form thất bại", 'Thông báo', 'Đồng ý', 'Đóng', 'sm', null);                
            }
        }

        //create form error callback. Notification for create form with exception
        var CreateFormError = function (callback) {
            var infoResult = constantsAMD.OpenDialog("Xảy ra lỗi trong quá trình tạo form", 'Thông báo', 'Đồng ý', 'Đóng', 'sm', null);
        }

        // request to api Create Form and dynamic table
        var CreateForm = function () {

            var postData = {
                FormContent:FormlyService.SerializeJSON($scope.vm.Model),
                FormName: $scope.FormName,
                FormCode: $scope.FormCode,
                StartDate: $scope.StartDate,
                EndDate: $scope.EndDate
            };

            $http({method: 'POST',url: api.CreateForm + '?TTHCGiayToId=' + $routeParams.Id,headers: {'Content-type': ' application/json'},data: postData}).success(CreateFormSuccess).error(CreateFormError)
        }

        var CheckFormCode = function () {
            $http({
                method: 'GET',
                url: api.CheckFormCode + '?formcode=' + $scope.FormCode,
                headers: {
                    'Content-type': ' application/json'
                }
            }).success(checkCodeSuccess).error(checkCodeError)
        }


        //Callback after update form success. Notification for update success or failed
        var updateFormSuccess = function (response) {
            if (response.Data != null) {
                var infoResult = constantsAMD.OpenDialog("Cập nhật Form thành công", 'Thông báo', 'Đồng ý', 'Đóng', 'sm', null);
                infoResult.result.then(function (modalResult) {
                    init();
                });
            } else {
                var infoResult = constantsAMD.OpenDialog("Cập nhật Form thất bại", 'Thông báo', 'Đồng ý', 'Đóng', 'sm', null);
            }
        }
        //Callback after update form error. Notification for update form with exception
        var updateFormError = function (callback) {
            var infoResult = constantsAMD.OpenDialog("Xảy ra lỗi trong quá trình cập nhật form", 'Thông báo', 'Đồng ý', 'Đóng', 'sm', null);
        }

        //send request to update form
        var UpdateForm = function () {
            var postData = {
                FormContent:FormlyService.SerializeJSON($scope.vm.Model),
                FormName: $scope.FormName,
                FormCode: $scope.FormCode,
                StartDate: $scope.StartDate,
                EndDate: $scope.EndDate,
                Id: $scope.FormlyMasterId
            };
            $http({
                method: 'PUT',
                url: api.UpdateForm + '?TTHCGiayToId=' + $routeParams.Id,
                headers: {
                    'Content-type': ' application/json'
                },
                data: postData
            }).success(updateFormSuccess).error(updateFormError)
        }

        //callback for getForm data success
        var getFormSuccess = function (response) {
            if (response.Data != null && response.Data.FormlyMaster != null) {
                $scope.vm.Model = FormlyService.DeSerializeJSON(response.Data.FormlyMaster.FormContent);
                $scope.activeClass = response.Data.FormlyMaster.Id;
                $scope.Version = response.Data.FormlyMaster.Version;
                $scope.ActionName = $scope.action.edit;
                $scope.FormName = response.Data.FormlyMaster.FormName;
                $scope.FormlyMasterId = response.Data.FormlyMaster.Id;
                $scope.FormCode = response.Data.FormlyMaster.FormCode;
                $scope.StartDate = response.Data.FormlyMaster.StartDate;
                $scope.EndDate = response.Data.FormlyMaster.EndDate;
                reloadJqueryObj();
            }

            if (response.Data != null) {
                $scope.thuTucHanhChinh = response.Data.TTHC_TTHC;
            }
        }

        //Get Form Data. If form exist view form to update or only view, other create form or cancel
        $scope.GetData = function (tthcGiayToId) {
            $http({
                method: 'GET',
                url: api.GetData + '?TTHCGiayToId=' + tthcGiayToId,
                headers: {
                    'Content-type': ' application/json'
                }
            }).success(getFormSuccess);
        }
        

        //callback for getListForm data success
        var getListFormSuccess = function (response) {
            if (response.Data != null) {
                $scope.ListFormData = response.Data;
            }
        }

        //Get Form Data. If form exist view form to update or only view, other create form or cancel
        $scope.GetListData = function (tthcGiayToId) {
            $http({
                method: 'GET',
                url: api.GetListData + '?TTHCGiayToId=' + tthcGiayToId,
                headers: {
                    'Content-type': ' application/json'
                }
            }).success(getListFormSuccess);
        }

        var init = function () {
            $scope.GetData($routeParams.Id);
            $scope.GetListData($routeParams.Id);
        }
        init();

        $scope.ChangeFormActive = function (item) {
            $scope.vm.Model = FormlyService.DeSerializeJSON(item.FormContent);
            $scope.activeClass = item.Id;
            $scope.ActionName = $scope.action.edit;
            $scope.FormName = item.FormName;
            $scope.FormCode = item.FormCode;
            $scope.Version = item.Version;
            $scope.FormlyMasterId = item.Id;
            $scope.StartDate = item.StartDate;
            $scope.EndDate = item.EndDate;
            reloadJqueryObj();
        }

        //Delete form
        $scope.DeleteForm = function () {
            var infoResult = constantsAMD.OpenDialog("Bạn có chắc chắn xóa form này?", 'Cảnh báo', 'Đồng ý', 'Hủy', 'sm', null);
            infoResult.result.then(function (modalResult) {
                if (modalResult == 'confirm') {
                    $http({ method: 'DELETE', url: api.DeleteForm + '/' + $scope.activeClass, headers: { 'Content-type': ' application/json' } })
                       .success(DeleteFormSuccess)
                       .error(DeleteFormError)
                }
            });
           
        }

        //delete form success callback. Notification for create form success or failed
        var DeleteFormSuccess = function (response) {
            if (response.Status == 1) {
                var infoResult = constantsAMD.OpenDialog("Xóa Form thành công", 'Thông báo', 'Đóng', '', 'sm', null);
                infoResult.result.then(function (modalResult) {
                    init();
                }); 
            } else {
                var infoResult = constantsAMD.OpenDialog("Xóa Form thất bại", 'Thông báo', '', 'Đóng', 'sm', null);                
            }
        }

        //delete form error callback. Notification for create form with exception
        var DeleteFormError = function (callback) {
            var infoResult = constantsAMD.OpenDialog("Xảy ra lỗi trong quá trình xóa form", 'Thông báo', 'Đồng ý', 'Đóng', 'sm', null);
        }

        /* Controller for date picker*/
        $scope.today = function () {
            $scope.NgayNopHS = new Date();
            $scope.NgayHenTraHS = new Date();
        };

        $scope.clear = function () {
            $scope.NgayNopHS = null;
            $scope.NgayHenTraHS = null;
        };

        $scope.open1 = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened1 = true;
        };

        $scope.open2 = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened2 = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
        };
        }
    ]);
});
