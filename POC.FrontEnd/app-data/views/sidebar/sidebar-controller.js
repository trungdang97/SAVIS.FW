﻿// 'use strict';
/* SAVIS Vietnam Corporation
*
* This module is to separate configuration of authentication to app.js
* NguyenBv - Jan 2017
*/

define(['jquery', 'angularAMD', 'components/service/amdservice'], function (jQuery, angularAMD) {
    'use strict';
    /* Init the auth config, interceptor, and runtime modules */
    var factory = {};


    factory.init = function (app) {
        app.controller('SideBarCtrl', ['$scope', '$timeout', '$rootScope', '$location', '$route', '$http', 'constantsAMD', '$log', '$translate',
        function ($scope, $timeout, $rootScope, $location, $route, $http, constantsAMD, $log, $translate) {
            $timeout(function () {
                Layout.initSidebar(); // init sidebar
            }, 2000);
            var doTranslate = function (menu) {
                angular.forEach(menu, function (menuItem) {
                    //Translate
                    $translate('Navigation.' + menuItem.NavCode).then(function (translation) {
                        menuItem.NavNameTranslated = translation;
                    }, function (translationId) {
                        menuItem.NavNameTranslated = menuItem.NavName;
                    });

                    if (menuItem.SubRight != null && menuItem.SubRight.length > 0) {
                        doTranslate(menuItem.SubRight);
                    }
                });
            };
            $scope.RootMenus = [{
                UrlRewrite: "#/field-manager",
                IconClass: "fa fa-bars",
                NavCode: "FIELD",
                NavName: "Trường động",
            },{
                UrlRewrite: "#/archivetype-manager",
                IconClass: "fa fa-map-signs",
                NavCode: "ARCHIVETYPE",
                NavName:"Loại hình tài liệu",
            }, {
                UrlRewrite: "#/record-manager",
                IconClass: "fa fa-book",
                NavCode: "RECORD",
                NavName: "Hồ sơ",
            }, {
                UrlRewrite: "#/document-manager",
                IconClass: "fa fa-file-word-o",
                NavCode: "DOCUMENT",
                NavName: "Văn bản",
            }];
            doTranslate($scope.RootMenus);
            $rootScope.$on('$translateChangeSuccess', function () {
                doTranslate($scope.RootMenus);
            });
            }
        ]);

    };

    return factory;
});