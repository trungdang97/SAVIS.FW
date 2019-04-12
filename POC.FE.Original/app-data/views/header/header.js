/* SAVIS Vietnam Corporation
*
* This module is to separate configuration of authentication to app.js
* NguyenBv - Jan 2017
*/

define(['angularAMD', 'jquery'], function (angularAMD, jQuery) {
    'use strict';
    /* Init the auth config, interceptor, and runtime modules */
    var factory = {};
    factory.init = function (app) {
        app.controller('HeaderCtrl', ['$scope', '$interval', '$translate', 'tmhDynamicLocale', '$rootScope', '$log', '$uibModal',
         function ($scope, $interval, $translate, tmhDynamicLocale, $rootScope, $log, $uibModal) {
         

          $scope.appVersion = angularAMD.Version;
          $scope.ListLanguage = [
              {
                  Name: "Việt Nam",
                  Key: "vi",
                  IconSrc: "../assets/global/img/flags/vn.png"
              }, {
                  Name: "English",
                  Key: "en",
                  IconSrc: "../assets/global/img/flags/us.png"
              }
          ];
          $scope.SelectedLanguage = {
              Name: "Việt Nam",
              Key: "vi",
              IconSrc: "../../../libs/svg-i18n/vietnam.svg"
          }
          var curentLang = $translate.use();

          if (typeof (curentLang) === "undefined") {
              curentLang = 'vi';
          }
          tmhDynamicLocale.set(curentLang);

          angular.forEach($scope.ListLanguage, function (lang) {
              if (lang.Key === curentLang) {
                  $scope.SelectedLanguage = lang;
              }
          });
          $scope.SelectLanguage = function (lang) {
              $scope.SelectedLanguage = lang;
              $translate.use(lang.Key);
              tmhDynamicLocale.set(lang.Key);
          };
         }
        ]);

    };

    return factory;
});



