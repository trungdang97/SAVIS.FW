'use strict';
define(['angularAMD', 'jquery'], function (angularAMD, jquery) {

    angularAMD.controller('InfoDialogCtrl', ['$scope', '$uibModalInstance', 'data', 'option',
        function ($scope, $uibModalInstance, data, option) {

            $scope.Title = option.Title;
            $scope.Message = option.Message;
            $scope.ButtonConfirm = option.ButtonConfirm;
            $scope.ButtonCancel = option.ButtonCancel;
            $scope.popupData = data;

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

            $scope.confirm = function () {
                $uibModalInstance.close('confirm');
            }
        }
    ]);

    angularAMD.controller('InputDialogCtrl', ['$scope', '$uibModalInstance', 'option',
        function ($scope, $uibModalInstance, option) {

            $scope.Title = option.Title;
            $scope.Message = option.Message;
            $scope.ButtonConfirm = option.ButtonConfirm;
            $scope.ButtonCancel = option.ButtonCancel;
            $scope.Type = option.Type;
            $scope.Answer = option.Data;
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

            $scope.confirm = function () {
                $uibModalInstance.close($scope.Answer);
            }
        }
    ]);

    angularAMD.service('constantsAMD', ['$uibModal', '$http', '$location', function ($uibModal, $http, $location) {

        var factory = {};

        factory.ExpandMenu = false;
        factory.NewRandomString= function(length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
        factory.NewGuid = function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };

        factory.SerializeJSON = function(jsonObj) {
            return JSON.stringify(jsonObj, function (key, value) {
                if (typeof value === "function") {
                    return value.toString();;
                }
                return value;
            }, 4);
        };

        factory.DeSerializeJSON = function(jsonString) {
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
        /*common function*/
        factory.saveToDiskFromApi = function (fileURL, fileName) {
            var promise = $http({
                method: 'GET',
                url: fileURL,
                responseType: 'arraybuffer'
            });
            promise.success(function (data, status, headers) {

                var octetStreamMime = 'application/octet-stream';
                var success = false;

                // Get the headers
                headers = headers();

                // Get the filename from the x-filename header or default to "download.bin"
                var filename = headers['x-filename'] || fileName;
                // Determine the content type from the header or default to "application/octet-stream"
                var contentType = headers['content-type'] || octetStreamMime;

                try {
                    // Try using msSaveBlob if supported
                    console.log("Trying saveBlob method ...");
                    var blob = new Blob([data], { type: contentType });
                    if (navigator.msSaveBlob)
                        navigator.msSaveBlob(blob, filename);
                    else {
                        // Try using other saveBlob implementations, if available
                        var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                        if (saveBlob === undefined) throw "Not supported";
                        saveBlob(blob, filename);
                    }
                    console.log("saveBlob succeeded");
                    success = true;
                } catch (ex) {
                    console.log("saveBlob method failed with the following exception:");
                    console.log(ex);
                }

                if (!success) {
                    // Get the blob url creator
                    var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                    if (urlCreator) {
                        // Try to use a download link
                        var link = document.createElement('a');
                        if ('download' in link) {
                            // Try to simulate a click
                            try {
                                // Prepare a blob URL
                                console.log("Trying download link method with simulated click ...");
                                var blob = new Blob([data], { type: contentType });
                                var url = urlCreator.createObjectURL(blob);
                                link.setAttribute('href', url);

                                // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                                link.setAttribute("download", filename);

                                // Simulate clicking the download link
                                var event = document.createEvent('MouseEvents');
                                event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                                link.dispatchEvent(event);
                                console.log("Download link method with simulated click succeeded");
                                success = true;

                            } catch (ex) {
                                console.log("Download link method with simulated click failed with the following exception:");
                                console.log(ex);
                            }
                        }

                        if (!success) {
                            // Fallback to window.location method
                            try {
                                // Prepare a blob URL
                                // Use application/octet-stream when using window.location to force download
                                console.log("Trying download link method with window.location ...");
                                var blob = new Blob([data], { type: octetStreamMime });
                                var url = urlCreator.createObjectURL(blob);
                                window.location = url;
                                console.log("Download link method with window.location succeeded");
                                success = true;
                            } catch (ex) {
                                console.log("Download link method with window.location failed with the following exception:");
                                console.log(ex);
                            }
                        }

                    }
                }

                if (!success) {
                    // Fallback to window.open method
                    console.log("No methods worked for saving the arraybuffer, using last resort window.open");
                    window.open(httpPath, '_blank', '');
                }
            })
            .error(function (data, status) {
                console.log("Request failed with status: " + status);

                // Optionally write the error out to scope
                $scope.errorDetails = "Request failed with status: " + status;
            });
            return promise;
        }


        factory.SaveToDisk = function (fileURL, fileName) {
            // for non-IE
            if (!window.ActiveXObject) {
                var save = document.createElement('a');
                save.href = fileURL;
                save.target = '_blank';
                save.download = fileName || fileURL;
                var evt = document.createEvent('MouseEvents');
                evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
                    false, false, false, false, 0, null);
                save.dispatchEvent(evt);
                (window.URL || window.webkitURL).revokeObjectURL(save.href);
            }
                // for IE
            else if (!!window.ActiveXObject && document.execCommand) {
                var _window = window.open(fileURL, "_blank");
                _window.document.close();
                _window.document.execCommand('SaveAs', true, fileName || fileURL);
                _window.close();
            }
        };
        factory.DaysBetween = function (date1, date2) {

            // The number of milliseconds in one day
            var ONE_DAY = 1000 * 60 * 60 * 24

            // Convert both dates to milliseconds
            var date1_ms = date1.getTime()
            var date2_ms = date2.getTime()

            // Calculate the difference in milliseconds
            var difference_ms = Math.abs(date1_ms - date2_ms)

            // Convert back to days and return
            return Math.round(difference_ms / ONE_DAY)

        };
        factory.CreateDateObj = function (input, format) {
            format = format || 'yyyy-mm-dd'; // default format
            var parts = input.match(/(\d+)/g),
                i = 0,
                fmt = {};
            // extract date-part indexes from the format
            format.replace(/(yyyy|dd|mm)/g, function (part) {
                fmt[part] = i++;
            });

            return new Date(parts[fmt['yyyy']], parts[fmt['mm']] - 1, parts[fmt['dd']]);
        };
        factory.CreateDate = function (fy, fm, fd, fh, fms) {
            fm = fm + 1;
            if (fm < 10) {
                fm = "0" + fm;
            };
            if (fd < 10) {
                fd = "0" + fd;
            };
            if (fh < 10) {
                fh = "0" + fh;
            };
            if (fms < 10) {
                fms = "0" + fms;
            };
            var sd = fy + "-" + fm + "-" + fd + "T" + fh + ":" + fms + ":00";
            var newDate = new Date(sd);
            var date = newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
            return sd;
        };
        factory.OpenDialog = function (message, title, buttonConfirm, buttonCancel, popupSize, popupData) {
            var infoDialogTemplateUrl = '/app-data/components/template-dialog/info-dialog.html';
            var modalInstance = $uibModal.open({
                templateUrl: infoDialogTemplateUrl,
                controller: 'InfoDialogCtrl',
                size: popupSize,
                backdrop: "static",
                keyboard: false,
                resolve: {
                    data: function () {
                        var obj = popupData;
                        return obj;
                    },
                    option: function () {
                        return {
                            Message: message,
                            Title: title,
                            ButtonConfirm: buttonConfirm,
                            ButtonCancel: buttonCancel
                        };
                    }
                }
            });

            return modalInstance;
        };
        factory.OpenInputDialog = function (message, title, buttonConfirm, buttonCancel, popupSize, type, data) {
            var inputDialogTemplateUrl = '/app-data/components/template-dialog/input-dialog.html';
            var modalInstance = $uibModal.open({
                templateUrl: inputDialogTemplateUrl,
                controller: 'InputDialogCtrl',
                size: popupSize,
                backdrop: "static",
                keyboard: false,
                resolve: {
                    option: function () {
                        return {
                            Message: message,
                            Title: title,
                            ButtonConfirm: buttonConfirm,
                            ButtonCancel: buttonCancel,
                            Type: type,
                            Data: data
                        };
                    }
                }
            });

            return modalInstance;
        };
        factory.OpenFormDialog = function (templateUrl, controllerName, popupSize, isStatic, popupData) {

            var popupBackdrop = "";

            if (isStatic) popupBackdrop = "static";

            var modalInstance = $uibModal.open({
                templateUrl: templateUrl,
                controller: controllerName,
                size: popupSize,
                backdrop: popupBackdrop,
                resolve: {
                    data: function () {
                        var obj = popupData;
                        return obj;
                    }
                }
            });

            return modalInstance;
        };
        factory.RemoveVietNamSign = function (obj) {
            var str;
            //if (eval(obj))
            //    str = eval(obj).value;
            //else
            str = obj;

            str = str.toLowerCase();
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/̣|̉|̀|̃|́|/g, "");
            str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
            /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
            str = str.replace(/-+-/g, "-");
            //thay thế 2- thành 1- 
            str = str.replace(/^\-+|\-+$/g, "");
            //cắt bỏ ký tự - ở đầu và cuối chuỗi 
            return str.toLowerCase();
        };
        factory.setNotification = function (notifications, type, title, body, position) {
            return notifications.add({
                type: type,
                title: title,
                body: body,
                position: position
            });
        };

        // Return factory
        return factory;
    }]);

    angularAMD.service('Notifications', ['$uibModal', function ($uibModal) {
        var queue = [];
        return {
            queue: queue,
            add: function (item) {
                var index = -1;
                for (var i = 0; i < this.queue.length; i++) {
                    if (queue[i].body == item.body) {
                        index = i;
                        break;
                    }
                }
                if (index != -1)
                    return;
                queue.push(item);
                setTimeout(function () {
                    $('.alerts .alert').eq(0).remove();
                    queue.shift();
                }, 4000);
            },
            pop: function (item) {
                var index = -1;
                for (var i = 0; i < this.queue.length; i++) {
                    if (queue[i].body == item) {
                        index = i;
                        break;
                    }
                }
                if (index != -1)
                    queue.splice(index, 1);
                return this.queue;
            }
        };
    }]);

    angularAMD.directive("passwordVerify", function () {
        return {
            require: "ngModel",
            scope: {
                passwordVerify: '='
            },
            link: function (scope, element, attrs, ctrl) {
                scope.$watch(function () {
                    var combined;

                    if (scope.passwordVerify || ctrl.$viewValue) {
                        combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                    }
                    return combined;
                }, function (value) {
                    if (value) {
                        ctrl.$parsers.unshift(function (viewValue) {
                            var origin = scope.passwordVerify;
                            if (origin !== viewValue) {
                                ctrl.$setValidity("passwordVerify", false);
                                return undefined;
                            } else {
                                ctrl.$setValidity("passwordVerify", true);
                                return viewValue;
                            }
                        });
                    }
                });
            }
        };
    });

});
