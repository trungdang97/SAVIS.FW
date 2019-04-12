'use strict';

(function (angular) {

    /* Configuration section */

    // API configuration
    var apiUrl = "http://localhost:9800/";

    // File domain configuration
    // Files domain configurations, e.g. files.ubdt.gov.vn/ContentFolder/ or files.ais.gov.vn/files/
    // This config is to use with embed images or files
    var contentFolderUrl = "http://localhost:9800/ContentFolder/";

    // Web domain configuration, used for link embedded
    var publicWebUrl = "http://localhost:9850";

    var app = angular.module('ngCkeditor', []);
    var $defer, loaded = false;

    app.run(['$q', '$timeout', function ($q, $timeout) {
        $defer = $q.defer();
        if (angular.isUndefined(CKEDITOR)) {
            throw new Error('CKEDITOR not found');
        }
        CKEDITOR.disableAutoInline = true;
        function checkLoaded() {
            if (CKEDITOR.status === 'loaded') {
                loaded = true;
                $defer.resolve();
            } else {
                checkLoaded();
            }
        }
        CKEDITOR.on('loaded', checkLoaded);
        $timeout(checkLoaded, 100);
    }]);

    app.directive('ckeditor', ['$timeout', '$q', '$uibModal', '$http', function ($timeout, $q, $uibModal, $http) {
        return {
            restrict: 'AC',
            require: ['ngModel', '^?form'],
            scope: false,
            link: function (scope, element, attrs, ctrls) {
                var ngModel = ctrls[0];
                var form = ctrls[1] || null;
                var EMPTY_HTML = '<p></p>',
                    isTextarea = element[0].tagName.toLowerCase() === 'textarea',
                    data = [],
                    isReady = false;

                if (!isTextarea) {
                    element.attr('contenteditable', true);
                }

                // Dialogs
                var nhungLinkDialogTemplateUrl = '/app-data/views/nhunglink/nhunglink.html';
                var selectfileAvtDialogTemplateUrl = '/app-data/views/folder/selectfiledialog.html';

                // Onload config
                var onLoad = function () {

                    // Default option
                    var options = {
                        disableNativeSpellChecker: false,

                        // Disable tag filtering 
                        allowedContent: true,

                        // uiColor: '#FAFAFA',
                        height: '400px',
                        width: '100%'
                    };

                    // Config toolbar groups
                    options.toolbarGroups = [
                        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                        { name: 'paragraph', groups: ['align', 'list', 'indent', 'blocks', 'bidi', 'paragraph'] },
                        { name: 'clipboard', groups: ['clipboard', 'undo'] },
                        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                        { name: 'links', groups: ['links'] },
                        { name: 'tools', groups: ['tools'] },
                        '/',
                        { name: 'document', groups: ['mode', 'document', 'doctools'] },
                        { name: 'styles', groups: ['styles'] },
                        { name: 'colors', groups: ['colors'] },
                        { name: 'insert', groups: ['insert', 'ecm'] },
                        '/'
                    ];

                    // Remove unneccesary buttons
                    options.removeButtons = 'Language,BidiRtl,BidiLtr,Print,Scayt,SelectAll,Form,' +
                        'Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,NewPage,About,Outdent,Indent,Font,SpecialChar';

                    // Remove multiple plugins.
                    // options.removePlugins = 'autosave,save,font';
                    // Plugin auto save bi loi voi moment.js
                    options.removePlugins = 'autosave';

                    // Config for extended options
                    var defaultExtendedOptions = {
                        language: 'vi',
                        skin: 'moono',
                        extraPlugins: 'ecm_filemanager,ecm_nhunglink',
                        uiColor: '#AADC6E',
                    };

                    // Get options from directive attributes : ckeditor=ckEditorOptions
                    options = angular.extend(options, scope[attrs.ckeditor]);

                    if (typeof scope[attrs.ckeditor] === 'undefined')
                        options = angular.extend(options, defaultExtendedOptions);



                    var instance = (isTextarea) ? CKEDITOR.replace(element[0], options) : CKEDITOR.inline(element[0], options),
                        configLoaderDef = $q.defer();

                    element.bind('$destroy', function () {
                        if (instance && CKEDITOR.instances[instance.name]) {
                            CKEDITOR.instances[instance.name].destroy();
                        }
                    });
                    var setModelData = function (setPristine) {
                        var data = instance.getData();
                        if (data === '') {
                            data = null;
                        }
                        $timeout(function () { // for key up event
                            if (setPristine !== true || data !== ngModel.$viewValue) {
                                ngModel.$setViewValue(data);
                            }

                            if (setPristine === true && form) {
                                form.$setPristine();
                            }
                        }, 0);
                    }, onUpdateModelData = function (setPristine) {
                        if (!data.length) {
                            return;
                        }

                        var item = data.pop() || EMPTY_HTML;
                        isReady = false;
                        instance.setData(item, function () {
                            setModelData(setPristine);
                            isReady = true;
                        });
                    };

                    instance.on('pasteState', setModelData);
                    instance.on('change', setModelData);
                    instance.on('blur', setModelData);
                    //instance.on('key',          setModelData); // for source view

                    instance.on('instanceReady', function () {
                        scope.$broadcast('ckeditor.ready');
                        scope.$apply(function () {
                            onUpdateModelData(true);
                        });

                        instance.document.on('keyup', setModelData);
                    });
                    instance.on('customConfigLoaded', function () {
                        configLoaderDef.resolve();
                    });

                    ngModel.$render = function () {
                        data.push(ngModel.$viewValue);
                        if (isReady) {
                            onUpdateModelData();
                        }
                    };

                    // This is ECM customized code
                    instance.ecm = {};
                    instance.ecm.nhungLink = nhungLink;
                    instance.ecm.imageManager = imageManager;


                    // Inject the instance
                    // instance.ui.addButton( 'File Management', {
                    //         label: 'Insert Files',
                    //         command: 'insertFiles',
                    //         toolbar: 'insert'
                    //     });
                    // instance.addCommand( 'insertFiles', {
                    //     exec: function(editor) {
                    //         imageManager();
                    //     }
                    // });
                };
                
                // Link embed
                var nhungLink = function (editor, selection) {
                    var val = '';
                    var modalInstance = $uibModal.open({
                        templateUrl: nhungLinkDialogTemplateUrl,
                        controller: 'NhungLinkCtrl',
                        size: 'lg',
                        // Set parameter to chidform (popup form)
                        resolve: {
                            items: function () {
                                var obj = {};
                                obj.modalItem = "";
                                return obj;
                            },
                            url: function () {
                                return "";
                            },
                            options: function () {
                                return [{ Type: 'view' }];
                            }
                        }
                    });
                    scope.LinkNhung = [];
                    modalInstance.result.then(function (newItem) {
                        if (typeof (scope.LinkNhung) == 'undefined') {
                            scope.LinkNhung = [];

                        }
                        console.log(newItem);
                        angular.forEach(newItem.Data, function (item) {
                            //item.CreatedByUserId = app.CurrentUser.Id;
                            //item.LastModifiedByUserID = app.CurrentUser.Id;
                            newItem.Data.URI = newItem.URI;
                            newItem.Data.Tieu_de = newItem.Tieu_de;
                            //item.Thu_tu_hien_thi = $scope.$index;
                            if (item != null) {
                                scope.LinkNhung.push(item);
                            }
                            else {
                                scope.LinkNhung.push(newItem);
                            }

                        });
                        angular.forEach(scope.LinkNhung, function (item) {
                            if (item.URI != null && item.URI != "") {
                                if (item.selected != null) {
                                    val += '<a href="' + publicWebUrl + item.URI + '" title="' + item.Tieu_de + '">' + item.Tieu_de + '</a><br>';
                                }
                                else {
                                    val += '<a href="' + item.URI + '" title="' + item.Tieu_de + '">' + item.Tieu_de + '</a><br>';
                                }

                            }
                        });
                        console.log("HTML is finally created");

                        $q.when(val).then(function (data) {
                            console.log("HTML is Inserted");

                            var selection = editor.getSelection();

                            var text = selection.getSelectedText();

                            // editor.insertHtml('<strike>' + text + ' /By User </strike>');

                            editor.insertHtml(data);

                            var obj = {};
                            obj.Promise = $q;
                            obj.Data = data;

                            return obj;
                        });
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

                // File manager
                var imageManager = function (editor, selection) {
                    var val = '';
                    var modalInstance = $uibModal.open({
                        templateUrl: selectfileAvtDialogTemplateUrl,
                        controller: 'FileSelectCtrl',
                        size: 'lg',
                        windowClass: 'modal-full',
                        resolve: {
                            item: function () {
                                var obj = {};
                                obj.Folder = scope.Folder;
                                return obj;
                            },
                            option: function () {
                                var obj = {
                                    IsUploadable: true,
                                    IsMultiSelect: true,
                                    FileType: "",
                                    FileExtensions: "",
                                    Button: {
                                        EmbedLink: true,
                                        SelectFile: true
                                    },
                                    Extend: {
                                        Selection: selection
                                    }
                                };
                                return obj;
                            }
                        }
                    });

                    scope.FileList = [];
                    modalInstance.result.then(function (fileItem) {

                        if (typeof (scope.FileList) == 'undefined') {
                            scope.FileList = [];
                        };

                        /* Import images */

                        angular.forEach(fileItem.Data, function (item) {

                            var postData = {};

                            postData.ListNameNodeMetadata = ["Title", "Summary"];

                            var promise = $http({
                                method: 'POST',
                                url: apiUrl + 'api/nodemetadata/' + item.Id + '/node',
                                headers: {
                                    'Content-type': ' application/json'
                                },
                                data: postData
                            });
                            promise.success(function (data) {
                                item.MetadataList = data.Data;
                            }).error(function (response) {
                                console.log(response);
                            });

                            item.FileName = item.Name;
                            item.FileId = item.Id;
                            item.NodeId = item.Id;
                            item.FileSize = item.Size;
                            item.FileType = item.Extension;

                            scope.FileList.push(item);

                            /* Import images */
                            if (fileItem.Command == 'Move') {
                                if (item.AbsolutePath != null && item.AbsolutePath != "") {
                                    // val += '<a href="' + contentFolderUrl + item.AbsolutePath + '" class="swipebox" data-lightbox="example"><img src="' + contentFolderUrl + item.AbsolutePath + '"><span class="hidden-portal">[</span><span class="img-desc">Nhập chú thích</span><span class="hidden-portal">[</span></a><br>';
                                    var imgPath = contentFolderUrl + item.AbsolutePath;

                                    val += '<div class="editor-img-wrapper">' +
                                                '<img class="editor-img" src="' + imgPath + '" data-node-id="' + item.NodeId + '"/>' +
                                                '<div class="editor-img-desc">' +
                                                    '<p class="text-muted">[Nhập chú thích]</p>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="clearfix"></div>'

                                }
                            }

                            /* Import direct link */
                            if (fileItem.Command == 'Link') {
                                var text = selection.getSelectedText();
                                if (item.AbsolutePath != null && item.AbsolutePath != "") {
                                    if (text !== '' && typeof text !== 'undefined')
                                        val += '<a href="' + contentFolderUrl + item.AbsolutePath + '" title="' + item.FileName + '">' + text + '</a>';
                                    else
                                        val += '<a href="' + contentFolderUrl + item.AbsolutePath + '" title="' + item.FileName + '">' + item.FileName + '</a>&nbsp;';
                                }
                            }
                        });

                        $q.when(val).then(function (data) {
                            editor.insertHtml(data);
                            var obj = {};
                            obj.Promise = $q;
                            obj.Data = data;
                            return obj;
                        });

                    }, function () {
                    });


                    //if (scope.api && scope.api.insertImage && angular.isFunction(scope.api.insertImage)) {
                    //    val = scope.api.insertImage.apply(scope.api.scope || null);
                    //} else {
                    //    val = prompt('Please enter the picture URL', 'http://');
                    //    val = '<img src="' + val + '">'; //we convert into HTML element.
                    //}
                    //resolve the promise if any
                };
                
                if (CKEDITOR.status === 'loaded') {
                    loaded = true;
                }
                if (loaded) {
                    onLoad();
                } else {
                    $defer.promise.then(onLoad);
                }
            }
        };
    }]);
    return app;
})(window.angular);