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
        app.controller('FooterCtrl', ['$scope', '$interval', '$translate', 'tmhDynamicLocale','$log', '$uibModal',
         function ($scope, $interval, $translate, tmhDynamicLocale, $log, $uibModal) {
             Layout.initFooter(); // init footer
             /*-------------*/
             $scope.Clock = Date.now();
             $scope.callAtInterval = function () {
                 $scope.Clock = Date.now()
             }
             $interval(function () { $scope.callAtInterval(); }, 1000);
         }
        ]);

    };

    return factory;
});



